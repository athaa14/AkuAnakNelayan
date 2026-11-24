const authForm = document.querySelector("#authForm");
const isRegister = authForm.dataset.authMode === "register";
renderNavbar("");
authForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(authForm));
    const error = document.querySelector("#authError");
    error.textContent = "";
    if (isRegister) {
        const result = Auth.register(data);
        if (result.error) {
            error.textContent = result.error;
            return;
        }
        location.href = "profile.html";
        return;
    }
    const user = Auth.login(data.email, data.password);
    if (!user) {
        error.textContent = "Email atau password tidak valid.";
        return;
    }
    location.href = "index.html";
});
