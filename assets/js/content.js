renderNavbar("");
renderFooter();

const pageKey = new URLSearchParams(location.search).get("page") || "";
const content = Store.get("siteContent", DATA.siteContent);
const page = content.pages[pageKey];

if (!page) {
    document.querySelector("#contentNotFound").classList.remove("hidden");
    document.querySelector("#contentArticle").classList.add("hidden");
} else {
    document.querySelector("#contentTitle").textContent = page.title;
    document.querySelector("#contentBody").textContent = page.body;
    document.title = `${page.title} - AkuAnakNelayan`;
}

if (window.lucide) lucide.createIcons();
