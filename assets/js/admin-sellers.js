if (adminReady) {
    const search = document.querySelector("#sellerSearch");
    const verifyFilter = document.querySelector("#verifyFilter");
    const rows = document.querySelector("#sellerRows");
    const empty = document.querySelector("#sellersEmpty");
    const tableWrap = document.querySelector("#sellerTableWrap");

    function renderSellers() {
        const query = search.value.trim().toLowerCase();
        const filter = verifyFilter.value;
        const sellers = Store.get("sellers", DATA.sellers);
        const products = Store.get("products", DATA.products);
        const list = sellers.filter(seller => {
            const matchesQuery = `${seller.shopName} ${seller.ownerName}`.toLowerCase().includes(query);
            const verified = seller.isVerified !== false;
            const matchesFilter = filter === "Semua" || (filter === "Terverifikasi" ? verified : !verified);
            return matchesQuery && matchesFilter;
        });

        empty.classList.toggle("hidden", list.length > 0);
        tableWrap.classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(seller => {
            const verified = seller.isVerified !== false;
            const totalProducts = products.filter(product => product.sellerId === seller.id && product.isPublished !== false).length;
            return `<tr>
                <td class="px-4 py-4"><strong class="block text-sm text-slate-900">${escapeHTML(seller.shopName)}</strong><span class="text-xs text-slate-500"> sejak ${formatDate(seller.joinedAt || new Date().toISOString())}</span></td>
                <td class="px-4 py-4 text-slate-700">${escapeHTML(seller.ownerName)}</td>
                <td class="px-4 py-4 text-slate-600">${escapeHTML(seller.location)}</td>
                <td class="px-4 py-4 text-slate-700">${totalProducts}</td>
                <td class="px-4 py-4 font-semibold text-amber-600">${Number(seller.rating) || 0}/5</td>
                <td class="px-4 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-100 text-amber-800"}">${verified ? "Terverifikasi" : "Menunggu"}</span></td>
                <td class="px-4 py-4"><div class="flex flex-wrap gap-2"><a class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-teal-700 hover:text-teal-700" href="products.html?sellerId=${encodeURIComponent(seller.id)}">Lihat produk</a><button class="toggleVerify rounded-lg px-3 py-1.5 text-xs font-bold transition ${verified ? "border border-slate-200 text-slate-600 hover:bg-slate-50" : "bg-teal-700 text-white hover:bg-teal-800"}" data-id="${escapeHTML(String(seller.id))}">${verified ? "Batalkan" : "Verifikasi"}</button></div></td>
            </tr>`;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    rows.addEventListener("click", event => {
        const button = event.target.closest(".toggleVerify");
        if (!button) return;
        const sellers = Store.get("sellers", DATA.sellers);
        const seller = sellers.find(item => String(item.id) === button.dataset.id);
        if (!seller) return;
        seller.isVerified = seller.isVerified === false;
        Store.set("sellers", sellers);
        toast(seller.isVerified ? "Toko terverifikasi" : "Verifikasi toko dibatalkan");
        renderSellers();
    });

    search.addEventListener("input", renderSellers);
    verifyFilter.addEventListener("change", renderSellers);
    renderSellers();
}
