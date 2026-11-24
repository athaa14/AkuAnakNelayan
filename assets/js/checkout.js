if (Auth.requireLogin()) {
    renderNavbar("");
    renderFooter();

    const current = Auth.current();
    const cart = cartItems().map(item => ({ ...item, product: getProduct(item.productId) })).filter(item => item.product);

    if (!cart.length) {
        document.querySelector("#checkoutEmpty").classList.remove("hidden");
        document.querySelector("#checkoutLayout").classList.add("hidden");
    } else {
        const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const form = document.querySelector("#checkoutForm");
        form.elements.name.value = current.name;
        form.elements.phone.value = current.phone;
        form.elements.address.value = current.address;
        document.querySelector("#checkoutLayout").classList.remove("hidden");
        document.querySelector("#checkoutItems").innerHTML = cart.map(item => `
            <div class="flex justify-between gap-3 text-sm">
                <span class="text-slate-600">${item.product.name} × ${item.quantity}</span>
                <strong class="shrink-0 text-slate-900">${formatRupiah(item.product.price * item.quantity)}</strong>
            </div>`).join("");
        document.querySelector("#checkoutSubtotal").textContent = formatRupiah(subtotal);
        document.querySelector("#checkoutTotal").textContent = formatRupiah(subtotal + 10000);

        document.querySelector("#confirmOrder").addEventListener("click", () => {
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const now = new Date().toISOString();
            const orders = Store.get("orders", makeDummyOrders());
            const orderNumber = orders.length + 1;
            const products = cart.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                subtotal: item.product.price * item.quantity
            }));
            const order = {
                id: `ORD-${String(orderNumber).padStart(3, "0")}`,
                userId: current.id,
                products,
                shippingAddress: data.get("address"),
                paymentMethod: data.get("payment"),
                subtotal,
                shippingCost: 10000,
                total: subtotal + 10000,
                status: "Belum Dibayar",
                createdAt: now,
                history: [{ status: "Pesanan dibuat", time: now }]
            };
            const allProducts = Store.get("products", DATA.products);
            cart.forEach(item => {
                const product = allProducts.find(entry => entry.id === item.productId);
                if (product) {
                    product.stock -= item.quantity;
                    product.isAvailable = product.stock > 0;
                }
            });
            Store.set("products", allProducts);
            orders.unshift(order);
            Store.set("orders", orders);
            Store.set("cart", []);
            toast("Pesanan berhasil dibuat");
            setTimeout(() => location.href = `order-detail.html?id=${order.id}`, 500);
        });
    }

    updateNavBadges();
    if (window.lucide) lucide.createIcons();
}
