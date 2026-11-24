const Store={
  get(key,fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch(_){return fallback}},
  set(key,value){localStorage.setItem(key,JSON.stringify(value))},
  init(){
    if(!localStorage.getItem("products") || !localStorage.getItem("orders")) this.reset(false);
  },
  reset(confirmReset=true){
    if(confirmReset&&!window.confirm("Reset semua data ke data awal?"))return;
    this.set("products",DATA.products);this.set("sellers",DATA.sellers);this.set("users",DATA.users);this.set("reviews",DATA.reviews);
    this.set("cart",[]);this.set("wishlist",[]);this.set("orders",makeDummyOrders());localStorage.removeItem("currentUser");
  }
};
function makeDummyOrders(){
  const users=DATA.users,products=DATA.products,statuses=["Belum Dibayar","Dikemas","Dikirim","Dalam Perjalanan","Selesai","Selesai","Selesai","Dibatalkan"];
  return statuses.map((status,i)=>{
    const p=products[(i*3)%products.length],qty=i%3+1,subtotal=p.price*qty;
    const history=[{status:"Pesanan dibuat",time:`2026-11-${20-i%6}T09:00:00`},{status:"Pembayaran dikonfirmasi",time:`2026-11-${20-i%6}T10:15:00`}];
    const flow=["Dikemas","Dikirim","Dalam Perjalanan","Selesai"];
    let index=-1;
    if(status==="Selesai")index=3;else if(status==="Dalam Perjalanan")index=2;else if(status==="Dikirim")index=1;else if(status==="Dikemas")index=0;
    if(index>=0)for(let n=0;n<=index;n++)history.push({status:n===0?"Pesanan dikemas":n===1?"Pesanan dikirim":n===2?"Pesanan dalam perjalanan":"Pesanan selesai",time:`2026-11-${20-i%6}T${String(11+n).padStart(2,"0")}:20:00`});
    if(status==="Dibatalkan")history.push({status:"Pesanan dibatalkan",time:"2026-11-20T12:20:00"});
    return{id:`ORD-${String(i+1).padStart(3,"0")}`,userId:1,products:[{productId:p.id,name:p.name,price:p.price,quantity:qty,subtotal}],shippingAddress:users[0].address,paymentMethod:["Transfer Bank","E-Wallet","COD"][i%3],subtotal,shippingCost:10000,total:subtotal+10000,status,createdAt:`2026-11-${20-i%6}T09:00:00`,history};
  });
}
Store.init();
