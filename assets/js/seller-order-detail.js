if (sellerReady && sellerShop) {
    const id = new URLSearchParams(location.search).get("id");
    let order = getSellerOrders().find(item => item.id === id);
    const detail = document.querySelector("#sellerOrderDetail");
    const empty = document.querySelector("#sellerOrderEmpty");

    if (!order) {
        empty.classList.remove("hidden");
    } else {
        detail.classList.remove("hidden");
        const buyer = Store.get("users", DATA.users).find(user => user.id === order.userId);
        const items = sellerOrderItems(order);
        const nextStatus = {
            "Dikemas": "Dikirim",
            "Dikirim": "Dalam Perjalanan",
            "Dalam Perjalanan": "Selesai"
        };
        const historyLabels = {
            "Pesanan dibuat": "Pesanan dibuat",
            "Pembayaran dikonfirmasi": "Pembayaran dikonfirmasi",
            "Pesanan dikemas": "Pesanan dikemas",
            "Pesanan dikirim": "Pesanan dikirim",
            "Pesanan dalam perjalanan": "Pesanan dalam perjalanan",
            "Pesanan selesai": "Pesanan selesai",
            "Pesanan dibatalkan": "Pesanan dibatalkan"
        };

        function renderDetail() {
            document.querySelector("#sellerOrderHeading").textContent = `Transaksi ${order.id}`;
            document.querySelector("#sellerOrderStatus").innerHTML = sellerStatusBadge(order.status);
            document.querySelector("#sellerBuyer").textContent = buyer?.name || "Pembeli";
            document.querySelector("#sellerOrderDate").textContent = formatDate(order.createdAt);
            document.querySelector("#sellerOrderAddress").textContent = order.shippingAddress || "Alamat tidak tersedia";
            document.querySelector("#sellerPayment").textContent = order.paymentMethod || "Tidak tersedia";
            document.querySelector("#sellerOrderNote").textContent = order.note || "Tidak ada catatan.";
            document.querySelector("#sellerOrderSubtotal").textContent = formatRupiah(sellerOrderSubtotal(order));
            document.querySelector("#sellerOrderItems").innerHTML = items.map(item => {
                const product = Store.get("products", DATA.products).find(entry => entry.id === item.productId);
                return `<div class="flex items-center gap-3 py-3 first:pt-0"><img class="h-14 w-14 rounded-lg object-cover" src="${escapeHTML(product?.image || "")}" alt=""><div class="min-w-0 flex-1"><strong class="block text-sm text-slate-900">${escapeHTML(item.name)}</strong><span class="text-xs text-slate-500">${Number(item.quantity)} × ${formatRupiah(item.price)}</span></div><strong class="shrink-0 text-sm text-slate-900">${formatRupiah(item.subtotal || item.price * item.quantity)}</strong></div>`;
            }).join("");
            document.querySelector("#sellerOrderHistory").innerHTML = (order.history || []).map(event => `
                <li class="flex gap-3"><span class="mt-1 h-3 w-3 shrink-0 rounded-full bg-teal-700"></span><div><strong class="block text-sm text-slate-800">${escapeHTML(historyLabels[event.status] || event.status)}</strong><time class="mt-1 block text-xs text-slate-500">${formatDate(event.time)}</time></div></li>
            `).join("") || `<li class="text-sm text-slate-500">Riwayat status belum tersedia.</li>`;

            const actions = document.querySelector("#sellerOrderActions");
            if (order.status === "Belum Dibayar") {
                actions.innerHTML = `<p class="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">Pesanan belum dibayar. Pesanan dapat diproses setelah pembayaran dikonfirmasi.</p>`;
            } else if (sellerCanAdvance(order)) {
                actions.innerHTML = `<button id="advanceSellerOrder" class="rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800">Tandai ${nextStatus[order.status]}</button>`;
            } else if (order.status === "Selesai") {
                actions.innerHTML = `<p class="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Pesanan selesai.</p>`;
            } else {
                actions.innerHTML = `<p class="rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-800">Pesanan dibatalkan dan tidak dapat diproses.</p>`;
            }
            // Click advances the generated action button by one order stage.
            document.querySelector("#advanceSellerOrder")?.addEventListener("click", advanceStatus);
        }

        function advanceStatus() {
            const next = nextStatus[order.status];
            if (!next || !sellerCanAdvance(order)) return;
            order.status = next;
            const eventName = next === "Dalam Perjalanan" ? "Pesanan dalam perjalanan" : `Pesanan ${next.toLowerCase()}`;
            order.history = [...(order.history || []), { status: eventName, time: new Date().toISOString() }];
            saveSellerOrder(order);
            renderDetail();
        }

        renderDetail();
    }
}
