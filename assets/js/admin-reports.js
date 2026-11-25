if (adminReady) {
    const rangeSelect = document.querySelector("#reportRange");
    const sellerSelect = document.querySelector("#reportSeller");
    const exportButton = document.querySelector("#exportReport");
    let currentRows = [];

    sellerSelect.innerHTML = `<option value="Semua">Semua toko</option>` + Store.get("sellers", DATA.sellers).map(seller => `<option value="${escapeHTML(String(seller.id))}">${escapeHTML(seller.shopName)}</option>`).join("");

    function periodOrders() {
        const orders = Store.get("orders", makeDummyOrders()).filter(adminPaid);
        const range = rangeSelect.value;
        if (range === "Semua") return orders;
        const days = Number(range);
        const start = new Date();
        start.setDate(start.getDate() - days + 1);
        start.setHours(0, 0, 0, 0);
        return orders.filter(order => new Date(order.createdAt) >= start);
    }

    function renderReport() {
        const orders = periodOrders().filter(order => sellerSelect.value === "Semua" || String(order.sellerId) === sellerSelect.value);
        const sellers = Store.get("sellers", DATA.sellers);
        const ids = sellerSelect.value === "Semua" ? sellers.map(seller => seller.id) : [sellerSelect.value].filter(id => id !== "Semua");
        const grouped = ids.map(id => {
            const ownOrders = orders.filter(order => String(order.sellerId) === String(id));
            const revenue = ownOrders.reduce((sum, order) => sum + adminOrderRevenue(order), 0);
            const items = ownOrders.reduce((sum, order) => sum + (order.products || []).reduce((count, item) => count + Number(item.quantity || 0), 0), 0);
            return { id, shopName: adminSellerName(id), orders: ownOrders.length, items, revenue };
        }).filter(row => row.orders > 0 || sellerSelect.value !== "Semua");
        const totalRevenue = grouped.reduce((sum, row) => sum + row.revenue, 0);
        currentRows = grouped;

        const stats = [
            ["Total omzet", formatRupiah(totalRevenue), "wallet"],
            ["Pesanan berbayar", orders.length, "package-check"],
            ["Item terjual", grouped.reduce((sum, row) => sum + row.items, 0), "fish"],
            ["Toko bertransaksi", grouped.filter(row => row.orders > 0).length, "store"]
        ];
        document.querySelector("#reportStats").innerHTML = stats.map(([label, value, iconName]) => `
            <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex items-center justify-between gap-3"><span class="text-sm font-semibold text-slate-500">${label}</span><span class="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">${icon(iconName, 19)}</span></div><strong class="mt-4 block font-heading text-2xl font-extrabold text-slate-900">${value}</strong></article>
        `).join("");

        document.querySelector("#reportSubtitle").textContent = rangeSelect.value === "Semua" ? "Seluruh transaksi yang dibayar" : `${rangeSelect.value} hari terakhir`;
        document.querySelector("#reportRows").innerHTML = grouped.length ? grouped.map(row => `
            <tr><td class="px-4 py-4 font-semibold text-slate-900">${escapeHTML(row.shopName)}</td><td class="px-4 py-4 text-slate-600">${row.orders}</td><td class="px-4 py-4 text-slate-600">${row.items}</td><td class="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">${formatRupiah(row.revenue)}</td><td class="px-4 py-4 text-slate-500">${totalRevenue ? (row.revenue / totalRevenue * 100).toFixed(1) : "0.0"}%</td></tr>
        `).join("") : `<tr><td class="px-4 py-8 text-center text-sm text-slate-500" colspan="5">Belum ada transaksi pada periode ini.</td></tr>`;

        const maximum = Math.max(...grouped.map(row => row.revenue), 1);
        document.querySelector("#reportChart").innerHTML = grouped.length ? grouped.map(row => `
            <div><div class="flex justify-between text-xs font-semibold text-slate-600"><span class="truncate">${escapeHTML(row.shopName)}</span><span>${formatRupiah(row.revenue)}</span></div><div class="mt-2 h-2 rounded-full bg-slate-100"><div class="h-2 rounded-full bg-teal-700" style="width:${Math.max(2, row.revenue / maximum * 100)}%"></div></div></div>
        `).join("") : `<p class="text-sm text-slate-500">Belum ada data untuk ditampilkan.</p>`;
        if (window.lucide) lucide.createIcons();
    }

    exportButton.addEventListener("click", () => {
        if (!currentRows.length) return toast("Tidak ada data untuk diekspor", "alert-circle");
        const header = ["Toko", "Pesanan", "Item terjual", "Omzet"];
        const lines = [header, ...currentRows.map(row => [row.shopName, row.orders, row.items, row.revenue])]
            .map(columns => columns.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","));
        const blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `laporan-penjualan-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        toast("Laporan CSV diunduh");
    });

    rangeSelect.addEventListener("change", renderReport);
    sellerSelect.addEventListener("change", renderReport);
    renderReport();
}
