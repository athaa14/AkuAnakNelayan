renderNavbar("home");
const products = Store.get("products", DATA.products).filter(product => product.isPublished !== false);
const newest = [...products].sort((a, b) => b.catchDate.localeCompare(a.catchDate)).slice(0, 8);
const best = [...products].sort((a, b) => b.sold - a.sold).slice(0, 8);
document.querySelector("#homeNewest").innerHTML = newest.map(productCard).join("");
document.querySelector("#homeBest").innerHTML = best.slice(0, 4).map(productCard).join("");
renderFooter();
if (window.lucide) lucide.createIcons();
