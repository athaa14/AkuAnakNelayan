if (Auth.requireBuyer()) {
    renderNavbar("orders");
    renderFooter();

    const id = new URLSearchParams(location.search).get("id");
    const orders = Store.get("orders", makeDummyOrders());
    const order = orders.find(item => item.id === id && item.userId === Auth.current().id);
    if (!order) {
        location.replace("orders.html");
    } else {
    const stages = [
        "Pesanan dibuat",
        "Pembayaran dikonfirmasi",
        "Pesanan dikemas",
        "Pesanan dikirim",
        "Pesanan dalam perjalanan",
        "Pesanan selesai"
    ];
    const statusStage = {
        "Belum Dibayar": 0,
        "Dikemas": 2,
        "Dikirim": 3,
        "Dalam Perjalanan": 4,
        "Selesai": 5
    };

    function renderDetail() {
        const cancelled = order.status === "Dibatalkan";
        const completeThrough = statusStage[order.status] ?? -1;
        const status = document.querySelector("#orderStatus");
        status.textContent = order.status;
        status.className = `rounded-full px-3 py-1 text-xs font-bold ${cancelled ? "bg-rose-100 text-rose-700" : order.status === "Belum Dibayar" ? "bg-amber-100 text-amber-800" : "bg-teal-50 text-teal-700"}`;
        document.querySelector("#orderHeading").textContent = order.id;
        document.querySelector("#orderSubtotal").textContent = formatRupiah(order.subtotal);
        document.querySelector("#orderShipping").textContent = formatRupiah(order.shippingCost);
        document.querySelector("#orderTotal").textContent = formatRupiah(order.total);
        document.querySelector("#orderAddress").textContent = order.shippingAddress;
        document.querySelector("#orderPayment").textContent = order.paymentMethod;

        document.querySelector("#orderTimeline").innerHTML = cancelled
            ? `<li class="flex gap-4"><span class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700">${icon("x", 13)}</span><div><strong class="text-sm text-slate-900">Pesanan dibatalkan</strong><span class="mt-1 block text-xs text-slate-500">${formatDate(order.createdAt)}</span></div></li>`
            : stages.map((stage, index) => {
                const done = index <= completeThrough;
                const time = order.history.find(entry => entry.status === stage)?.time;
                return `<li class="flex gap-4"><span class="mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${done ? "border-teal-700 bg-teal-700" : "border-slate-300 bg-white"}"></span><div><strong class="text-sm ${done ? "text-slate-900" : "text-slate-400"}">${stage}</strong><span class="mt-1 block text-xs text-slate-500">${done ? `Waktu: ${time ? formatDate(time) : formatDate(order.createdAt)}` : "Menunggu tahapan berikutnya"}</span></div></li>`;
            }).join("");

        document.querySelector("#orderItems").innerHTML = order.products.map(item => `
            <div class="flex justify-between gap-4 py-3 text-sm"><span class="text-slate-600">${escapeHTML(item.name)} × ${item.quantity}</span><strong class="shrink-0 text-slate-900">${formatRupiah(item.subtotal)}</strong></div>
        `).join("");
        document.querySelector("#reviewCard").classList.toggle("hidden", order.status !== "Selesai");

        const actions = document.querySelector("#orderActions");
        actions.innerHTML = "";
        if (order.status === "Belum Dibayar") {
            actions.innerHTML = `<button class="rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800" id="confirmPayment">Konfirmasi Pembayaran</button><button class="rounded-lg border border-rose-200 px-4 py-3 text-sm font-bold text-rose-700 hover:bg-rose-50" id="cancelOrder">Batalkan Pesanan</button>`;
            document.querySelector("#cancelOrder").addEventListener("click", () => {
                order.status = "Dibatalkan";
                order.history.push({ status: "Pesanan dibatalkan", time: new Date().toISOString() });
                if (order.stockDeducted) {
                    const products = Store.get("products", DATA.products);
                    order.products.forEach(item => {
                        const product = products.find(entry => entry.id === item.productId);
                        if (product) {
                            product.stock += item.quantity;
                            if (order.soldCounted) product.sold = Math.max(0, Number(product.sold || 0) - item.quantity);
                            product.isAvailable = product.stock > 0;
                        }
                    });
                    Store.set("products", products);
                    order.stockDeducted = false;
                }
                save();
                renderDetail();
                toast("Pesanan dibatalkan");
            });
            document.querySelector("#confirmPayment").addEventListener("click", confirmPayment);
        }
        if (window.lucide) lucide.createIcons();
    }

    function confirmPayment() {
        if (order.status !== "Belum Dibayar") return;
        const now = new Date().toISOString();
        order.status = "Dikemas";
        const products = Store.get("products", DATA.products);
        order.products.forEach(item => {
            const product = products.find(entry => entry.id === item.productId);
            if (product) product.sold = Number(product.sold || 0) + item.quantity;
        });
        Store.set("products", products);
        order.soldCounted = true;
        order.history.push(
            { status: "Pembayaran dikonfirmasi", time: now },
            { status: "Pesanan dikemas", time: now }
        );
        save();
        renderDetail();
        toast("Pembayaran simulasi dikonfirmasi");
    }

    function save() {
        const allOrders = Store.get("orders", makeDummyOrders());
        const index = allOrders.findIndex(item => item.id === order.id);
        if (index >= 0) {
            allOrders[index] = order;
            Store.set("orders", allOrders);
        }
    }

    document.querySelector("#submitReview").addEventListener("click", () => {
        const comment = document.querySelector("#reviewComment").value.trim();
        if (!comment) return toast("Komentar tidak boleh kosong", "alert-circle");
        const reviews = Store.get("reviews", DATA.reviews);
        reviews.push({
            id: Date.now(),
            productId: order.products[0].productId,
            userName: Auth.current().name,
            rating: Number(document.querySelector("#reviewRating").value),
            comment,
            date: new Date().toISOString().slice(0, 10),
            image: null
        });
        Store.set("reviews", reviews);
        toast("Ulasan berhasil dikirim");
    });

    renderDetail();
    }
}
