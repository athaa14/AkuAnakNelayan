const Store = {
    get(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (_) {
            return fallback;
        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    init() {
        if (!localStorage.getItem("products") || !localStorage.getItem("orders")) {
            this.reset(false);
            return;
        }
        this.migrate();
    },
    seedSupportData() {
        if (!this.get("categories", null)) this.set("categories", DATA.categories);
        const storedContent = this.get("siteContent", {}) || {};
        const storedSettings = this.get("siteSettings", {}) || {};
        this.set("siteContent", { ...DATA.siteContent, ...storedContent, pages: { ...DATA.siteContent.pages, ...(storedContent.pages || {}) } });
        this.set("siteSettings", { ...DATA.siteSettings, ...storedSettings });
    },
    migrate() {
        this.seedSupportData();
        const users = this.get("users", DATA.users).map(user => ({ role: "buyer", isActive: true, ...user }));
        DATA.users.forEach(seed => {
            const existing = users.find(user => user.id === seed.id || user.email === seed.email);
            if (existing) Object.assign(existing, { ...seed, ...existing, role: existing.role || seed.role, isActive: existing.isActive !== false });
            else users.push(seed);
        });
        this.set("users", users);

        const sellers = this.get("sellers", DATA.sellers);
        DATA.sellers.forEach(seed => {
            const existing = sellers.find(seller => seller.id === seed.id);
            if (existing) Object.assign(existing, { ...seed, ...existing, ownerUserId: existing.ownerUserId || seed.ownerUserId });
            else sellers.push(seed);
        });
        this.set("sellers", sellers);

        const products = this.get("products", DATA.products).map(product => ({
            ...product,
            isAvailable: Number(product.stock) > 0,
            isPublished: product.isPublished !== false,
            updatedAt: product.updatedAt || product.catchDate
        }));
        this.set("products", products);

        const orders = this.get("orders", makeDummyOrders()).map(order => {
            const items = order.products.map(item => {
                const product = products.find(entry => entry.id === Number(item.productId));
                return { ...item, sellerId: item.sellerId || product?.sellerId };
            });
            const orderNumber = Number(String(order.id).match(/(\d+)$/)?.[1] || 0);
            return {
                ...order,
                sellerId: order.sellerId || items[0]?.sellerId,
                products: items,
                stockDeducted: order.stockDeducted ?? (orderNumber > 8 && order.status !== "Dibatalkan")
            };
        });
        this.set("orders", orders);
    },
    reset(confirmReset = true) {
        if (confirmReset && !window.confirm("Reset semua data ke data awal?")) return;
        this.set("products", DATA.products);
        this.set("sellers", DATA.sellers);
        this.set("users", DATA.users);
        this.set("reviews", DATA.reviews);
        this.set("categories", DATA.categories);
        this.set("siteContent", DATA.siteContent);
        this.set("siteSettings", DATA.siteSettings);
        this.set("cart", []);
        this.set("wishlist", []);
        this.set("orders", makeDummyOrders());
        localStorage.removeItem("currentUser");
    }
};

function makeDummyOrders() {
    const products = DATA.products;
    const statuses = [
        "Dikemas", "Dikirim", "Dalam Perjalanan", "Selesai", "Dikemas", "Selesai",
        "Selesai", "Dikirim", "Dalam Perjalanan", "Selesai", "Belum Dibayar", "Dibatalkan"
    ];
    return statuses.map((status, i) => {
        const sellerId = i % DATA.sellers.length + 1;
        const product = products.find(item => item.sellerId === sellerId);
        const quantity = i % 3 + 1;
        const subtotal = product.price * quantity;
        const day = 20 - i % 6;
        const createdAt = `2026-11-${String(day).padStart(2, "0")}T09:00:00`;
        const history = [{ status: "Pesanan dibuat", time: createdAt }];
        const stages = ["Dikemas", "Dikirim", "Dalam Perjalanan", "Selesai"];
        const stageIndex = stages.indexOf(status);

        if (status !== "Belum Dibayar" && status !== "Dibatalkan") {
            history.push({ status: "Pembayaran dikonfirmasi", time: `2026-11-${String(day).padStart(2, "0")}T10:15:00` });
            for (let step = 0; step <= stageIndex; step++) {
                history.push({
                    status: `Pesanan ${stages[step] === "Dalam Perjalanan" ? "dalam perjalanan" : stages[step].toLowerCase()}`,
                    time: `2026-11-${String(day).padStart(2, "0")}T${String(11 + step).padStart(2, "0")}:20:00`
                });
            }
        }
        if (status === "Dibatalkan") history.push({ status: "Pesanan dibatalkan", time: `2026-11-${String(day).padStart(2, "0")}T12:20:00` });

        return {
            id: `ORD-${String(i + 1).padStart(3, "0")}`,
            userId: 1,
            sellerId,
            products: [{
                productId: product.id,
                sellerId,
                name: product.name,
                price: product.price,
                quantity,
                subtotal
            }],
            shippingAddress: DATA.users[0].address,
            paymentMethod: ["Transfer Bank", "E-Wallet", "COD"][i % 3],
            note: i % 3 === 0 ? "Mohon dikemas dengan es." : "",
            subtotal,
            shippingCost: 10000,
            total: subtotal + 10000,
            status,
            stockDeducted: false,
            createdAt,
            history
        };
    });
}

Store.init();
