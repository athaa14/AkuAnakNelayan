if (sellerReady && sellerShop) {
    const form = document.querySelector("#sellerProductForm");
    const error = document.querySelector("#productFormError");
    const productId = Number(new URLSearchParams(location.search).get("id"));
    const products = Store.get("products", DATA.products);
    const original = productId ? products.find(item => item.id === productId && item.sellerId === sellerShop.id) : null;

    function safeImageURL(value) {
        try {
            return ["http:", "https:"].includes(new URL(value).protocol);
        } catch (_) {
            return false;
        }
    }

    if (productId && !original) {
        error.textContent = "Produk tidak ditemukan atau bukan milik toko Anda.";
        form.querySelectorAll("input,select,textarea,button").forEach(control => control.disabled = true);
    } else {
        if (original) {
            document.querySelector("#productFormHeading").textContent = "Ubah produk";
            form.elements.name.value = original.name;
            form.elements.category.value = original.category;
            form.elements.price.value = original.price;
            form.elements.stock.value = original.stock;
            form.elements.stockUnit.value = original.stockUnit || "kg";
            form.elements.freshness.value = original.freshness;
            form.elements.catchDate.value = original.catchDate;
            form.elements.catchTime.value = original.catchTime;
            form.elements.catchLocation.value = original.catchLocation;
            form.elements.image.value = original.image;
            form.elements.proofImages.value = (original.proofImages || []).join("\n");
            form.elements.description.value = original.description;
            form.elements.isPublished.checked = original.isPublished !== false;
        } else {
            form.elements.catchDate.value = new Date().toISOString().slice(0, 10);
            form.elements.catchTime.value = new Date().toTimeString().slice(0, 5);
            form.elements.catchLocation.value = sellerShop.location;
        }

        form.addEventListener("submit", event => {
            event.preventDefault();
            error.textContent = "";
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const price = Number(data.get("price"));
            const stock = Number(data.get("stock"));
            const image = String(data.get("image")).trim();
            const proofImages = String(data.get("proofImages") || "").split(/\r?\n/).map(url => url.trim()).filter(Boolean);

            if (!Number.isInteger(price) || price <= 0 || !Number.isFinite(stock) || stock < 0) {
                error.textContent = "Harga harus lebih dari nol dan stok tidak boleh negatif.";
                return;
            }
            if (!safeImageURL(image) || proofImages.some(url => !safeImageURL(url))) {
                error.textContent = "Gunakan URL foto dengan alamat HTTP atau HTTPS yang valid.";
                return;
            }

            const nextProduct = {
                ...(original || {
                    id: Math.max(0, ...products.map(item => Number(item.id) || 0)) + 1,
                    sellerId: sellerShop.id,
                    rating: 0,
                    sold: 0
                }),
                name: String(data.get("name")).trim(),
                category: String(data.get("category")),
                price,
                stock,
                stockUnit: String(data.get("stockUnit")),
                freshness: String(data.get("freshness")),
                catchDate: String(data.get("catchDate")),
                catchTime: String(data.get("catchTime")),
                catchLocation: String(data.get("catchLocation")).trim(),
                description: String(data.get("description")).trim(),
                image,
                proofImages,
                isAvailable: stock > 0,
                isPublished: form.elements.isPublished.checked,
                updatedAt: new Date().toISOString()
            };
            const currentProducts = Store.get("products", DATA.products);
            const index = currentProducts.findIndex(item => item.id === nextProduct.id);
            if (index >= 0) currentProducts[index] = nextProduct;
            else currentProducts.push(nextProduct);
            Store.set("products", currentProducts);
            toast(original ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan");
            setTimeout(() => location.href = `seller-product-detail.html?id=${nextProduct.id}`, 350);
        });
    }
}
