const sellerReady = Auth.requireSeller();
const sellerUser = sellerReady ? Auth.current() : null;
const sellerShop = sellerReady ? Auth.currentSeller() : null;

if (sellerReady && sellerShop) {
    renderSellerNavbar(document.body.dataset.sellerActive || "");
    renderFooter();
}

const sellerStatusBadge = statusBadge;

function sellerOrderItems(order) {
    return order.products.filter(item => item.sellerId === sellerShop.id || (!item.sellerId && order.sellerId === sellerShop.id));
}

function sellerOrderSubtotal(order) {
    return sellerOrderItems(order).reduce((sum, item) => sum + Number(item.subtotal || item.price * item.quantity), 0);
}

function sellerOrderPaid(order) {
    return order.status !== "Belum Dibayar" && order.status !== "Dibatalkan";
}

function sellerCanAdvance(order) {
    return ["Dikemas", "Dikirim", "Dalam Perjalanan"].includes(order.status);
}

function saveSellerOrder(order, message = "Status pesanan diperbarui") {
    const orders = Store.get("orders", makeDummyOrders());
    const index = orders.findIndex(item => item.id === order.id);
    if (index < 0) return toast("Transaksi tidak ditemukan", "alert-circle");
    orders[index] = order;
    Store.set("orders", orders);
    toast(message);
}
