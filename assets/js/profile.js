if (Auth.requireLogin()) {
    renderNavbar("");
    renderFooter();

    const current = Auth.current();
    document.querySelector("#profileImage").src = current.profileImage;
    document.querySelector("#profileImage").alt = current.name;
    document.querySelector("#profileName").textContent = current.name;
    document.querySelector("#profileEmail").textContent = current.email;
    const form = document.querySelector("#profileForm");
    form.elements.name.value = current.name;
    form.elements.email.value = current.email;
    form.elements.phone.value = current.phone;
    form.elements.address.value = current.address || "";

    form.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(form);
        const updated = {
            ...current,
            name: data.get("name").trim(),
            email: data.get("email").trim(),
            phone: data.get("phone").trim(),
            address: data.get("address").trim()
        };
        const users = Store.get("users", DATA.users);
        const index = users.findIndex(user => user.id === current.id);
        if (index >= 0) users[index] = { ...users[index], ...updated };
        Store.set("users", users);
        Store.set("currentUser", updated);
        toast("Profil berhasil diperbarui");
        setTimeout(() => location.reload(), 500);
    });

    document.querySelector("#resetData").addEventListener("click", () => {
        Store.reset(true);
        if (window.location) location.reload();
    });
    document.querySelector("#logoutButton").addEventListener("click", () => Auth.logout());
}
