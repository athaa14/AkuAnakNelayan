if (adminReady) {
    const id = Number(new URLSearchParams(location.search).get("id"));
    const product = Store.get("products", DATA.products).find(item => item.id === id);

    if (!product) {
        document.querySelector("#previewNotFound").classList.remove("hidden");
        document.querySelector("#previewContent").classList.add("hidden");
    } else {
        document.querySelector("#previewHeading").textContent = product.name;
        document.querySelector("#previewImage").src = product.image;
        document.querySelector("#previewImage").alt = product.name;
        document.querySelector("#previewProofs").innerHTML = (product.proofImages || []).map(image => `<img class="h-20 w-full rounded-lg object-cover" src="${escapeHTML(image)}" alt="Dokumentasi tangkapan">`).join("");

        const seller = adminFindSeller(product.sellerId);
        const info = [
            ["Toko", seller ? seller.shopName : "Toko tidak diketahui"],
            ["Status verifikasi toko", seller && seller.isVerified !== false ? "Terverifikasi" : "Menunggu verifikasi"],
            ["Kategori", product.category],
            ["Harga", formatRupiah(product.price)],
            ["Stok", `${product.stock} ${product.stockUnit}`],
            ["Publikasi", product.isPublished !== false ? "Tayang" : "Disembunyikan"],
            ["Kesegaran", product.freshness],
            ["Waktu tangkapan", `${formatDate(product.catchDate)} · ${product.catchTime || "-"}`],
            ["Lokasi", product.location],
            ["Deskripsi", product.description]
        ];
        document.querySelector("#previewInfo").innerHTML = info.map(([label, value]) => `<div><dt class="text-xs font-bold uppercase tracking-wide text-slate-500">${escapeHTML(label)}</dt><dd class="mt-1 whitespace-pre-line text-slate-800">${escapeHTML(value)}</dd></div>`).join("");
    }

    if (window.lucide) lucide.createIcons();
}
