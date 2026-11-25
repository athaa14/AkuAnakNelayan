if (sellerReady && sellerShop) {
    const search = document.querySelector("#orderSearch");
    const filter = document.querySelector("#orderFilter");
    const rows = document.querySelector("#sellerOrderRows");
    const empty = document.querySelector("#ordersEmpty");

    function renderOrders() {
        const query = search.value.trim().toLowerCase();
        const users = Store.get("users", DATA.users);
        const list = getSellerOrders().filter(order => {
            const buyer = users.find(user => user.id === order.userId);
            const matchesQuery = order.id.toLowerCase().includes(query) || (buyer?.name || "").toLowerCase().includes(query);
            return matchesQuery && (filter.value === "Semua" || order.status === filter.value);
        });
        empty.classList.toggle("hidden", list.length > 0);
        rows.closest("table").classList.toggle("hidden", list.length === 0);
        rows.innerHTML = list.map(order => {
            const items = sellerOrderItems(order);
            const buyer = users.find(user => user.id === order.userId);
            return `<tr>
                <td class="whitespace-nowrap px-5 py-4 font-bold text-slate-900">${escapeHTML(order.id)}</td>
                <td class="whitespace-nowrap px-5 py-4 text-slate-500">${formatDate(order.createdAt)}</td>
                <td class="max-w-40 truncate px-5 py-4 text-slate-700">${escapeHTML(buyer?.name || "Pembeli")}</td>
                <td class="max-w-56 px-5 py-4 text-slate-600">${items.map(item => `${escapeHTML(item.name)} × ${Number(item.quantity)}`).join("<br>")}</td>
                <td class="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">${formatRupiah(sellerOrderSubtotal(order))}</td>
                <td class="px-5 py-4">${sellerStatusBadge(order.status)}</td>
                <td class="whitespace-nowrap px-5 py-4"><a class="font-bold text-teal-700 hover:text-teal-900" href="seller-order-detail.html?id=${encodeURIComponent(order.id)}">Lihat detail</a></td>
            </tr>`;
        }).join("");
    }

    // Input/change events keep the transaction list searchable and filterable.
    search.addEventListener("input", renderOrders);
    filter.addEventListener("change", renderOrders);
    renderOrders();
}
