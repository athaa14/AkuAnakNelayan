if (sellerReady && sellerShop) {
    const productId = Number(new URLSearchParams(location.search).get("id"));
    const product = Store.get("products", DATA.products).find(item => item.id === productId && item.sellerId === sellerShop.id);
    const content = document.querySelector("#sellerProductDetail");
    const empty = document.querySelector("#productDetailEmpty");

    if (!product) {
        empty.classList.remove("hidden");
    } else {
        const images = [product.image, ...(product.proofImages || [])];
        content.innerHTML = `
            <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="grid md:grid-cols-[.95fr_1.05fr]">
                    <div class="bg-slate-100"><img class="h-72 w-full object-cover md:h-full md:min-h-[420px]" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}"></div>
                    <div class="p-5 sm:p-8">
                        <div class="flex flex-wrap gap-2"><span class="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">${escapeHTML(product.category)}</span><span class="rounded-full px-3 py-1 text-xs font-bold ${product.isPublished === false ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}">${product.isPublished === false ? "Disembunyikan" : "Tampil di marketplace"}</span></div>
                        <h2 class="mt-4 font-heading text-3xl font-extrabold text-slate-900">${escapeHTML(product.name)}</h2>
                        <p class="mt-3 text-2xl font-extrabold text-slate-900">${formatRupiah(product.price)} <span class="text-sm font-semibold text-slate-500">/ kg</span></p>
                        <div class="mt-5 grid grid-cols-2 gap-3">
                            ${[
                                ["Stok", `${Number(product.stock)} ${product.stockUnit}`],
                                ["Kesegaran", product.freshness],
                                ["Tanggal tangkapan", formatDate(product.catchDate)],
                                ["Waktu tangkapan", `${product.catchTime} WIB`],
                                ["Lokasi tangkapan", product.catchLocation],
                                ["Terjual", `${product.sold || 0} kg`]
                            ].map(([label, value]) => `<div class="rounded-xl bg-slate-50 p-3"><span class="block text-xs text-slate-500">${escapeHTML(label)}</span><strong class="mt-1 block text-sm text-slate-900">${escapeHTML(value)}</strong></div>`).join("")}
                        </div>
                        <div class="mt-5"><h3 class="text-sm font-bold text-slate-900">Deskripsi</h3><p class="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">${escapeHTML(product.description)}</p></div>
                        <div class="mt-6 flex flex-wrap gap-3"><a class="rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800" href="seller-product-form.html?id=${product.id}">Ubah produk</a><a class="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-teal-700 hover:text-teal-700" href="product-detail.html?id=${product.id}" target="_blank" rel="noopener">Lihat tampilan pembeli</a></div>
                    </div>
                </div>
                <div class="border-t border-slate-100 p-5 sm:p-8"><h3 class="font-heading text-lg font-extrabold text-slate-900">Dokumentasi hasil tangkapan</h3><div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">${images.map((image, index) => `<figure><img class="h-36 w-full rounded-xl object-cover sm:h-44" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)} dokumentasi ${index + 1}"><figcaption class="mt-2 text-xs text-slate-500">${index === 0 ? "Foto produk" : `Dokumentasi ${index}`}</figcaption></figure>`).join("")}</div></div>
            </article>
        `;
    }
}
