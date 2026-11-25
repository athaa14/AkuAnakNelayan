const adminReady = Auth.requireAdmin();
const adminUser = adminReady ? Auth.current() : null;

if (adminReady) {
    renderAdminNavbar(document.body.dataset.adminActive || "");
    renderFooter();
}

function adminPaid(order) {
    return order.status !== "Belum Dibayar" && order.status !== "Dibatalkan";
}

function adminOrderRevenue(order) {
    return (order.products || []).reduce((sum, item) => sum + Number(item.subtotal || item.price * item.quantity), 0);
}

function adminFindUser(id) {
    return Store.get("users", DATA.users).find(user => user.id === id || String(user.id) === String(id));
}

function adminFindSeller(id) {
    if (id === null || id === undefined) return null;
    return Store.get("sellers", DATA.sellers).find(seller => seller.id === id || String(seller.id) === String(id));
}

function adminSellerName(id) {
    return adminFindSeller(id)?.shopName || "Toko tidak diketahui";
}

function adminProductName(id) {
    return Store.get("products", DATA.products).find(product => product.id === Number(id))?.name || "Produk dihapus";
}

function adminSaveOrder(order, message = "Pesanan diperbarui") {
    const orders = Store.get("orders", makeDummyOrders());
    const index = orders.findIndex(item => item.id === order.id);
    if (index < 0) return toast("Pesanan tidak ditemukan", "alert-circle");
    orders[index] = order;
    Store.set("orders", orders);
    toast(message);
}

function adminRestoreStock(order) {
    if (!order.stockDeducted || order.stockRestored) return false;
    const products = Store.get("products", DATA.products);
    const now = new Date().toISOString();
    (order.products || []).forEach(item => {
        const product = products.find(entry => entry.id === Number(item.productId));
        if (!product) return;
        product.stock = Number(product.stock || 0) + Number(item.quantity || 0);
        product.isAvailable = product.stock > 0;
        product.updatedAt = now;
    });
    Store.set("products", products);
    return true;
}
