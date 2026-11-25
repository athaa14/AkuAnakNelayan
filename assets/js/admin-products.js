if (adminReady) {
    const search = document.querySelector("#productSearch");
    const sellerFilter = document.querySelector("#sellerFilter");
    const categoryFilter = document.querySelector("#categoryFilter");
    const stockFilter = document.querySelector("#stockFilter");
    const publishFilter = document.querySelector("#publishFilter");
    const rows = document.querySelector("#productRows");
    const empty = document.querySelector("#productsEmpty");
    const tableWrap = document.querySelector("#productTableWrap");

    sellerFilter.innerHTML = `<option value="Semua">Semua toko</option>` + Store.get("sellers", DATA.sellers).map(seller => `<option value="${escapeHTML(String(seller.id))}">${escapeHTML(seller.shopName)}</option>`).join("");
    categoryFilter.innerHTML = `<option value="Semua">Semua kategori</option>` + Store.get("categories", DATA.categories).map(category => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`).join("");

    function stockStatus(product) {
        const stock = Number(product.stock) || 0;
        if (stock <= 0) return ["Habis", "bg-rose-100 text-rose-700"];
        if (stock <= 5) return ["Menipis", "bg-amber-100 text-amber-800"];
        return ["Tersedia", "bg-emerald-50 text-emerald-700"];
    }

    function renderProducts() {
        const query = search.value.trim().toLowerCase();
        const products = Store.get("products", DATA.products);
        const orders = Store.get("orders", makeDummyOrders());
        const list = products.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query);
            const matchesSeller = sellerFilter.value === "Semua" || String(product.sellerId) === sellerFilter.value;
            const matchesCategory = categoryFilter.value === "Semua" || product.category === categoryFilter.value;
            const [statusLabel] = stockStatus(product);
            const matchesStock = stockFilter.value === "Semua" || stockFilter.value === statusLabel;
            const published = product.isPublished !== false;
            const matchesPublish = publishFilter.value === "Semua" || (publishFilter.value === "Aktif" ? published : !published);
            return matchesQuery && matchesSeller && matchesCategory && matchesStock && matchesPublish;
        });

        empty.classList.toggle("hidden", list.length > 0);
        tableWrap.classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(product => {
            const published = product.isPublished !== false;
            const [label, color] = stockStatus(product);
            const referenced = orders.some(order => (order.products || []).some(item => Number(item.productId) === Number(product.id)));
            return `<tr>
                <td class="px-4 py-4"><div class="flex items-center gap-3"><img class="h-12 w-12 rounded-lg object-cover" src="${escapeHTML(product.image)}" alt=""><span class="min-w-0"><strong class="block truncate text-sm text-slate-900">${escapeHTML(product.name)}</strong><span class="text-xs text-slate-500">${formatDate(product.catchDate)}</span></span></div></td>
                <td class="px-4 py-4 text-slate-600">${escapeHTML(adminSellerName(product.sellerId))}</td>
                <td class="px-4 py-4 text-slate-600">${escapeHTML(product.category)}</td>
                <td class="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">${formatRupiah(product.price)}</td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-700">${product.stock} ${escapeHTML(product.stockUnit)}</td>
                <td class="px-4 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${published ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-600"}">${published ? "Tayang" : "Disembunyikan"}</span></td>
                <td class="px-4 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${color}">${label}</span></td>
                <td class="px-4 py-4"><div class="flex flex-wrap gap-2"><a class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-teal-700 hover:text-teal-700" href="admin-product-preview.html?id=${product.id}">Pratinjau</a><button class="togglePublish rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-teal-700 hover:text-teal-700" data-id="${product.id}">${published ? "Sembunyikan" : "Tampilkan"}</button><button class="deleteProduct rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50" data-id="${product.id}" ${referenced ? "disabled title='Produk digunakan oleh transaksi lama'" : ""}>Hapus</button></div></td>
            </tr>`;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    function updateProduct(id, change, message) {
        const products = Store.get("products", DATA.products);
        const product = products.find(item => Number(item.id) === Number(id));
        if (!product) return;
        change(product);
        Store.set("products", products);
        toast(message);
        renderProducts();
    }

    rows.addEventListener("click", event => {
        const publishButton = event.target.closest(".togglePublish");
        if (publishButton) {
            updateProduct(publishButton.dataset.id, product => {
                product.isPublished = product.isPublished === false;
                product.updatedAt = new Date().toISOString();
            }, "Status publikasi diperbarui");
            return;
        }
        const deleteButton = event.target.closest(".deleteProduct");
        if (deleteButton && window.confirm("Hapus produk ini secara permanen?")) {
            const products = Store.get("products", DATA.products).filter(item => Number(item.id) !== Number(deleteButton.dataset.id));
            Store.set("products", products);
            toast("Produk dihapus");
            renderProducts();
        }
    });

    [search, sellerFilter, categoryFilter, stockFilter, publishFilter].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderProducts));
    renderProducts();
}
