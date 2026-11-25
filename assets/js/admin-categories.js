if (adminReady) {
    const form = document.querySelector("#categoryForm");
    const error = document.querySelector("#categoryError");
    const list = document.querySelector("#categoryList");

    function renderCategories() {
        const categories = Store.get("categories", DATA.categories);
        const products = Store.get("products", DATA.products);
        list.innerHTML = categories.map((category, index) => {
            const count = products.filter(product => product.category === category).length;
            return `<div class="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                <input class="categoryInput min-w-48 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800" value="${escapeHTML(category)}" data-index="${index}" aria-label="Nama kategori ${escapeHTML(category)}">
                <span class="text-xs text-slate-500">${count} produk</span>
                <button class="saveCategory rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-teal-700 hover:text-teal-700" data-index="${index}">Simpan</button>
                <button class="deleteCategory rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50" data-index="${index}" ${count > 0 || categories.length <= 1 ? "disabled title='Kategori masih digunakan atau merupakan kategori terakhir'" : ""}>Hapus</button>
            </div>`;
        }).join("");
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const name = String(new FormData(form).get("name")).trim();
        const categories = Store.get("categories", DATA.categories);
        if (categories.some(category => category.toLowerCase() === name.toLowerCase())) {
            error.textContent = "Kategori dengan nama tersebut sudah ada.";
            return;
        }
        error.textContent = "";
        categories.push(name);
        Store.set("categories", categories);
        form.reset();
        toast("Kategori ditambahkan");
        renderCategories();
    });

    list.addEventListener("click", event => {
        const categories = Store.get("categories", DATA.categories);
        const saveButton = event.target.closest(".saveCategory");
        if (saveButton) {
            const index = Number(saveButton.dataset.index);
            const input = list.querySelector(`.categoryInput[data-index="${index}"]`);
            const name = String(input.value).trim();
            if (!name) return toast("Nama kategori tidak boleh kosong", "alert-circle");
            if (categories.some((category, position) => position !== index && category.toLowerCase() === name.toLowerCase())) {
                error.textContent = "Kategori dengan nama tersebut sudah ada.";
                return;
            }
            error.textContent = "";
            const previous = categories[index];
            categories[index] = name;
            Store.set("categories", categories);
            if (previous !== name) {
                const products = Store.get("products", DATA.products);
                products.forEach(product => {
                    if (product.category === previous) product.category = name;
                });
                Store.set("products", products);
            }
            toast("Kategori diperbarui");
            renderCategories();
            return;
        }
        const deleteButton = event.target.closest(".deleteCategory");
        if (deleteButton && window.confirm("Hapus kategori ini?")) {
            categories.splice(Number(deleteButton.dataset.index), 1);
            Store.set("categories", categories);
            toast("Kategori dihapus");
            renderCategories();
        }
    });

    renderCategories();
}
