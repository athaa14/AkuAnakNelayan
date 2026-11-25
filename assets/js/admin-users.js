if (adminReady) {
    const search = document.querySelector("#userSearch");
    const roleFilter = document.querySelector("#roleFilter");
    const statusFilter = document.querySelector("#statusFilter");
    const rows = document.querySelector("#userRows");
    const empty = document.querySelector("#usersEmpty");
    const tableWrap = document.querySelector("#userTableWrap");
    const modal = document.querySelector("#sellerModal");
    const form = document.querySelector("#sellerForm");
    const cancelButton = document.querySelector("#cancelSeller");
    let pendingSellerId = null;

    function loadUsers() {
        return Store.get("users", DATA.users);
    }

    function loadSellers() {
        return Store.get("sellers", DATA.sellers);
    }

    function shopFor(user) {
        return loadSellers().find(seller => seller.id === user.sellerId || seller.ownerUserId === user.id) || null;
    }

    function activeAdminCount(users) {
        return users.filter(user => user.role === "admin" && user.isActive !== false).length;
    }

    function isSelf(user) {
        return String(user.id) === String(adminUser.id);
    }

    function renderUsers() {
        const query = search.value.trim().toLowerCase();
        const role = roleFilter.value;
        const status = statusFilter.value;
        const list = loadUsers().filter(user => {
            const matchesQuery = `${user.name} ${user.email}`.toLowerCase().includes(query);
            const matchesRole = role === "Semua" || user.role === role;
            const active = user.isActive !== false;
            const matchesStatus = status === "Semua" || (status === "Aktif" ? active : !active);
            return matchesQuery && matchesRole && matchesStatus;
        });

        empty.classList.toggle("hidden", list.length > 0);
        tableWrap.classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(user => {
            const active = user.isActive !== false;
            const self = isSelf(user);
            const shop = shopFor(user);
            return `<tr>
                <td class="px-4 py-4">
                    <strong class="block text-sm text-slate-900">${escapeHTML(user.name)}${self ? ' <span class="text-xs font-semibold text-teal-700">(Anda)</span>' : ""}</strong>
                    <span class="text-xs text-slate-500">${escapeHTML(user.email)}</span>
                </td>
                <td class="px-4 py-4">
                    <select class="roleSelect rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-700" data-id="${escapeHTML(String(user.id))}" ${self ? "disabled" : ""} aria-label="Role ${escapeHTML(user.name)}">
                        <option value="buyer" ${user.role === "buyer" ? "selected" : ""}>Buyer</option>
                        <option value="seller" ${user.role === "seller" ? "selected" : ""}>Seller</option>
                        <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                    </select>
                </td>
                <td class="max-w-48 truncate px-4 py-4 text-slate-600">${escapeHTML(shop?.shopName || "-")}</td>
                <td class="px-4 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-emerald-50 text-emerald-700" : "bg-rose-100 text-rose-700"}">${active ? "Aktif" : "Nonaktif"}</span></td>
                <td class="px-4 py-4"><button class="toggleStatus rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold transition hover:border-teal-700 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50" data-id="${escapeHTML(String(user.id))}" ${self ? "disabled" : ""}>${active ? "Nonaktifkan" : "Aktifkan"}</button></td>
            </tr>`;
        }).join("");
    }

    function applyRole(id, nextRole, select) {
        const users = loadUsers();
        const user = users.find(item => String(item.id) === String(id));
        if (!user || user.role === nextRole) return;
        const previousRole = user.role;

        if (isSelf(user)) {
            toast("Role akun sendiri tidak dapat diubah", "alert-circle");
            select.value = previousRole;
            return;
        }
        if (previousRole === "admin" && nextRole !== "admin" && activeAdminCount(users) <= 1) {
            toast("Minimal satu admin aktif harus tersisa", "alert-circle");
            select.value = previousRole;
            return;
        }

        if (nextRole === "seller") {
            const shop = shopFor(user);
            if (shop) {
                user.role = "seller";
                user.sellerId = shop.id;
                Store.set("users", users);
                toast("Role penjual dipulihkan");
                renderUsers();
                return;
            }
            pendingSellerId = user.id;
            document.querySelector("#sellerModalHint").textContent = `Lengkapi profil toko untuk ${user.name}.`;
            modal.classList.remove("hidden");
            modal.classList.add("flex");
            form.elements.shopName.focus();
            return;
        }

        if (nextRole === "buyer") {
            user.role = "buyer";
            user.sellerId = null;
            Store.set("users", users);
            toast("Role diubah menjadi buyer; data toko tetap tersimpan");
            renderUsers();
            return;
        }

        user.role = "admin";
        Store.set("users", users);
        toast("Role diubah menjadi admin");
        renderUsers();
    }

    function toggleStatus(id) {
        const users = loadUsers();
        const user = users.find(item => String(item.id) === String(id));
        if (!user || isSelf(user)) return;
        const willActivate = user.isActive === false;
        if (!willActivate && user.role === "admin" && activeAdminCount(users) <= 1) {
            toast("Minimal satu admin aktif harus tersisa", "alert-circle");
            return;
        }
        user.isActive = willActivate;
        Store.set("users", users);
        toast(willActivate ? "Akun diaktifkan" : "Akun dinonaktifkan");
        renderUsers();
    }

    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        form.reset();
        pendingSellerId = null;
    }

    rows.addEventListener("change", event => {
        if (!event.target.classList.contains("roleSelect")) return;
        applyRole(event.target.dataset.id, event.target.value, event.target);
    });

    rows.addEventListener("click", event => {
        const button = event.target.closest(".toggleStatus");
        if (button) toggleStatus(button.dataset.id);
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity() || pendingSellerId === null) return;
        const data = Object.fromEntries(new FormData(form));
        const sellers = loadSellers();
        const sellerId = Math.max(0, ...sellers.map(seller => Number(seller.id) || 0)) + 1;
        const users = loadUsers();
        const user = users.find(item => String(item.id) === String(pendingSellerId));
        if (!user) {
            closeModal();
            return;
        }
        sellers.push({
            id: sellerId,
            ownerUserId: user.id,
            shopName: data.shopName.trim(),
            ownerName: user.name,
            location: data.location.trim(),
            phone: user.phone || "",
            rating: 0,
            totalProducts: 0,
            isVerified: false,
            description: data.description.trim(),
            image: user.profileImage || "",
            joinedAt: new Date().toISOString().slice(0, 10)
        });
        user.role = "seller";
        user.sellerId = sellerId;
        Store.set("sellers", sellers);
        Store.set("users", users);
        closeModal();
        toast("Pengguna menjadi penjual dan profil toko dibuat");
        renderUsers();
    });

    cancelButton.addEventListener("click", () => {
        closeModal();
        renderUsers();
    });

    search.addEventListener("input", renderUsers);
    roleFilter.addEventListener("change", renderUsers);
    statusFilter.addEventListener("change", renderUsers);
    renderUsers();
}
