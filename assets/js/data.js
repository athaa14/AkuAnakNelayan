const DATA = {
  categories: ["Ikan", "Udang", "Cumi-cumi", "Kepiting", "Kerang", "Hasil Laut Lainnya"],
  siteSettings: { shippingCostPerStore: 10000, requireVerification: false },
  siteContent: {
    heroEyebrow: "Langsung dari nelayan Pangandaran",
    heroTitle: "Hasil laut segar, langsung dari sumbernya.",
    heroDescription: "Temukan tangkapan harian dengan informasi stok, kesegaran, dan dokumentasi penangkapan yang jelas.",
    heroImage: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=1400&q=85",
    pages: {
      help: { title: "Bantuan", body: "Cari produk, baca detail stok dan dokumentasi tangkapan, lalu tambahkan ke keranjang. Checkout adalah simulasi: tidak ada pembayaran uang sungguhan.\n\nSetelah pesanan dibuat, admin dapat mengonfirmasi pembayaran simulasi dan penjual memproses pesanan sesuai alur status." },
      about: { title: "Tentang Kami", body: "AkuAnakNelayan adalah marketplace hasil laut Pangandaran yang menghubungkan nelayan dengan konsumen. Kami menampilkan informasi stok, kesegaran, waktu tangkapan, dan dokumentasi dari penjual.\n\nProyek ini menggunakan data dummy dan berjalan sepenuhnya di browser melalui LocalStorage." },
      privacy: { title: "Kebijakan Privasi", body: "Data akun, produk, dan pesanan disimpan hanya di LocalStorage browser Anda sebagai simulasi. Kami tidak mengirimkan data ke server dan tidak menyimpan password asli.\n\nReset data dapat dilakukan melalui halaman pengaturan admin atau profil pengguna." },
      terms: { title: "Syarat dan Ketentuan", body: "Seluruh transaksi di website ini adalah simulasi untuk keperluan demonstrasi. Tidak ada pembayaran, pengiriman, atau jaminan produk yang sesungguhnya.\n\nDokumentasi hasil tangkapan berasal dari penjual dan belum diverifikasi secara independen." },
      shipping: { title: "Kebijakan Pengiriman", body: "Biaya pengiriman dihitung per toko sesuai pengaturan admin dan bersifat simulasi. Tidak ada integrasi dengan jasa ekspedisi.\n\nStatus pengiriman pada halaman pesanan hanya merupakan rangkaian simulasi." },
      contact: { title: "Hubungi Kami", body: "AkuAnakNelayan, Pangandaran, Jawa Barat.\nEmail: halo@lautpangandaran.id\nTelepon: +62 812-3456-7890" }
    }
  },
  sellers: [
    {id:1,ownerUserId:"seller-demo-1",shopName:"Nelayan Bahari",ownerName:"Budi Santoso",location:"Pangandaran",phone:"081234567801",rating:4.8,totalProducts:5,isVerified:true,description:"Hasil tangkapan segar langsung dari nelayan Pangandaran.",image:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"},
    {id:2,ownerUserId:"seller-demo-2",shopName:"Karang Laut",ownerName:"Asep Hidayat",location:"Sidamulih",phone:"081234567802",rating:4.7,totalProducts:5,isVerified:true,description:"Menangkap dan mengolah hasil laut dengan standar kebersihan tinggi.",image:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80"},
    {id:3,ownerUserId:"seller-demo-3",shopName:"Samudra Biru",ownerName:"Roni Wijaya",location:"Cikembulan",phone:"081234567803",rating:4.9,totalProducts:5,isVerified:true,description:"Udang dan ikan laut pilihan dari perairan selatan Jawa.",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"},
    {id:4,ownerUserId:"seller-demo-4",shopName:"Ikan Kita",ownerName:"Dedi Permana",location:"Batu Karas",phone:"081234567804",rating:4.6,totalProducts:5,isVerified:true,description:"Menyediakan ikan harian dengan dokumentasi tangkapan.",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"},
    {id:5,ownerUserId:"seller-demo-5",shopName:"Nelayan Nusantara",ownerName:"Agus Salim",location:"Pangandaran",phone:"081234567805",rating:4.8,totalProducts:5,isVerified:true,description:"Pasokan hasil laut segar untuk kebutuhan rumah tangga.",image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"},
    {id:6,ownerUserId:"seller-demo-6",shopName:"Laut Selatan",ownerName:"Slamet Riyadi",location:"Madasari",phone:"081234567806",rating:4.7,totalProducts:5,isVerified:true,description:"Bergerak langsung dari kapal nelayan hingga ke konsumen.",image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"}
  ],
  users:[
    {id:1,name:"Andi Prasetyo",email:"andi@example.com",phone:"081234567890",address:"Jl. Merdeka No. 12, Pangandaran",profileImage:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",role:"buyer"},
    {id:2,name:"Siti Nuraini",email:"siti@example.com",phone:"081298765432",address:"Desa Sidamulih, Pangandaran",profileImage:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",role:"buyer"},
    {id:"seller-demo-1",name:"Budi Santoso",email:"nelayan@example.com",phone:"081234567801",address:"Pangandaran, Jawa Barat",profileImage:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:1},
    {id:"seller-demo-2",name:"Asep Hidayat",email:"karanglaut@example.com",phone:"081234567802",address:"Sidamulih, Pangandaran",profileImage:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:2},
    {id:"seller-demo-3",name:"Roni Wijaya",email:"samudra@example.com",phone:"081234567803",address:"Cikembulan, Pangandaran",profileImage:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:3},
    {id:"seller-demo-4",name:"Dedi Permana",email:"ikankita@example.com",phone:"081234567804",address:"Batu Karas, Pangandaran",profileImage:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:4},
    {id:"seller-demo-5",name:"Agus Salim",email:"nusantara@example.com",phone:"081234567805",address:"Pangandaran, Jawa Barat",profileImage:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:5},
    {id:"seller-demo-6",name:"Slamet Riyadi",email:"lautselatan@example.com",phone:"081234567806",address:"Madasari, Pangandaran",profileImage:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",role:"seller",sellerId:6},
    {id:"admin-demo-1",name:"Administrator",email:"admin@example.com",phone:"081200000000",address:"Pangandaran, Jawa Barat",profileImage:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",role:"admin",isActive:true}
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
  const stock=i===12?3:i%7===0?0:25+(i*13)%140;
  return {id,name:item[0],category,price:base+(i%4)*5000,stock,stockUnit:"kg",freshness:i%5===0?"Perlu Segera Diolah":i%3===0?"Segar":"Sangat Segar",catchDate:`2026-11-${String(24-(i%6)).padStart(2,"0")}`,catchTime:`${String(4+(i%4)).padStart(2,"0")}:${i%2?"30":"15"}`,catchLocation,description:`${item[0]} dipanen nelayan setempat dan disimpan menggunakan es sejak selesai ditangkap. Cocok untuk kebutuhan rumah tangga maupun usaha kuliner.`,sellerId:(i%6)+1,image:`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=82`,proofImages:["https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=700&q=80","https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=700&q=80","https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80"],rating:(42+(i%7))/10,sold:20+(i*7)%180,isAvailable:stock>0,isPublished:true,updatedAt:`2026-11-${String(24-(i%6)).padStart(2,"0")}T08:00:00`};
});
