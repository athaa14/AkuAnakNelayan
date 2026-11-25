renderNavbar("products");
const params=new URLSearchParams(location.search);
document.querySelector("#searchProduct").value = params.get("q") || "";
document.querySelector("#categoryFilter").innerHTML = `<option value="">Semua kategori</option>` + Store.get("categories", DATA.categories).map(category => `<option value="${escapeHTML(category)}" ${category === params.get("category") ? "selected" : ""}>${escapeHTML(category)}</option>`).join("");
const hasSellerFilter = params.has("sellerId");
const sellerId = hasSellerFilter ? Number(params.get("sellerId")) : null;
const seller = hasSellerFilter ? Store.get("sellers", DATA.sellers).find(item => item.id === sellerId) : null;
if (hasSellerFilter) {
 const heading = document.querySelector("#productsHeading");
 const description = document.querySelector("#productsDescription");
 if (seller) {
  heading.textContent = `Produk dari ${seller.shopName}`;
  description.textContent = "Temukan hasil laut yang dijual oleh nelayan ini.";
  const summary = document.querySelector("#sellerSummary");
  document.querySelector("#sellerSummaryImage").src = seller.image;
  document.querySelector("#sellerSummaryImage").alt = seller.shopName;
  document.querySelector("#sellerSummaryName").textContent = seller.ownerName;
  document.querySelector("#sellerSummaryDetails").textContent = `${seller.location} · Nilai ${seller.rating}/5`;
  summary.classList.remove("hidden");
  summary.classList.add("flex");
 } else {
  heading.textContent = "Nelayan tidak ditemukan";
  description.textContent = "Profil nelayan yang dicari tidak tersedia.";
 }
}
renderFooter();
function renderProducts(){
 const q=document.querySelector("#searchProduct").value.toLowerCase(),cat=document.querySelector("#categoryFilter").value,loc=document.querySelector("#locationFilter").value,fr=document.querySelector("#freshFilter").value,sort=document.querySelector("#sortFilter").value;
 let list=catalogProducts().filter(p=>(sellerId===null||p.sellerId===sellerId)&&(!q||p.name.toLowerCase().includes(q))&&(!cat||p.category===cat)&&(!fr||p.freshness===fr)&&(!loc||getSeller(p.sellerId).location===loc));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="best")list.sort((a,b)=>b.sold-a.sold);if(sort==="latest")list.sort((a,b)=>b.catchDate.localeCompare(a.catchDate));
 document.querySelector("#productGrid").innerHTML=list.length?list.map(productCard).join(""):`<div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><i class="mx-auto h-10 w-10 text-slate-400" data-lucide="search-x"></i><h2 class="mt-4 font-heading text-xl font-bold text-slate-900">Produk tidak ditemukan</h2><p class="mt-2 text-sm text-slate-500">Ubah kata kunci atau filter pencarian.</p></div>`;
 if(window.lucide)lucide.createIcons();
}
["searchProduct","categoryFilter","locationFilter","freshFilter","sortFilter"].forEach(id=>document.querySelector("#"+id).addEventListener("input",renderProducts));
if(params.get("sort")==="best")document.querySelector("#sortFilter").value="best";
renderProducts();if(window.lucide)lucide.createIcons();
