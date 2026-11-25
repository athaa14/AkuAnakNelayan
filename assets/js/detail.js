renderNavbar("products");
renderFooter();

const id = Number(new URLSearchParams(location.search).get("id")) || 1;
const product = getProduct(id);
if (!product) {
    document.querySelector("#productDetailContent").classList.add("hidden");
    document.querySelector("#productNotFound").classList.remove("hidden");
} else {
    const seller = getSeller(product.sellerId);
    const soldOut = product.stock <= 0;
    const isWishlisted = wishlistIds().includes(product.id);
    const reviews = Store.get("reviews", DATA.reviews).filter(review => review.productId === product.id);
    const gallery = [product.image, ...(product.proofImages || [])];
    const mainImage = document.querySelector("#mainDetailImage");
    const quantity = document.querySelector("#buyQty");
    const buyButton = document.querySelector("#buyNow");
    const addCartButton = document.querySelector("#addCart");
    const wishlistButton = document.querySelector("#detailWishlist");

    document.querySelector("#detailBreadcrumb").textContent = `${product.category} / ${product.name}`;
    document.querySelector("#detailCategory").textContent = product.category;
    document.querySelector("#detailName").textContent = product.name;
    document.querySelector("#detailName").classList.toggle("text-slate-500", soldOut);
    document.querySelector("#detailName").classList.toggle("text-slate-900", !soldOut);
    document.querySelector("#detailRating").textContent = product.rating;
    document.querySelector("#detailSold").textContent = `${product.sold} terjual`;
    document.querySelector("#detailPrice").innerHTML = `${formatRupiah(product.price)} <span class="text-sm font-semibold text-slate-500">/ kg</span>`;
    document.querySelector("#detailPrice").classList.toggle("text-slate-500", soldOut);
    document.querySelector("#detailPrice").classList.toggle("text-slate-900", !soldOut);
    document.querySelector("#detailDescription").textContent = product.description;
    document.querySelector("#mainDetailImage").src = product.image;
    document.querySelector("#mainDetailImage").alt = product.name;
    document.querySelector("#mainDetailImage").classList.toggle("grayscale", soldOut);
    document.querySelector("#mainDetailImage").classList.toggle("opacity-60", soldOut);

    document.querySelector("#detailInfo").innerHTML = [
        ["Stok tersedia", product.stock > 0 ? `${product.stock} ${product.stockUnit}` : "Habis"],
        ["Kesegaran", product.freshness],
        ["Tanggal tangkap", formatDate(product.catchDate)],
        ["Waktu tangkap", `${product.catchTime} WIB`]
    ].map(([label, value]) => `
        <div class="rounded-xl bg-amber-50 p-3"><span class="block text-xs text-slate-500">${escapeHTML(label)}</span><strong class="mt-1 block text-sm text-slate-900">${escapeHTML(value)}</strong></div>
    `).join("");
    document.querySelector("#detailThumbs").innerHTML = gallery.map((image, index) => `
        <button class="overflow-hidden rounded-xl border-2 ${index === 0 ? "border-teal-700" : "border-transparent"} ${soldOut ? "grayscale opacity-60" : ""}" data-image="${escapeHTML(image)}" aria-label="Lihat gambar ${index + 1}">
            <img class="h-20 w-full object-cover" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)} dokumentasi ${index + 1}">
        </button>
    `).join("");
    document.querySelectorAll("#detailThumbs button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll("#detailThumbs button").forEach(item => item.classList.replace("border-teal-700", "border-transparent"));
            button.classList.replace("border-transparent", "border-teal-700");
            mainImage.src = button.dataset.image;
        });
    });

    document.querySelector("#stockNotice").classList.toggle("hidden", product.stock > 0);
    quantity.max = product.stock;
    quantity.disabled = product.stock <= 0;
    document.querySelector("#qtyMinus").disabled = product.stock <= 0;
    document.querySelector("#qtyPlus").disabled = product.stock <= 0;
    buyButton.disabled = product.stock <= 0;
    addCartButton.disabled = product.stock <= 0;
    wishlistButton.dataset.wishlist = product.id;
    wishlistButton.classList.toggle("text-rose-600", isWishlisted);
    wishlistButton.querySelector("span").textContent = isWishlisted ? "Hapus dari Favorit" : "Tambahkan ke Favorit";

    document.querySelector("#proofGrid").innerHTML = (product.proofImages || []).map((image, index) => `
        <figure><img class="h-40 w-full rounded-xl object-cover" src="${escapeHTML(image)}" alt="Dokumentasi hasil tangkapan ${index + 1}"><figcaption class="mt-2 text-xs text-slate-500">${["Hasil tangkapan nelayan", "Bukti proses penimbangan", "Penyimpanan menggunakan es"][index]}</figcaption></figure>
    `).join("");
    document.querySelector("#reviewsList").innerHTML = reviews.length ? reviews.map(review => `
        <article class="py-4 first:pt-0"><div class="flex items-center justify-between gap-3"><strong class="text-sm text-slate-900">${escapeHTML(review.userName)}</strong><span class="flex items-center gap-1 text-xs font-bold text-amber-600">${icon("star", 13)} ${review.rating}</span></div><p class="mt-2 text-sm leading-6 text-slate-600">${escapeHTML(review.comment)}</p><time class="mt-1 block text-xs text-slate-400">${formatDate(review.date)}</time></article>
    `).join("") : `<p class="py-4 text-sm text-slate-500">Belum ada ulasan untuk produk ini.</p>`;
    document.querySelector("#sellerImage").src = seller.image;
    document.querySelector("#sellerImage").alt = seller.shopName;
    document.querySelector("#sellerName").textContent = seller.shopName;
    document.querySelector("#sellerRating").textContent = seller.rating;
    document.querySelector("#sellerLocation").textContent = `${seller.ownerName} · ${seller.location}`;
    document.querySelector("#sellerDescription").textContent = seller.description;
    document.querySelector("#sellerProfileLink").href = `products.html?sellerId=${seller.id}`;
    document.querySelector("#sellerProfileLink").setAttribute("aria-label", `Lihat produk milik ${seller.shopName}`);

    document.querySelector("#qtyMinus").addEventListener("click", () => {
        quantity.value = Math.max(1, Number(quantity.value) - 1);
    });
    document.querySelector("#qtyPlus").addEventListener("click", () => {
        quantity.value = Math.min(product.stock, Number(quantity.value) + 1);
    });
    addCartButton.addEventListener("click", () => {
        const amount = Number(quantity.value);
        if (amount < 1 || amount > product.stock) return toast("Jumlah tidak sesuai stok", "alert-circle");
        addToCart(product.id, amount);
    });
    buyButton.addEventListener("click", () => {
        const amount = Number(quantity.value);
        if (amount < 1 || amount > product.stock) return toast("Jumlah tidak sesuai stok", "alert-circle");
        if (!Auth.requireBuyer()) return;
        Store.set("cart", [...cartItems().filter(item => item.productId !== product.id), { productId: product.id, quantity: amount }]);
        updateNavBadges();
        location.href = "checkout.html";
    });
    wishlistButton.addEventListener("click", () => {
        toggleWishlist(product.id);
        const saved = wishlistIds().includes(product.id);
        wishlistButton.querySelector("span").textContent = saved ? "Hapus dari Favorit" : "Tambahkan ke Favorit";
    });
    if (window.lucide) lucide.createIcons();
}
