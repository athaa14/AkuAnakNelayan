if (adminReady) {
    const id = decodeURIComponent(new URLSearchParams(location.search).get("id") || "");
    const orders = Store.get("orders", makeDummyOrders());
    const order = orders.find(item => item.id === id);

    if (!order) {
        document.querySelector("#orderNotFound").classList.remove("hidden");
        document.querySelector("#orderContent").classList.add("hidden");
    } else {
        const confirmButton = document.querySelector("#confirmPayment");
        const cancelButton = document.querySelector("#cancelOrder");

        function renderDetail() {
            document.querySelector("#orderHeading").textContent = order.id;
            document.querySelector("#orderDate").textContent = `Dibuat pada ${new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}`;
            document.querySelector("#orderStatus").innerHTML = statusBadge(order.status);

            document.querySelector("#orderItems").innerHTML = (order.products || []).map(item => `
                <tr><td class="px-3 py-3 text-slate-800">${escapeHTML(item.name)}</td><td class="px-3 py-3 text-slate-600">${item.quantity} ${escapeHTML(productUnit(item.productId))}</td><td class="px-3 py-3 text-slate-600">${formatRupiah(item.price)}</td><td class="px-3 py-3 font-semibold text-slate-900">${formatRupiah(item.subtotal || item.price * item.quantity)}</td></tr>
            `).join("");

            document.querySelector("#orderTotals").innerHTML = `
                <div class="flex justify-between text-slate-600"><span>Subtotal item</span><strong>${formatRupiah(order.subtotal)}</strong></div>
                <div class="flex justify-between text-slate-600"><span>Biaya pengiriman</span><strong>${formatRupiah(order.shippingCost)}</strong></div>
                <div class="flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900"><span>Total pembayaran</span><strong>${formatRupiah(order.total)}</strong></div>
            `;

            const info = [
                ["Pembeli", adminFindUser(order.userId)?.name || "Pembeli"],
                ["Toko", adminSellerName(order.sellerId)],
                ["Alamat pengiriman", order.shippingAddress || "-"],
                ["Metode pembayaran", order.paymentMethod || "-"],
                ["Catatan pembeli", order.note || "Tidak ada"]
            ];
            document.querySelector("#orderInfo").innerHTML = info.map(([label, value]) => `<div><dt class="text-xs font-bold uppercase tracking-wide text-slate-500">${escapeHTML(label)}</dt><dd class="mt-1 whitespace-pre-line text-slate-800">${escapeHTML(value)}</dd></div>`).join("");

            document.querySelector("#orderHistory").innerHTML = (order.history || []).map(entry => `
                <li class="flex gap-3 rounded-lg bg-slate-50 px-4 py-3"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-700"></span><div><strong class="block text-sm text-slate-900">${escapeHTML(entry.status)}</strong><span class="text-xs text-slate-500">${new Date(entry.time).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</span></div></li>
            `).join("") || `<li class="text-sm text-slate-500">Belum ada riwayat status.</li>`;

            confirmButton.disabled = order.status !== "Belum Dibayar";
            cancelButton.disabled = ["Selesai", "Dibatalkan"].includes(order.status);
        }

        function productUnit(productId) {
            return Store.get("products", DATA.products).find(product => product.id === Number(productId))?.stockUnit || "unit";
        }

        confirmButton.addEventListener("click", () => {
            if (order.status !== "Belum Dibayar") return;
            const time = new Date().toISOString();
            order.status = "Dikemas";
            order.history = [...(order.history || []), { status: "Pembayaran dikonfirmasi", time }];
            adminSaveOrder(order, "Pembayaran dikonfirmasi");
            renderDetail();
        });

        cancelButton.addEventListener("click", () => {
            if (["Selesai", "Dibatalkan"].includes(order.status)) return;
            if (!window.confirm(`Batalkan pesanan ${order.id}?`)) return;
            const restored = adminRestoreStock(order);
            const time = new Date().toISOString();
            order.status = "Dibatalkan";
            order.stockRestored = true;
            order.history = [...(order.history || []), { status: "Pesanan dibatalkan admin", time }];
            adminSaveOrder(order, restored ? "Pesanan dibatalkan dan stok dikembalikan" : "Pesanan dibatalkan");
            renderDetail();
        });

        renderDetail();
    }
}
