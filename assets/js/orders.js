if (Auth.requireLogin()) {
    renderNavbar("orders");
    renderFooter();

    const statuses = ["Semua", "Belum Dibayar", "Dikemas", "Dikirim", "Dalam Perjalanan", "Selesai", "Dibatalkan"];
    let active = "Semua";

    function renderOrders() {
        document.querySelector("#orderFilters").innerHTML = statuses.map(status => `
            <button class="rounded-full border px-4 py-2 text-sm font-bold transition ${status === active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-700 hover:text-teal-700"}" data-status="${status}">${status}</button>
        `).join("");
        document.querySelectorAll("[data-status]").forEach(button => {
            button.addEventListener("click", () => {
                active = button.dataset.status;
                renderOrders();
            });
        });

        const current = Auth.current();
        const all = Store.get("orders", makeDummyOrders()).filter(order => order.userId === current.id || current.id === 1);
        const list = all.filter(order => active === "Semua" || order.status === active);
        document.querySelector("#ordersList").innerHTML = list.length ? list.map(order => {
            const product = getProduct(order.products[0].productId);
            const statusClass = order.status === "Dibatalkan"
                ? "bg-rose-100 text-rose-700"
                : order.status === "Belum Dibayar"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-teal-50 text-teal-700";
            return `
                <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div class="flex flex-col justify-between gap-2 border-b border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center">
                        <div><strong class="text-sm text-slate-900">${order.id}</strong><span class="ml-3 text-xs text-slate-500">${formatDate(order.createdAt)}</span></div>
                        <span class="w-fit rounded-full px-3 py-1 text-xs font-bold ${statusClass}">${order.status}</span>
                    </div>
                    <div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                        <img class="h-16 w-16 rounded-xl object-cover" src="${product?.image || ""}" alt="${order.products[0].name}">
                        <div class="min-w-0 flex-1"><strong class="text-sm text-slate-900">${order.products.map(item => item.name).join(", ")}</strong><p class="mt-1 text-xs text-slate-500">${order.products.reduce((sum, item) => sum + item.quantity, 0)} barang · ${order.paymentMethod}</p></div>
                        <div class="flex items-center justify-between gap-4 sm:block sm:text-right"><div><span class="block text-xs text-slate-500">Total</span><strong class="text-sm text-slate-900">${formatRupiah(order.total)}</strong></div><a class="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900 hover:border-teal-700 hover:text-teal-700 sm:mt-2 sm:inline-block" href="order-detail.html?id=${order.id}">Lihat Detail</a></div>
                    </div>
                </article>`;
        }).join("") : `
            <div class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <i class="mx-auto h-10 w-10 text-slate-400" data-lucide="package-search"></i><h2 class="mt-4 font-heading text-xl font-bold text-slate-900">Tidak ada pesanan</h2><p class="mt-2 text-sm text-slate-500">Pesanan dengan status ini belum tersedia.</p>
            </div>`;
        if (window.lucide) lucide.createIcons();
    }

    renderOrders();
}
