const Auth = {
  current() { return Store.get("currentUser", null) },
  requireLogin() { if (!this.current()) { location.href = "login.html"; return false } return true },
  login(email, password) {
    const users = Store.get("users", DATA.users); const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || password.trim().length < 4) return null;
    const session = { id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address, profileImage: user.profileImage };
    Store.set("currentUser", session); return session;
  },
  register(form) {
    const users = Store.get("users", DATA.users);
    if (users.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase())) return { error: "Email sudah digunakan." };
    if (form.password !== form.confirm) return { error: "Konfirmasi password tidak sama." };
    if (form.password.length < 4) return { error: "Password minimal 4 karakter." };
    const id = Math.max(0, ...users.map(u => u.id)) + 1;
    const user = { id, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), address: form.address || "", profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80" };
    users.push(user); Store.set("users", users); Store.set("currentUser", user); return { user };
  },
  logout() { localStorage.removeItem("currentUser"); location.href = "index.html" }
};
