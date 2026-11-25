if (adminReady) {
    const form = document.querySelector("#contentForm");
    const error = document.querySelector("#contentError");
    const pageFields = document.querySelector("#pageFields");
    const content = Store.get("siteContent", DATA.siteContent);

    Object.keys(DATA.siteContent.pages).forEach(key => {
        const page = content.pages[key] || DATA.siteContent.pages[key];
        pageFields.insertAdjacentHTML("beforeend", `
            <div class="rounded-xl border border-slate-200 p-4">
                <div class="flex flex-wrap items-center justify-between gap-2"><h3 class="font-heading text-base font-extrabold text-slate-900">${escapeHTML(page.title)}</h3><a class="text-xs font-bold text-teal-700 hover:text-teal-900" href="content.html?page=${key}" target="_blank" rel="noopener">Lihat halaman</a></div>
                <label class="mt-3 block text-xs font-bold text-slate-600">Judul<input name="${key}Title" required value="${escapeHTML(page.title)}" class="mt-1 block min-h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal text-slate-800"></label>
                <label class="mt-3 block text-xs font-bold text-slate-600">Isi<textarea name="${key}Body" required rows="4" class="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800">${escapeHTML(page.body)}</textarea></label>
            </div>
        `);
    });

    form.elements.heroEyebrow.value = content.heroEyebrow;
    form.elements.heroTitle.value = content.heroTitle;
    form.elements.heroDescription.value = content.heroDescription;
    form.elements.heroImage.value = content.heroImage;

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const image = String(data.get("heroImage")).trim();
        try {
            if (!["http:", "https:"].includes(new URL(image).protocol)) throw new Error("protokol");
        } catch (_) {
            error.textContent = "URL gambar hero harus menggunakan http atau https.";
            return;
        }
        error.textContent = "";
        const next = { ...content, heroEyebrow: String(data.get("heroEyebrow")).trim(), heroTitle: String(data.get("heroTitle")).trim(), heroDescription: String(data.get("heroDescription")).trim(), heroImage: image, pages: { ...content.pages } };
        Object.keys(DATA.siteContent.pages).forEach(key => {
            next.pages[key] = { title: String(data.get(`${key}Title`)).trim(), body: String(data.get(`${key}Body`)).trim() };
        });
        Store.set("siteContent", next);
        toast("Konten berhasil disimpan");
    });
}
