if (adminReady) {
    const form = document.querySelector("#settingsForm");
    const settings = Store.get("siteSettings", DATA.siteSettings);

    document.querySelector("#adminProfile").innerHTML = [
        ["Nama", adminUser.name],
        ["Email", adminUser.email]
    ].map(([label, value]) => `<div><dt class="text-xs font-bold uppercase tracking-wide text-slate-500">${label}</dt><dd class="mt-1 text-slate-900">${escapeHTML(value)}</dd></div>`).join("");

    form.elements.shippingCostPerStore.value = Number(settings.shippingCostPerStore) || 10000;
    form.elements.requireVerification.checked = settings.requireVerification === true;

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const cost = Number(form.elements.shippingCostPerStore.value);
        if (!Number.isFinite(cost) || cost <= 0) return toast("Biaya pengiriman harus lebih dari nol", "alert-circle");
        Store.set("siteSettings", { ...settings, shippingCostPerStore: cost, requireVerification: form.elements.requireVerification.checked });
        toast("Pengaturan disimpan");
    });

    document.querySelector("#resetData").addEventListener("click", () => Store.reset(true));
}
