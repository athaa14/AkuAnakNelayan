const DATA = {
  sellers: [
    {id:1,shopName:"Nelayan Bahari",ownerName:"Budi Santoso",location:"Pangandaran",rating:4.8,totalProducts:5,description:"Hasil tangkapan segar langsung dari nelayan Pangandaran.",image:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"},
    {id:2,shopName:"Karang Laut",ownerName:"Asep Hidayat",location:"Sidamulih",rating:4.7,totalProducts:5,description:"Menangkap dan mengolah hasil laut dengan standar kebersihan tinggi.",image:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80"},
    {id:3,shopName:"Samudra Biru",ownerName:"Roni Wijaya",location:"Cikembulan",rating:4.9,totalProducts:5,description:"Udang dan ikan laut pilihan dari perairan selatan Jawa.",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"},
    {id:4,shopName:"Ikan Kita",ownerName:"Dedi Permana",location:"Batu Karas",rating:4.6,totalProducts:5,description:"Menyediakan ikan harian dengan dokumentasi tangkapan.",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"},
    {id:5,shopName:"Nelayan Nusantara",ownerName:"Agus Salim",location:"Pangandaran",rating:4.8,totalProducts:5,description:"Pasokan hasil laut segar untuk kebutuhan rumah tangga.",image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"},
    {id:6,shopName:"Laut Selatan",ownerName:"Slamet Riyadi",location:"Madasari",rating:4.7,totalProducts:5,description:"Bergerak langsung dari kapal nelayan hingga ke konsumen.",image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"}
  ],
  users:[
    {id:1,name:"Andi Prasetyo",email:"andi@example.com",phone:"081234567890",address:"Jl. Merdeka No. 12, Pangandaran",profileImage:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"},
    {id:2,name:"Siti Nuraini",email:"siti@example.com",phone:"081298765432",address:"Desa Sidamulih, Pangandaran",profileImage:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"}
  ],
  reviews:[
    {id:1,productId:1,userName:"Andi",rating:5,comment:"Ikan datang dingin dan ukurannya sesuai. Sangat memuaskan.",date:"2026-11-23",image:null},
    {id:2,productId:1,userName:"Siti",rating:4,comment:"Segar dan kemasan rapi. Pengiriman cukup cepat.",date:"2026-11-22",image:null},
    {id:3,productId:2,userName:"Rina",rating:5,comment:"Udangnya besar dan tidak bau. Akan beli lagi.",date:"2026-11-21",image:null},
    {id:4,productId:3,userName:"Bima",rating:4,comment:"Cumi segar, cocok untuk menu keluarga.",date:"2026-11-20",image:null}
  ]
};

const productNames=[
["Ikan Tuna","Ikan","tuna"],["Udang Windu","Udang","shrimp"],["Cumi-Cumi Segar","Cumi-cumi","squid"],["Ikan Kakap Merah","Ikan","snapper"],["Kepiting Soka","Kepiting","crab"],["Kerang Hijau","Kerang","mussels"],
["Ikan Tongkol","Ikan","mackerel"],["Udang Vaname","Udang","shrimp"],["Cumi-Cumi Jumbo","Cumi-cumi","squid"],["Ikan Kembung","Ikan","fish"],["Rajungan Segar","Kepiting","crab"],["Kerang Dara","Kerang","shellfish"],
["Ikan Baronang","Ikan","fish"],["Udang Jerbung","Udang","shrimp"],["Ikan Bawal","Ikan","fish"],["Cumi-Cumi Putih","Cumi-cumi","squid"],["Kepiting Bakau","Kepiting","crab"],["Kerang Tahu","Kerang","shellfish"],
["Ikan Tenggiri","Ikan","fish"],["Udang Putih","Udang","shrimp"],["Ikan Layur","Ikan","fish"],["Cumi-Cumi Kering","Hasil Laut Lainnya","dried fish"],["Lobster Air Laut","Hasil Laut Lainnya","lobster"],["Ikan Salem","Ikan","fish"],
["Ikan Nila Laut","Ikan","fish"],["Udang Dogol","Udang","shrimp"],["Sotong Segar","Cumi-cumi","squid"],["Ikan Marlin","Ikan","fish"],["Kerang Batik","Kerang","shellfish"],["Teri Segar","Hasil Laut Lainnya","anchovy"]
];
const photoIds=["photo-1534043464124-3be32fe000c9","photo-1559737558-2f5a35f4523b","photo-1565680018434-b513d5e5fd47","photo-1498656868944-5d0dc0e9b2ac","photo-1559827260-dc66d52bef19","photo-1558790149-1b5a3e0b4eb5"];
DATA.products=productNames.map((item,i)=>{
  const id=i+1, category=item[1], base=[45000,85000,55000,62000,95000,28000,32000,78000,60000,26000][i%10];
  const catchLocation=["Perairan Pangandaran","Teluk Pangandaran","Samudra Hindia","Pelabuhan Madasari","Perairan Batu Karas"][i%5];
  const photo=photoIds[i%photoIds.length];
  return {id,name:item[0],category,price:base+(i%4)*5000,stock:i%7===0?0:25+(i*13)%140,stockUnit:"kg",freshness:i%5===0?"Perlu Segera Diolah":i%3===0?"Segar":"Sangat Segar",catchDate:`2026-11-${String(24-(i%6)).padStart(2,"0")}`,catchTime:`${String(4+(i%4)).padStart(2,"0")}:${i%2?"30":"15"}`,catchLocation,description:`${item[0]} dipanen nelayan setempat dan disimpan menggunakan es sejak selesai ditangkap. Cocok untuk kebutuhan rumah tangga maupun usaha kuliner.`,sellerId:(i%6)+1,image:`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=82`,proofImages:["https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=700&q=80","https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=700&q=80","https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80"],rating:(42+(i%7))/10,sold:20+(i*7)%180,isAvailable:i%7!==0};
});
