const Auth = {
    current() {
        const session = Store.get("currentUser", null);
        if (!session) return null;
        const user = Store.get("users", DATA.users).find(item => item.id === session.id);
        return {
            ...user,
            ...session,
            role: session.role || user?.role || "buyer",
            sellerId: session.sellerId || user?.sellerId || null
        };
    },
    currentSeller() {
        const current = this.current();
        if (!current || current.role !== "seller") return null;
        return Store.get("sellers", DATA.sellers).find(seller => seller.id === current.sellerId && seller.ownerUserId === current.id) || null;
    },
    requireLogin() {
        if (!this.current()) {
            location.href = "login.html";
            return false;
        }
        return true;
    },
    requireBuyer() {
        const current = this.current();
        if (!current) {
            location.href = "login.html";
            return false;
        }
        if (current.role === "seller") {
            location.href = "seller-dashboard.html";
            return false;
        }
        return true;
    },
    requireSeller() {
        const current = this.current();
        if (!current) {
            location.href = "login.html";
            return false;
        }
        if (current.role !== "seller" || !this.currentSeller()) {
            location.href = "index.html";
            return false;
        }
        return true;
    },
    login(email, password) {
        const users = Store.get("users", DATA.users);
        const user = users.find(item => item.email.toLowerCase() === email.trim().toLowerCase());
        const role = user?.role || "buyer";
        if (!user || password.trim().length < 4 || !["buyer", "seller"].includes(role)) return null;
        const session = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            profileImage: user.profileImage,
            role: user.role || "buyer",
            sellerId: user.sellerId || null
        };
        Store.set("currentUser", session);
        return session;
    },
    register(form, requestedRole = "buyer") {
        const users = Store.get("users", DATA.users);
        const role = requestedRole === "seller" ? "seller" : "buyer";
        const email = String(form.email || "").trim();
        const phone = String(form.phone || "").trim();
        if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) return { error: "Email sudah digunakan." };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Format email tidak valid." };
        if (form.password !== form.confirm) return { error: "Konfirmasi password tidak sama." };
        if (String(form.password || "").length < 4) return { error: "Password minimal 4 karakter." };
        if (!String(form.name || "").trim() || !phone || !String(form.address || "").trim()) {
            return { error: "Nama, nomor telepon, dan alamat wajib diisi." };
        }
        if (!/^[0-9+() -]{8,20}$/.test(phone)) return { error: "Format nomor telepon tidak valid." };
        if (role === "seller") {
            const description = String(form.description || "").trim();
            if (
                !String(form.shopName || "").trim()
                || description.length < 10
                || !String(form.location || "").trim()
            ) {
                return { error: "Nama toko, deskripsi minimal 10 karakter, dan lokasi toko wajib diisi." };
            }
        }

        const id = Math.max(0, ...users.map(user => Number(user.id) || 0)) + 1;
        const sellerId = role === "seller"
            ? Math.max(0, ...Store.get("sellers", DATA.sellers).map(seller => Number(seller.id) || 0)) + 1
            : null;
        const user = {
            id,
            name: form.name.trim(),
            email,
            phone,
            address: String(form.address || "").trim(),
            profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
            role,
            ...(sellerId ? { sellerId } : {})
        };
        users.push(user);
        Store.set("users", users);

        if (role === "seller") {
            const sellers = Store.get("sellers", DATA.sellers);
            sellers.push({
                id: sellerId,
                ownerUserId: id,
                shopName: form.shopName.trim(),
                ownerName: user.name,
                location: form.location.trim(),
                phone: user.phone,
                rating: 0,
                totalProducts: 0,
                description: form.description.trim(),
                image: user.profileImage,
                joinedAt: new Date().toISOString().slice(0, 10)
            });
            Store.set("sellers", sellers);
        }

        Store.set("currentUser", user);
        return { user };
    },
    logout() {
        localStorage.removeItem("currentUser");
        location.href = "index.html";
    }
};
