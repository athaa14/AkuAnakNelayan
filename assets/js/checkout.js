if (Auth.requireBuyer()) {
    renderNavbar("");
    renderFooter();

    const current = Auth.current();
    const cart = cartItems().map(item => ({ ...item, product: getProduct(item.productId) })).filter(item => item.product);
    const groups = new Map();
    cart.forEach(item => {
        const group = groups.get(item.product.sellerId) || [];
        group.push(item);
        groups.set(item.product.sellerId, group);
    });
    const shippingCostPerStore = Number(Store.get("siteSettings", DATA.siteSettings).shippingCostPerStore) || 10000;
    const shippingCost = groups.size * shippingCostPerStore;
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!cart.length) {
        document.querySelector("#checkoutEmpty").classList.remove("hidden");
        document.querySelector("#checkoutLayout").classList.add("hidden");
    } else {
        const form = document.querySelector("#checkoutForm");
        form.elements.name.value = current.name;
        form.elements.phone.value = current.phone;
        form.elements.address.value = current.address;
        document.querySelector("#checkoutLayout").classList.remove("hidden");
        document.querySelector("#checkoutItems").innerHTML = [...groups.entries()].map(([sellerId, items]) => {
            const seller = getSeller(sellerId);
            return `<div class="rounded-xl bg-slate-50 p-3"><strong class="mb-2 block text-xs text-slate-800">${escapeHTML(seller.shopName)}</strong>${items.map(item => `
                <div class="flex justify-between gap-3 py-1 text-sm"><span class="text-slate-600">${escapeHTML(item.product.name)} × ${item.quantity}</span><strong class="shrink-0 text-slate-900">${formatRupiah(item.product.price * item.quantity)}</strong></div>
            `).join("")}</div>`;
        }).join("");
        document.querySelector("#checkoutSubtotal").textContent = formatRupiah(subtotal);
        document.querySelector("#checkoutShipping").textContent = formatRupiah(shippingCost);
        document.querySelector("#checkoutTotal").textContent = formatRupiah(subtotal + shippingCost);
        document.querySelector("#checkoutShippingNote").textContent = `${groups.size} toko · ${formatRupiah(shippingCostPerStore)} per toko`;

        document.querySelector("#confirmOrder").addEventListener("click", () => {
            if (!form.reportValidity()) return;
            const allProducts = Store.get("products", DATA.products);
            const freshCart = cartItems();
            const checkoutProducts = freshCart.map(item => ({
                ...item,
                product: allProducts.find(product => product.id === item.productId && product.isPublished !== false)
            }));
            const invalid = checkoutProducts.find(item => !item.product || item.product.stock < item.quantity);
            if (invalid) {
                toast("Stok produk berubah. Periksa kembali keranjang Anda.", "alert-circle");
                return;
            }

            const data = new FormData(form);
            const now = new Date().toISOString();
            const orders = Store.get("orders", makeDummyOrders());
            const currentNumber = orders.reduce((max, order) => {
                const match = String(order.id).match(/(\d+)$/);
                return Math.max(max, match ? Number(match[1]) : 0);
            }, 0);
            const groupedCart = new Map();
            checkoutProducts.forEach(item => {
                const sellerId = item.product.sellerId;
                const group = groupedCart.get(sellerId) || [];
                group.push(item);
                groupedCart.set(sellerId, group);
            });
            let nextNumber = currentNumber;
            const newOrders = [...groupedCart.entries()].map(([sellerId, items]) => {
                nextNumber += 1;
                const products = items.map(item => ({
                    productId: item.product.id,
                    sellerId,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    subtotal: item.product.price * item.quantity
                }));
                const orderSubtotal = products.reduce((sum, item) => sum + item.subtotal, 0);
                return {
                    id: `ORD-${String(nextNumber).padStart(3, "0")}`,
                    userId: current.id,
                    sellerId,
                    products,
                    shippingAddress: String(data.get("address")).trim(),
                    paymentMethod: String(data.get("payment")),
                    note: String(data.get("note") || "").trim(),
                    subtotal: orderSubtotal,
                    shippingCost: shippingCostPerStore,
                    total: orderSubtotal + shippingCostPerStore,
                    status: "Belum Dibayar",
                    stockDeducted: true,
                    soldCounted: false,
                    createdAt: now,
                    history: [{ status: "Pesanan dibuat", time: now }]
                };
            });

            checkoutProducts.forEach(item => {
                item.product.stock -= item.quantity;
                item.product.isAvailable = item.product.stock > 0;
                item.product.updatedAt = now;
            });
            Store.set("products", allProducts);
            Store.set("orders", [...newOrders.reverse(), ...orders]);
            Store.set("cart", []);
            toast(`${newOrders.length} transaksi berhasil dibuat`);
            setTimeout(() => location.href = `order-detail.html?id=${encodeURIComponent(newOrders[0].id)}`, 500);
        });
    }

    updateNavBadges();
    if (window.lucide) lucide.createIcons();
}
