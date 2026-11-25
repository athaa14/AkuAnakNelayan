if (sellerReady && sellerShop) {
    const rangeSelect = document.querySelector("#salesRange");
    const products = getSellerProducts();
    const orders = getSellerOrders();
    const lowStock = products.filter(product => Number(product.stock) <= 5);

    document.querySelector("#dashboardDate").textContent = `Halo, ${sellerShop.ownerName}. Berikut ringkasan ${sellerShop.shopName}.`;

    function renderChart(days) {
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - days + 1);
        start.setHours(0, 0, 0, 0);
        const bucketCount = days === 7 ? 7 : 6;
        const bucketSize = days / bucketCount;
        const buckets = Array.from({ length: bucketCount }, (_, index) => {
            const date = new Date(start);
            date.setDate(start.getDate() + Math.floor(index * bucketSize));
            return { date, value: 0 };
        });

        orders.filter(order => sellerOrderPaid(order)).forEach(order => {
            const orderDate = new Date(order.createdAt);
            const dayOffset = (orderDate - start) / 86400000;
            if (dayOffset < 0 || dayOffset >= days) return;
            const index = Math.min(bucketCount - 1, Math.floor(dayOffset / bucketSize));
            buckets[index].value += sellerOrderSubtotal(order);
        });

        const maximum = Math.max(...buckets.map(bucket => bucket.value), 1);
        const total = buckets.reduce((sum, bucket) => sum + bucket.value, 0);
        document.querySelector("#chartSubtitle").textContent = days === 7 ? "Nilai produk terjual per hari" : "Nilai produk terjual per kelompok 5 hari";
        document.querySelector("#chartTotal").textContent = formatRupiah(total);
        document.querySelector("#salesChart").innerHTML = `
            <div class="flex min-w-[560px] items-end gap-3 border-b border-slate-200 px-2 pb-2" role="img" aria-label="Grafik penjualan ${days} hari, total ${formatRupiah(total)}">
                ${buckets.map((bucket, index) => {
                    const height = bucket.value ? Math.max(8, bucket.value / maximum * 100) : 2;
                    const label = bucket.date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
                    return `<div class="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"><span class="max-w-full truncate text-[10px] font-medium text-slate-500">${formatRupiah(bucket.value)}</span><div class="w-full rounded-t-md bg-teal-700 transition hover:bg-teal-800" style="height:${height * 1.5}px" title="${escapeHTML(label)}: ${formatRupiah(bucket.value)}"></div><span class="text-[10px] text-slate-500">${escapeHTML(label)}</span></div>`;
                }).join("")}
            </div>
            <p class="mt-3 text-xs text-slate-500">Omzet hanya menghitung pesanan yang telah dibayar dan tidak dibatalkan.</p>
        `;
    }

    function renderDashboard() {
        const days = Number(rangeSelect.value);
        const start = new Date();
        start.setDate(start.getDate() - days + 1);
        start.setHours(0, 0, 0, 0);
        const periodOrders = orders.filter(order => new Date(order.createdAt) >= start && sellerOrderPaid(order));
        const revenue = periodOrders.reduce((sum, order) => sum + sellerOrderSubtotal(order), 0);
        const activeOrders = orders.filter(order => sellerOrderPaid(order) && !["Selesai", "Dibatalkan"].includes(order.status)).length;
        const activeProducts = products.filter(product => product.isPublished !== false).length;
        const cards = [
            ["Omzet periode ini", formatRupiah(revenue), "wallet"],
            ["Pesanan aktif", activeOrders, "package-check"],
            ["Produk aktif", activeProducts, "fish"],
            ["Perlu restok", lowStock.length, "boxes"]
        ];
        document.querySelector("#sellerStats").innerHTML = cards.map(([label, value, iconName]) => `
            <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex items-center justify-between gap-3"><span class="text-sm font-semibold text-slate-500">${label}</span><span class="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">${icon(iconName, 19)}</span></div><strong class="mt-4 block font-heading text-2xl font-extrabold text-slate-900">${value}</strong></article>
        `).join("");
        renderChart(days);
        renderLowStock();
        renderRecentOrders();
        if (window.lucide) lucide.createIcons();
    }

    function renderLowStock() {
        const target = document.querySelector("#lowStockList");
        target.innerHTML = lowStock.length ? lowStock.slice(0, 5).map(product => `
            <a class="flex items-center gap-3 py-3 first:pt-0 last:pb-0" href="seller-product-detail.html?id=${product.id}">
                <img class="h-12 w-12 rounded-lg object-cover" src="${escapeHTML(product.image)}" alt="">
                <span class="min-w-0 flex-1"><strong class="block truncate text-sm text-slate-800">${escapeHTML(product.name)}</strong><span class="text-xs text-slate-500">${product.stock <= 0 ? "Stok habis" : `${product.stock} ${escapeHTML(product.stockUnit)} tersisa`}</span></span>
                <span class="text-xs font-bold ${product.stock <= 0 ? "text-rose-700" : "text-amber-700"}">${product.stock <= 0 ? "Habis" : "Menipis"}</span>
            </a>
        `).join("") : `<p class="py-5 text-sm text-slate-500">Semua stok produk mencukupi.</p>`;
    }

    function renderRecentOrders() {
        const target = document.querySelector("#recentOrders");
        target.innerHTML = orders.length ? orders.slice(0, 5).map(order => {
            const items = sellerOrderItems(order);
            const buyer = Store.get("users", DATA.users).find(user => user.id === order.userId);
            return `<tr>
                <td class="whitespace-nowrap px-5 py-4 font-bold text-slate-900">${escapeHTML(order.id)}</td>
                <td class="whitespace-nowrap px-5 py-4 text-slate-500">${formatDate(order.createdAt)}</td>
                <td class="max-w-48 truncate px-5 py-4 text-slate-700">${escapeHTML(buyer?.name || "Pembeli")}</td>
                <td class="max-w-52 truncate px-5 py-4 text-slate-600">${items.map(item => escapeHTML(item.name)).join(", ")}</td>
                <td class="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">${formatRupiah(sellerOrderSubtotal(order))}</td>
                <td class="px-5 py-4">${sellerStatusBadge(order.status)}</td>
                <td class="whitespace-nowrap px-5 py-4"><a class="font-bold text-teal-700 hover:text-teal-900" href="seller-order-detail.html?id=${encodeURIComponent(order.id)}">Detail</a></td>
            </tr>`;
        }).join("") : `<tr><td class="px-5 py-8 text-center text-sm text-slate-500" colspan="7">Belum ada transaksi di toko Anda.</td></tr>`;
    }

    rangeSelect.addEventListener("change", renderDashboard);
    renderDashboard();
}
