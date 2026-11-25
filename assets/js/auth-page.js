const authForm = document.getElementById("authForm");
const isRegister = authForm.dataset.authMode === "register";
renderNavbar("");
const authError = document.querySelector("#authError");
const passwordInput = authForm.elements.password;
const confirmInput = isRegister ? authForm.elements.confirm : null;
const sellerFields = document.getElementById("sellerFields");
const sellerRegisterLink = document.getElementById("sellerRegisterLink");
// The seller CTA reuses this page and selects its form mode through the URL.
const isSellerRegistration = isRegister && new URLSearchParams(location.search).get("role") === "seller";

if (isRegister) {
    const heading = document.getElementById("authHeading");
    const description = document.getElementById("authDescription");
    const registerButton = document.getElementById("registerButton");

    heading.textContent = isSellerRegistration ? "Daftar sebagai penjual" : "Buat akun pembeli";
    description.textContent = isSellerRegistration
        ? "Lengkapi profil diri dan informasi toko untuk mulai berjualan."
        : "Daftar untuk mulai berbelanja hasil laut Pangandaran.";
    registerButton.textContent = isSellerRegistration ? "Daftar sebagai Penjual" : "Daftar sebagai Pembeli";

    // classList switches between buyer-only fields and the extra seller fields.
    if (isSellerRegistration) {
        sellerFields.classList.remove("hidden");
        sellerFields.classList.add("grid");
        sellerRegisterLink.classList.add("hidden");
    } else {
        sellerFields.classList.add("hidden");
        sellerFields.classList.remove("grid");
        sellerRegisterLink.classList.remove("hidden");
    }

    sellerFields.querySelectorAll("input, textarea").forEach(input => {
        input.required = isSellerRegistration;
    });
}

// Inline onclick buttons use this DOM helper to show or hide password input.
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const isVisible = input.type === "password";
    input.type = isVisible ? "text" : "password";
    button.textContent = isVisible ? "Sembunyikan" : "Tampilkan";
    button.classList.toggle("text-teal-700", isVisible);
    button.setAttribute("aria-pressed", String(isVisible));
}

if (isRegister) {
    // input/change events keep password confirmation validation up to date.
    function validatePasswordMatch() {
        const hasBothValues = passwordInput.value && confirmInput.value;
        const matches = !hasBothValues || passwordInput.value === confirmInput.value;
        confirmInput.setCustomValidity(matches ? "" : "Konfirmasi password tidak sama.");
        return matches;
    }

    passwordInput.addEventListener("input", validatePasswordMatch);
    confirmInput.addEventListener("input", () => {
        authError.textContent = "";
        validatePasswordMatch();
    });
    confirmInput.addEventListener("change", validatePasswordMatch);
}

// The submit handler validates the form before creating an account or logging in.
authForm.addEventListener("submit", event => {
    event.preventDefault();
    authError.textContent = "";
    if (!authForm.reportValidity()) return;

    const data = Object.fromEntries(new FormData(authForm));
    if (isRegister) {
        const result = Auth.register(data, isSellerRegistration ? "seller" : "buyer");
        if (result.error) {
            authError.textContent = result.error;
            return;
        }
        location.href = result.user.role === "seller" ? "seller-dashboard.html" : "profile.html";
        return;
    }
    const user = Auth.login(data.email, data.password);
    if (!user) {
        authError.textContent = "Email atau password tidak valid.";
        return;
    }
    location.href = user.role === "seller" ? "seller-dashboard.html" : user.role === "admin" ? "admin-dashboard.html" : "index.html";
});
