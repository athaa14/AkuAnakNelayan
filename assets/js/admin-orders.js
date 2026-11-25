if (adminReady) {
    const search = document.querySelector("#orderSearch");
    const sellerFilter = document.querySelector("#sellerFilter");
    const statusFilter = document.querySelector("#statusFilter");
    const rows = document.querySelector("#orderRows");
    const empty = document.querySelector("#ordersEmpty");
    const tableWrap = document.querySelector("#orderTableWrap");

    sellerFilter.innerHTML = `<option value="Semua">Semua toko</option>` + Store.get("sellers", DATA.sellers).map(seller => `<option value="${escapeHTML(String(seller.id))}">${escapeHTML(seller.shopName)}</option>`).join("");

    function renderOrders() {
        const query = search.value.trim().toLowerCase();
        const orders = Store.get("orders", makeDummyOrders());
        const list = orders.filter(order => {
            const buyer = adminFindUser(order.userId);
            const matchesQuery = order.id.toLowerCase().includes(query) || (buyer?.name || "").toLowerCase().includes(query);
            const matchesSeller = sellerFilter.value === "Semua" || String(order.sellerId) === sellerFilter.value;
            const matchesStatus = statusFilter.value === "Semua" || order.status === statusFilter.value;
            return matchesQuery && matchesSeller && matchesStatus;
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        empty.classList.toggle("hidden", list.length > 0);
        tableWrap.classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(order => `
            <tr>
                <td class="whitespace-nowrap px-4 py-4 font-bold text-slate-900">${escapeHTML(order.id)}</td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-500">${formatDate(order.createdAt)}</td>
                <td class="px-4 py-4 text-slate-700">${escapeHTML(adminFindUser(order.userId)?.name || "Pembeli")}</td>
                <td class="px-4 py-4 text-slate-600">${escapeHTML(adminSellerName(order.sellerId))}</td>
                <td class="max-w-56 truncate px-4 py-4 text-slate-600">${(order.products || []).map(item => `${escapeHTML(item.name)} × ${item.quantity}`).join(", ")}</td>
                <td class="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">${formatRupiah(order.total)}</td>
                <td class="px-4 py-4">${statusBadge(order.status)}</td>
                <td class="whitespace-nowrap px-4 py-4"><a class="font-bold text-teal-700 hover:text-teal-900" href="admin-order-detail.html?id=${encodeURIComponent(order.id)}">Detail</a></td>
            </tr>
        `).join("");
    }

    search.addEventListener("input", renderOrders);
    sellerFilter.addEventListener("change", renderOrders);
    statusFilter.addEventListener("change", renderOrders);
    renderOrders();
}
