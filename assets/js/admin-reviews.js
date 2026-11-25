if (adminReady) {
    const search = document.querySelector("#reviewSearch");
    const productFilter = document.querySelector("#productFilter");
    const ratingFilter = document.querySelector("#ratingFilter");
    const statusFilter = document.querySelector("#statusFilter");
    const rows = document.querySelector("#reviewRows");
    const empty = document.querySelector("#reviewsEmpty");
    const tableWrap = document.querySelector("#reviewTableWrap");

    productFilter.innerHTML = `<option value="Semua">Semua produk</option>` + Store.get("products", DATA.products).map(product => `<option value="${product.id}">${escapeHTML(product.name)}</option>`).join("");

    function renderReviews() {
        const query = search.value.trim().toLowerCase();
        const reviews = Store.get("reviews", DATA.reviews);
        const list = reviews.filter(review => {
            const matchesQuery = `${review.userName} ${review.comment}`.toLowerCase().includes(query);
            const matchesProduct = productFilter.value === "Semua" || String(review.productId) === productFilter.value;
            const matchesRating = ratingFilter.value === "Semua" || String(review.rating) === ratingFilter.value;
            const hidden = review.isHidden === true;
            const matchesStatus = statusFilter.value === "Semua" || (statusFilter.value === "Tampil" ? !hidden : hidden);
            return matchesQuery && matchesProduct && matchesRating && matchesStatus;
        });

        empty.classList.toggle("hidden", list.length > 0);
        tableWrap.classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(review => {
            const hidden = review.isHidden === true;
            return `<tr>
                <td class="px-4 py-4 text-slate-700">${escapeHTML(adminProductName(review.productId))}</td>
                <td class="px-4 py-4 text-slate-800">${escapeHTML(review.userName)}</td>
                <td class="whitespace-nowrap px-4 py-4 font-bold text-amber-600">${icon("star", 13)} ${review.rating}</td>
                <td class="max-w-72 px-4 py-4 text-slate-600">${escapeHTML(review.comment)}</td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-500">${formatDate(review.date)}</td>
                <td class="px-4 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${hidden ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}">${hidden ? "Disembunyikan" : "Tampil"}</span></td>
                <td class="px-4 py-4"><div class="flex flex-wrap gap-2"><button class="toggleReview rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-teal-700 hover:text-teal-700" data-id="${review.id}">${hidden ? "Tampilkan" : "Sembunyikan"}</button><button class="deleteReview rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50" data-id="${review.id}">Hapus</button></div></td>
            </tr>`;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    rows.addEventListener("click", event => {
        const toggleButton = event.target.closest(".toggleReview");
        if (toggleButton) {
            const reviews = Store.get("reviews", DATA.reviews);
            const review = reviews.find(item => item.id === Number(toggleButton.dataset.id));
            if (!review) return;
            review.isHidden = review.isHidden !== true;
            Store.set("reviews", reviews);
            toast(review.isHidden ? "Ulasan disembunyikan" : "Ulasan ditampilkan kembali");
            renderReviews();
            return;
        }
        const deleteButton = event.target.closest(".deleteReview");
        if (deleteButton && window.confirm("Hapus ulasan ini secara permanen?")) {
            const reviews = Store.get("reviews", DATA.reviews).filter(item => item.id !== Number(deleteButton.dataset.id));
            Store.set("reviews", reviews);
            toast("Ulasan dihapus");
            renderReviews();
        }
    });

    [search, productFilter, ratingFilter, statusFilter].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderReviews));
    renderReviews();
}
