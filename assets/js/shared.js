const formatRupiah = value => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
}).format(value);

const formatDate = date => new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
}).format(new Date(date));

const icon = (name, size = 18) => `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;

function getSeller(id) {
    return Store.get("sellers", DATA.sellers).find(seller => seller.id === id) || DATA.sellers[0];
}

function getProduct(id) {
    return Store.get("products", DATA.products).find(product => product.id === Number(id));
}

function wishlistIds() {
    return Store.get("wishlist", []);
}

function cartItems() {
    return Store.get("cart", []);
}

function cartCount() {
    return cartItems().reduce((sum, item) => sum + item.quantity, 0);
}

function toggleWishlist(id) {
    let ids = wishlistIds();
    const exists = ids.includes(Number(id));
    ids = exists ? ids.filter(itemId => itemId !== Number(id)) : [...ids, Number(id)];
    Store.set("wishlist", ids);
    updateNavBadges();
    toast(exists ? "Dihapus dari favorit" : "Ditambahkan ke favorit");
    document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(button => {
        button.classList.toggle("text-rose-600", !exists);
        button.classList.toggle("fill-rose-600", !exists);
        button.setAttribute("aria-pressed", String(!exists));
        const label = button.querySelector("span");
        if (label) label.textContent = exists ? "Tambah ke Favorit" : "Hapus dari Favorit";
    });
    if (location.pathname.endsWith("wishlist.html")) renderWishlist();
    if (window.lucide) lucide.createIcons();
}

function addToCart(productId, quantity = 1, redirect = false) {
    const product = getProduct(productId);
    if (!product || product.stock <= 0) return toast("Produk sudah habis", "alert-circle");
    const cart = cartItems();
    const existing = cart.find(item => item.productId === Number(productId));
    const nextQuantity = (existing?.quantity || 0) + Number(quantity);
    if (nextQuantity > product.stock) return toast(`Maksimal ${product.stock} ${product.stockUnit}`, "alert-circle");
    if (existing) existing.quantity = nextQuantity;
    else cart.push({ productId: Number(productId), quantity: Number(quantity) });
    Store.set("cart", cart);
    updateNavBadges();
    toast("Produk ditambahkan ke keranjang", "check-circle");
    if (redirect) setTimeout(() => location.href = "cart.html", 350);
}

function buyProductNow(productId) {
    const product = getProduct(productId);
    if (!product || product.stock <= 0) return toast("Produk sudah habis", "alert-circle");
    if (!Auth.requireLogin()) return;
    Store.set("cart", [
        ...cartItems().filter(item => item.productId !== product.id),
        { productId: product.id, quantity: 1 }
    ]);
    updateNavBadges();
    location.href = "checkout.html";
}

function updateNavBadges() {
    document.querySelectorAll("[data-cart-count]").forEach(element => element.textContent = cartCount());
    document.querySelectorAll("[data-wishlist-count]").forEach(element => element.textContent = wishlistIds().length);
}

function toast(message, iconName = "check-circle") {
    let element = document.querySelector(".toast");
    if (!element) {
        element = document.createElement("div");
        element.className = "toast fixed bottom-5 right-5 z-[100] flex translate-y-4 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white opacity-0 shadow-xl transition-all";
        document.body.appendChild(element);
    }
    element.innerHTML = `${icon(iconName, 17)}<span>${message}</span>`;
    element.classList.remove("translate-y-4", "opacity-0");
    element.classList.add("translate-y-0", "opacity-100");
    clearTimeout(element.timer);
    element.timer = setTimeout(() => {
        element.classList.remove("translate-y-0", "opacity-100");
        element.classList.add("translate-y-4", "opacity-0");
    }, 2600);
    if (window.lucide) lucide.createIcons();
}

function renderNavbar(active = "") {
    const current = Auth.current();
    const activeClasses = "text-teal-700 after:absolute after:-bottom-7 after:left-0 after:h-0.5 after:w-full after:bg-teal-600";
    const navItems = [
        ["home", "Beranda", "index.html"],
        ["products", "Produk", "products.html"],
        ["orders", "Pesanan", "orders.html"],
        ["wishlist", "Favorit", "wishlist.html"]
    ];
    const navLinks = navItems.map(([key, label, href]) => `
        <a class="relative text-sm font-semibold transition hover:text-teal-700 ${active === key ? activeClasses : "text-slate-600"}" href="${href}">${label}</a>
    `).join("");
    const actions = current
        ? `<a class="hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-teal-600 hover:text-teal-700 sm:grid" href="profile.html" title="Profil">${icon("user-round", 18)}</a>`
        : `<a class="hidden rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-800 sm:inline-flex" href="login.html">Masuk</a>`;

    document.body.insertAdjacentHTML("afterbegin", `
        <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div class="mx-auto flex h-[72px] max-w-7xl items-center gap-2 px-4 sm:gap-6 sm:px-6 lg:px-8">
                <a class="flex shrink-0 items-center gap-3 text-slate-900" href="index.html">
                    <span class="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">${icon("waves", 23)}</span>
                    <span class="font-heading text-[15px] font-extrabold leading-tight sm:text-lg">AkuAnakNelayan<small class="mt-0.5 hidden font-sans text-[9px] font-bold leading-none tracking-[.18em] text-teal-700 sm:block">MARKETPLACE HASIL LAUT</small></span>
                </a>
                <nav id="navLinks" class="absolute left-0 right-0 top-[72px] hidden flex-col gap-5 border-b border-slate-200 bg-white p-5 shadow-lg md:static md:ml-auto md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none">${navLinks}</nav>
                <div class="ml-auto flex items-center gap-2 md:ml-0">
                    <a class="relative hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-teal-600 hover:text-teal-700 sm:grid" href="wishlist.html" title="Favorit">
                        ${icon("heart", 18)}<span class="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-rose-600 px-1 text-[10px] font-bold text-white" data-wishlist-count>0</span>
                    </a>
                    <a class="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-teal-600 hover:text-teal-700" href="cart.html" title="Keranjang">
                        ${icon("shopping-cart", 18)}<span class="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-rose-600 px-1 text-[10px] font-bold text-white" data-cart-count>0</span>
                    </a>
                    ${actions}
                    <button class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 md:hidden" id="mobileToggle" aria-label="Buka menu">${icon("menu", 20)}</button>
                </div>
            </div>
        </header>
    `);

    updateNavBadges();
    document.querySelector("#mobileToggle")?.addEventListener("click", () => {
        const navLinks = document.querySelector("#navLinks");
        const isOpen = navLinks.classList.contains("hidden");
        navLinks.classList.toggle("hidden", !isOpen);
        navLinks.classList.toggle("flex", isOpen);
    });
    if (window.lucide) lucide.createIcons();
}

function renderFooter() {
    document.body.insertAdjacentHTML("beforeend", `
        <footer class="mt-16 bg-slate-900 text-white">
            <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                <div>
                    <a class="flex items-center gap-3 font-heading text-lg font-extrabold" href="index.html">
                        <span class="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-900">${icon("waves", 23)}</span>
                        AkuAnakNelayan
                    </a>
                    <p class="mt-4 max-w-xs text-sm leading-6 text-slate-300">Marketplace hasil laut langsung dari nelayan Pangandaran.</p>
                </div>
                <div><h2 class="font-bold">Marketplace</h2><div class="mt-4 grid gap-2 text-sm text-slate-300"><a class="hover:text-white" href="products.html">Semua Produk</a><a class="hover:text-white" href="orders.html">Pesanan Saya</a><a class="hover:text-white" href="wishlist.html">Favorit</a></div></div>
                <div><h2 class="font-bold">Bantuan</h2><div class="mt-4 grid gap-2 text-sm text-slate-300"><a class="hover:text-white" href="#">Cara Belanja</a><a class="hover:text-white" href="#">Hubungi Kami</a><a class="hover:text-white" href="#">Kebijakan Pengiriman</a></div></div>
                <div><h2 class="font-bold">Kontak</h2><p class="mt-4 text-sm leading-6 text-slate-300">Pangandaran, Jawa Barat<br>+62 812-3456-7890<br>halo@lautpangandaran.id</p></div>
            </div>
            <div class="border-t border-white/10 py-4 text-center text-xs text-slate-400">&copy; 2026 AkuAnakNelayan. Semua hak dilindungi.</div>
        </footer>
    `);
    if (window.lucide) lucide.createIcons();
}

function productCard(product) {
    const seller = getSeller(product.sellerId);
    const isWishlisted = wishlistIds().includes(product.id);
    const soldOut = product.stock <= 0;
    return `
        <article class="group overflow-hidden rounded-2xl border shadow-sm transition ${soldOut ? "border-slate-300 bg-slate-100" : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg"}">
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <a href="product-detail.html?id=${product.id}"><img class="h-full w-full object-cover transition duration-300 ${soldOut ? "grayscale opacity-60" : "group-hover:scale-105"}" src="${product.image}" alt="${product.name}" loading="lazy"></a>
                <button class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-500 shadow transition hover:text-rose-600 ${isWishlisted ? "text-rose-600 fill-rose-600" : ""}" data-wishlist="${product.id}" aria-pressed="${isWishlisted}" onclick="toggleWishlist(${product.id})" aria-label="Favorit">${icon("heart", 18)}</button>
                <span class="absolute bottom-3 left-3 rounded-full ${soldOut ? "bg-slate-600" : "bg-slate-900/90"} px-3 py-1.5 text-xs font-bold text-white">${soldOut ? "Stok habis" : `${product.stock} ${product.stockUnit} tersedia`}</span>
            </div>
            <div class="p-4 ${soldOut ? "bg-slate-100" : "bg-white"}">
                <div class="flex items-center justify-between gap-2 text-xs"><span class="font-bold ${soldOut ? "text-slate-500" : "text-teal-700"}">${product.freshness}</span><span class="text-slate-500">${formatDate(product.catchDate)}</span></div>
                <a class="mt-2 block font-heading text-base font-bold ${soldOut ? "text-slate-500" : "text-slate-900 hover:text-teal-700"}" href="product-detail.html?id=${product.id}">${product.name}</a>
                <div class="mt-2 text-lg font-extrabold ${soldOut ? "text-slate-500" : "text-slate-900"}">${formatRupiah(product.price)} <span class="text-xs font-medium text-slate-500">/kg</span></div>
                <div class="mt-2 flex items-center gap-1 text-xs text-slate-500">${icon("map-pin", 13)} ${seller.location}</div>
                <div class="mt-4 flex items-center gap-1 border-t border-slate-200 pt-3 text-xs font-bold ${soldOut ? "text-slate-500" : "text-amber-600"}">${icon("star", 14)} ${product.rating} <span class="ml-1 font-medium text-slate-500">${product.sold} terjual</span></div>
                <div class="mt-3 grid grid-cols-2 gap-2">
                    <button class="inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-bold transition ${soldOut ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400" : "border-slate-300 bg-white text-slate-700 hover:border-teal-700 hover:text-teal-700"}" onclick="addToCart(${product.id})" ${soldOut ? "disabled" : ""}>${icon("shopping-cart", 15)}Keranjang</button>
                    <button class="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-bold text-white transition ${soldOut ? "cursor-not-allowed bg-slate-400" : "bg-teal-700 hover:bg-teal-800"}" onclick="buyProductNow(${product.id})" ${soldOut ? "disabled" : ""}>${icon("zap", 15)}Pesan</button>
                    <button class="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold transition hover:border-rose-300 ${isWishlisted ? "text-rose-600" : "text-slate-600 hover:text-rose-600"}" data-wishlist="${product.id}" aria-pressed="${isWishlisted}" onclick="toggleWishlist(${product.id})">${icon("heart", 15)}<span>${isWishlisted ? "Hapus dari Favorit" : "Tambah ke Favorit"}</span></button>
                </div>
                <a class="mt-2 flex items-center justify-center gap-1 border-t border-slate-200 pt-3 text-sm font-bold ${soldOut ? "text-slate-500" : "text-teal-700 hover:text-teal-900"}" href="product-detail.html?id=${product.id}">Detail produk <span aria-hidden="true">&rarr;</span></a>
            </div>
        </article>`;
}
