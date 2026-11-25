if (sellerReady && sellerShop) {
    const form = document.querySelector("#sellerProfileForm");
    const error = document.querySelector("#sellerProfileError");
    const image = document.querySelector("#sellerProfilePreview");
    const currentUser = Auth.current();
    image.src = sellerShop.image || currentUser.profileImage;
    image.alt = sellerShop.shopName;
    document.querySelector("#sellerProfileShopName").textContent = sellerShop.shopName;
    document.querySelector("#sellerProfileEmail").textContent = currentUser.email;
    form.elements.shopName.value = sellerShop.shopName;
    form.elements.ownerName.value = sellerShop.ownerName;
    form.elements.phone.value = sellerShop.phone || currentUser.phone;
    form.elements.location.value = sellerShop.location;
    form.elements.description.value = sellerShop.description || "";
    form.elements.image.value = sellerShop.image || currentUser.profileImage;
    document.querySelector("#sellerProfileEmailInput").value = currentUser.email;

    form.elements.image.addEventListener("input", () => {
        image.src = form.elements.image.value;
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        error.textContent = "";
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        let photoURL;
        try {
            photoURL = new URL(String(data.get("image")));
        } catch (_) {
            error.textContent = "URL foto toko tidak valid.";
            return;
        }
        if (!["http:", "https:"].includes(photoURL.protocol)) {
            error.textContent = "URL foto toko harus menggunakan HTTP atau HTTPS.";
            return;
        }

        const updatedSeller = {
            ...sellerShop,
            shopName: String(data.get("shopName")).trim(),
            ownerName: String(data.get("ownerName")).trim(),
            phone: String(data.get("phone")).trim(),
            location: String(data.get("location")).trim(),
            description: String(data.get("description")).trim(),
            image: photoURL.href
        };
        const sellers = Store.get("sellers", DATA.sellers);
        const sellerIndex = sellers.findIndex(item => item.id === sellerShop.id && item.ownerUserId === currentUser.id);
        if (sellerIndex < 0) {
            error.textContent = "Profil toko tidak ditemukan.";
            return;
        }
        sellers[sellerIndex] = updatedSeller;
        Store.set("sellers", sellers);

        const users = Store.get("users", DATA.users);
        const userIndex = users.findIndex(item => item.id === currentUser.id);
        if (userIndex >= 0) {
            users[userIndex] = {
                ...users[userIndex],
                name: updatedSeller.ownerName,
                phone: updatedSeller.phone,
                profileImage: updatedSeller.image
            };
            Store.set("users", users);
            Store.set("currentUser", { ...currentUser, name: updatedSeller.ownerName, phone: updatedSeller.phone, profileImage: updatedSeller.image });
        }
        toast("Profil toko berhasil diperbarui");
        setTimeout(() => location.reload(), 400);
    });
}
