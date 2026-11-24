renderNavbar("wishlist");
function renderWishlist(){
 const list=wishlistIds().map(getProduct).filter(Boolean);
 document.querySelector("#wishlistGrid").innerHTML=list.length?list.map(productCard).join(""):`<div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><i class="mx-auto h-10 w-10 text-slate-400" data-lucide="heart"></i><h2 class="mt-4 font-heading text-xl font-bold text-slate-900">Belum ada produk favorit</h2><p class="mt-2 text-sm text-slate-500">Simpan hasil laut yang ingin Anda beli nanti.</p><a class="mt-5 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-bold text-white" href="products.html">Cari Produk</a></div>`;
 if(window.lucide)lucide.createIcons();
}
renderWishlist();renderFooter();
