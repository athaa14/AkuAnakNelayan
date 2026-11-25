renderNavbar("cart");
renderFooter();

function renderCart() {
    const cart = cartItems();
    const valid = cart.map(item => ({ item, product: getProduct(item.productId) })).filter(entry => entry.product);
    let subtotal = 0;
    const sellerIds = new Set(valid.map(({ product }) => product.sellerId));
    const shippingCost = sellerIds.size * 10000;
    document.querySelector("#cartItems").innerHTML = valid.map(({ item, product }) => {
        subtotal += product.price * item.quantity;
        return `
            <article class="grid grid-cols-[76px_1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[100px_1fr_auto] sm:p-4">
                <img class="h-[76px] w-[76px] rounded-xl object-cover sm:h-24 sm:w-24" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
                <div><h2 class="font-heading font-bold text-slate-900">${escapeHTML(product.name)}</h2><p class="mt-1 text-sm font-bold text-teal-700">${formatRupiah(product.price)} <span class="font-normal text-slate-500">/kg</span></p>
                    <div class="mt-3 inline-flex h-9 items-center rounded-lg border border-slate-200">
                        <button class="h-full w-9 text-slate-600 hover:text-teal-700" onclick="changeCartQty(${product.id},-1)" aria-label="Kurangi jumlah">−</button><span class="w-8 text-center text-sm">${item.quantity}</span><button class="h-full w-9 text-slate-600 hover:text-teal-700" onclick="changeCartQty(${product.id},1)" aria-label="Tambah jumlah">+</button>
                    </div>
                </div>
                <div class="col-span-2 flex items-center justify-between border-t border-slate-100 pt-3 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right">
                    <strong class="text-slate-900">${formatRupiah(product.price * item.quantity)}</strong>
                    <button class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-rose-700 hover:bg-rose-50 sm:mt-3" onclick="removeCart(${product.id})">${icon("trash-2", 14)} Hapus</button>
                </div>
            </article>`;
    }).join("");

    document.querySelector("#cartLayout").classList.toggle("hidden", !valid.length);
    document.querySelector("#cartEmpty").classList.toggle("hidden", Boolean(valid.length));
    document.querySelector("#cartSubtotal").textContent = formatRupiah(subtotal);
    document.querySelector("#cartShipping").textContent = formatRupiah(shippingCost);
    document.querySelector("#cartTotal").textContent = formatRupiah(subtotal + shippingCost);
    updateNavBadges();
    if (window.lucide) lucide.createIcons();
}

function changeCartQty(id, delta) {
    const cart = cartItems();
    const item = cart.find(entry => entry.productId === id);
    const product = getProduct(id);
    if (!item || !product) return;
    item.quantity += delta;
    if (item.quantity < 1) item.quantity = 1;
    if (item.quantity > product.stock) {
        toast(`Maksimal ${product.stock} ${product.stockUnit}`, "alert-circle");
        item.quantity = product.stock;
    }
    Store.set("cart", cart);
    renderCart();
}

function removeCart(id) {
    Store.set("cart", cartItems().filter(item => item.productId !== id));
    toast("Produk dihapus");
    renderCart();
}

document.querySelector("#checkoutBtn").addEventListener("click", () => {
    if (Auth.requireBuyer()) location.href = "checkout.html";
});
renderCart();
