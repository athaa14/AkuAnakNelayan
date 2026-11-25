if (sellerReady && sellerShop) {
    const search = document.querySelector("#productSearch");
    const filter = document.querySelector("#productFilter");
    const table = document.querySelector("#sellerProductRows");
    const empty = document.querySelector("#productEmpty");

    function stockLabel(product) {
        if (Number(product.stock) <= 0) return ["Habis", "bg-rose-100 text-rose-700"];
        if (Number(product.stock) <= 5) return ["Menipis", "bg-amber-100 text-amber-800"];
        return ["Tersedia", "bg-teal-50 text-teal-700"];
    }

    function renderProducts() {
        const query = search.value.trim().toLowerCase();
        const products = getSellerProducts().filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query);
            const matchesFilter = filter.value === "all"
                || (filter.value === "active" && product.isPublished !== false)
                || (filter.value === "hidden" && product.isPublished === false)
                || (filter.value === "low" && Number(product.stock) <= 5);
            return matchesQuery && matchesFilter;
        });
        empty.classList.toggle("hidden", products.length > 0);
        table.closest("table").classList.toggle("hidden", products.length === 0);
        table.innerHTML = products.map(product => {
            const [stockText, stockColor] = stockLabel(product);
            const publishLabel = product.isPublished === false ? "Disembunyikan" : "Aktif";
            return `<tr>
                <td class="px-5 py-3"><a class="flex min-w-48 items-center gap-3" href="seller-product-detail.html?id=${product.id}"><img class="h-12 w-12 rounded-lg object-cover" src="${escapeHTML(product.image)}" alt=""><span><strong class="block text-sm text-slate-900">${escapeHTML(product.name)}</strong><span class="text-xs text-slate-500">${product.sold || 0} terjual</span></span></a></td>
                <td class="px-5 py-3 text-slate-600">${escapeHTML(product.category)}</td>
                <td class="whitespace-nowrap px-5 py-3 font-semibold text-slate-800">${formatRupiah(product.price)}<span class="ml-1 text-xs font-normal text-slate-500">/kg</span></td>
                <td class="whitespace-nowrap px-5 py-3 text-slate-700">${Number(product.stock)} ${escapeHTML(product.stockUnit)}</td>
                <td class="space-y-1 px-5 py-3"><span class="block w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${product.isPublished === false ? "bg-slate-100 text-slate-600" : "bg-teal-50 text-teal-700"}">${publishLabel}</span><span class="block w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${stockColor}">${stockText}</span></td>
                <td class="whitespace-nowrap px-5 py-3 text-slate-500">${formatDate(product.updatedAt || product.catchDate)}</td>
                <td class="whitespace-nowrap px-5 py-3"><div class="flex items-center gap-3"><a class="font-bold text-teal-700 hover:text-teal-900" href="seller-product-form.html?id=${product.id}">Ubah</a><button class="font-semibold text-slate-500 hover:text-slate-900" type="button" data-toggle-publish="${product.id}">${product.isPublished === false ? "Tampilkan" : "Sembunyikan"}</button></div></td>
            </tr>`;
        }).join("");
        table.querySelectorAll("[data-toggle-publish]").forEach(button => {
            button.addEventListener("click", () => togglePublication(Number(button.dataset.togglePublish)));
        });
    }

    function togglePublication(productId) {
        const products = Store.get("products", DATA.products);
        const product = products.find(item => item.id === productId && item.sellerId === sellerShop.id);
        if (!product) return toast("Produk tidak ditemukan", "alert-circle");
        product.isPublished = product.isPublished === false;
        product.updatedAt = new Date().toISOString();
        Store.set("products", products);
        toast(product.isPublished ? "Produk ditampilkan di marketplace" : "Produk disembunyikan dari marketplace");
        renderProducts();
    }

    // Search and filter events rerender the seller's own product rows.
    search.addEventListener("input", renderProducts);
    filter.addEventListener("change", renderProducts);
    renderProducts();
}
