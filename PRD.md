# **PRD (Product Requirements Document)**

## **AkuAnakNelayan**

### **1. Informasi Proyek**

**Nama Proyek:** AkuAnakNelayan

**Jenis Aplikasi:** Website Marketplace

**Platform:** Website

**Target Pengguna:**

- Pembeli atau konsumen hasil laut.
- Nelayan atau penjual hasil tangkapan laut.
- Pengelola atau administrator website.

**Teknologi yang Digunakan:**

- HTML sebagai struktur halaman.
- CSS untuk desain dan tampilan website.
- JavaScript untuk logika dan interaksi.
- LocalStorage untuk menyimpan data sementara di browser.
- Lucide Icons untuk ikon.
- Foto produk hasil laut sebagai konten visual.

**Batasan Teknologi:**\
Website dibuat menggunakan HTML, CSS, dan JavaScript murni (Vanilla JavaScript), tanpa Laravel, React, Vue, maupun backend. Seluruh data produk, transaksi, akun, dan pesanan menggunakan data dummy yang disimpan melalui LocalStorage.

### **2. Latar Belakang**

Pangandaran merupakan salah satu daerah yang memiliki potensi perikanan dan hasil laut. Banyak nelayan yang memperoleh hasil tangkapan setiap harinya, seperti ikan, udang, cumi-cumi, dan berbagai jenis hasil laut lainnya.

Namun, proses penjualan hasil tangkapan masih banyak dilakukan secara langsung melalui pasar, pengepul, atau pelanggan yang sudah dikenal. Hal tersebut membuat jangkauan pemasaran nelayan menjadi terbatas.

Oleh karena itu, dibuat sebuah website marketplace hasil laut yang dapat membantu nelayan memasarkan hasil tangkapannya secara online. Melalui website ini, pembeli dapat melihat produk yang tersedia, mengetahui jumlah stok, melihat informasi kesegaran dan waktu penangkapan, serta melakukan simulasi pembelian secara online.

Website ini diharapkan dapat menjadi media penghubung antara nelayan dan konsumen, sekaligus memperluas jangkauan pemasaran hasil laut Pangandaran.

### **3. Tujuan Proyek**

1. Membantu nelayan memasarkan hasil tangkapan secara online.
2. Memperluas jangkauan penjualan hasil laut.
3. Memudahkan pembeli menemukan dan membeli hasil laut.
4. Memberikan informasi stok produk secara jelas.
5. Memberikan informasi tanggal dan waktu penangkapan ikan.
6. Menampilkan dokumentasi hasil tangkapan sebagai pendukung kepercayaan pembeli.
7. Menyediakan fitur transaksi dan pemantauan status pesanan.
8. Membuat proses jual beli hasil laut menjadi lebih terorganisir.

### **4. Konsep dan Identitas Website**

**Konsep desain:** Modern Coastal Marketplace.

Website menggunakan konsep marketplace modern yang tetap memiliki identitas daerah pesisir dan perikanan. Tampilan harus terlihat profesional, bersih, sederhana, dan mudah digunakan.

**Karakter desain:**

- Modern dan elegan.
- Tidak terlalu ramai.
- Memiliki nuansa laut dan pesisir.
- Mengutamakan foto produk.
- Menggunakan tata letak yang konsisten.
- Memiliki navigasi yang mudah dipahami.
- Tidak menggunakan terlalu banyak animasi atau dekorasi.

**Warna utama:**

| Warna      | Kode    | Penggunaan                |
| ---------- | ------- | ------------------------- |
| Ocean Navy | #153B50 | Warna utama dan navbar    |
| Deep Teal  | #247B80 | Tombol dan elemen penting |
| Seafoam    | #DCECE7 | Background pendukung      |
| Warm Sand  | #F3EFE6 | Background alternatif     |
| White      | #FFFFFF | Card dan background       |
| Charcoal   | #252D32 | Teks utama                |

**Typography:**

- Plus Jakarta Sans untuk heading.
- Inter untuk teks dan informasi pendukung.

**Icon:**\
Menggunakan Lucide Icons agar bentuk ikon konsisten dan tidak menggunakan emoji sebagai pengganti ikon antarmuka.

### **5. Target Pengguna**

**A. Pembeli (Customer)**

Pembeli merupakan pengguna utama yang mengakses marketplace untuk mencari dan membeli hasil laut.

Kebutuhan pembeli:

- Melihat produk hasil laut.
- Mencari produk berdasarkan nama atau kategori.
- Melihat harga dan stok.
- Melihat tanggal dan waktu penangkapan.
- Mengetahui kondisi kesegaran produk.
- Melihat dokumentasi hasil tangkapan.
- Melihat profil dan rating penjual.
- Menambahkan produk ke keranjang dan favorit.
- Melakukan checkout.
- Melihat status pesanan.
- Memberikan ulasan produk.

**B. Penjual (Seller)**

Penjual merupakan nelayan atau pihak yang memasarkan hasil tangkapan melalui marketplace.

Dalam versi frontend ini, informasi penjual ditampilkan menggunakan data dummy. Pengelolaan produk penjual belum terhubung ke sistem backend.

Informasi penjual:

- Nama toko.
- Nama nelayan atau pemilik toko.
- Lokasi penjual.
- Rating toko.
- Jumlah produk.
- Deskripsi toko.

**C. Administrator**

Administrator merupakan pihak yang bertugas mengelola dan memantau sistem.

Pada versi awal frontend, administrator dapat menjadi pengembangan berikutnya. Jika halaman admin dibuat, pengelolaan data tetap menggunakan simulasi LocalStorage.

### **6. Struktur Halaman Website (Sitemap)**

Website memiliki halaman-halaman berikut:

| No. | Halaman         | File                |
| --- | --------------- | ------------------- |
| 1   | Beranda         | index.html          |
| 2   | Daftar Produk   | products.html       |
| 3   | Detail Produk   | product-detail.html |
| 4   | Keranjang       | cart.html           |
| 5   | Checkout        | checkout.html       |
| 6   | Daftar Pesanan  | orders.html         |
| 7   | Detail Pesanan  | order-detail.html   |
| 8   | Favorit         | wishlist.html       |
| 9   | Profil Pengguna | profile.html        |
| 10  | Login           | login.html          |
| 11  | Register        | register.html       |

Halaman tambahan yang dapat dikembangkan:

- Bantuan.
- Tentang Kami.
- Kebijakan Privasi.
- Syarat dan Ketentuan.
- Dashboard Admin.

### **7. Kebutuhan Fitur Website**

#### **7.1 Beranda (Homepage)**

Halaman beranda merupakan halaman utama yang pertama kali dilihat pengguna.

Komponen yang harus tersedia:

1. Navbar.
   - Logo website.
   - Menu Beranda.
   - Menu Produk.
   - Menu Pesanan.
   - Menu Favorit.
   - Menu Keranjang.
   - Menu Profil.
   - Tombol Login/Register jika belum login.
2. Hero Banner.
   - Menampilkan gambar hasil laut atau aktivitas nelayan.
   - Judul utama yang menarik.
   - Deskripsi singkat marketplace.
   - Tombol Lihat Produk.
3. Search Bar.
   - Mencari produk berdasarkan nama.
   - Contoh: Ikan Tuna, Udang, Cumi, Ikan Kakap.
   - Hasil pencarian menampilkan produk yang sesuai.
4. Kategori Produk.
   - Ikan.
   - Udang.
   - Cumi-cumi.
   - Kepiting.
   - Kerang.
   - Hasil Laut Lainnya.
5. Produk Terbaru.
   - Menampilkan produk yang baru ditambahkan.
   - Menampilkan foto produk.
   - Nama produk.
   - Harga per kilogram.
   - Stok tersedia.
   - Lokasi penjual.
   - Status kesegaran.
6. Produk Terlaris.
   - Menampilkan produk dengan jumlah penjualan tertinggi berdasarkan data dummy.
7. Informasi Keunggulan.
   - Hasil tangkapan nelayan.
   - Informasi stok yang jelas.
   - Dokumentasi hasil tangkapan.
   - Informasi penjual.
8. Footer.
   - Informasi website.
   - Kontak.
   - Navigasi.
   - Copyright.

#### **7.2 Halaman Daftar Produk**

Halaman ini menampilkan seluruh produk hasil laut yang tersedia.

Informasi yang ditampilkan pada setiap kartu produk:

- Foto produk.
- Nama produk.
- Harga per kilogram.
- Stok tersedia.
- Satuan stok (kg atau ton).
- Status kesegaran.
- Tanggal penangkapan.
- Lokasi penjual.
- Rating produk atau toko.
- Tombol Detail Produk.
- Tombol Favorit.

Fitur tambahan:

- Pencarian produk.
- Filter kategori.
- Filter harga.
- Filter lokasi.
- Filter status kesegaran.
- Pengurutan harga terendah.
- Pengurutan harga tertinggi.
- Pengurutan produk terbaru.
- Pengurutan produk terlaris.

Contoh tampilan informasi produk:

| Informasi         | Contoh           |
| ----------------- | ---------------- |
| Nama Produk       | Ikan Tuna        |
| Harga             | Rp45.000/kg      |
| Stok              | 120 kg           |
| Tanggal Tangkapan | 24 November 2026 |
| Waktu Tangkapan   | 05.30 WIB        |
| Kesegaran         | Sangat Segar     |
| Lokasi            | Pangandaran      |
| Penjual           | Nelayan Bahari   |

#### **7.3 Halaman Detail Produk**

Halaman detail produk menampilkan informasi produk secara lengkap.

Informasi yang harus tersedia:

**A. Informasi Produk**

- Foto utama produk.
- Galeri foto produk.
- Nama produk.
- Kategori.
- Harga per kilogram.
- Stok tersedia.
- Deskripsi produk.
- Lokasi asal produk.

**B. Informasi Kesegaran**

Setiap produk wajib menampilkan informasi kesegaran.

Contoh status:

- Sangat Segar.
- Segar.
- Perlu Segera Diolah.

Status kesegaran harus berdasarkan informasi kondisi produk yang diberikan penjual, bukan hanya berdasarkan tanggal penangkapan.

**C. Informasi Penangkapan**

- Tanggal penangkapan.
- Waktu penangkapan.
- Lokasi penangkapan.
- Nama nelayan atau penjual.

**D. Dokumentasi Hasil Tangkapan**

Untuk meningkatkan kepercayaan pembeli, setiap produk sebaiknya memiliki dokumentasi pendukung.

Contoh dokumentasi:

1. Foto hasil tangkapan nelayan.
2. Foto proses penimbangan.
3. Foto penyimpanan hasil tangkapan menggunakan es.
4. Foto kondisi produk sebelum dikirim.

Setiap dokumentasi memiliki keterangan singkat.

Contoh:

| Dokumentasi      | Keterangan                     |
| ---------------- | ------------------------------ |
| Foto Tangkapan   | Hasil tangkapan nelayan        |
| Foto Penimbangan | Bukti berat produk             |
| Foto Penyimpanan | Produk disimpan menggunakan es |

Dokumentasi merupakan bukti pendukung yang diunggah oleh penjual dan belum tentu merupakan bukti yang terverifikasi secara independen.

**E. Informasi Penjual**

- Nama toko.
- Foto profil toko.
- Lokasi toko.
- Rating toko.
- Jumlah produk yang dijual.
- Tombol Lihat Toko.

**F. Ulasan Pembeli**

- Nama pembeli.
- Rating bintang.
- Komentar.
- Tanggal ulasan.
- Foto ulasan jika tersedia.

**G. Fitur Pembelian**

- Input jumlah pembelian.
- Tombol tambah jumlah.
- Tombol kurangi jumlah.
- Validasi jumlah pembelian.
- Tombol Tambah ke Keranjang.
- Tombol Beli Sekarang.
- Tombol Tambahkan ke Favorit.

Jumlah pembelian tidak boleh melebihi stok yang tersedia.

#### **7.4 Keranjang Belanja (Cart)**

Halaman keranjang menampilkan produk yang dipilih pembeli.

Fitur:

- Menampilkan produk dalam keranjang.
- Menampilkan foto produk.
- Menampilkan nama produk.
- Menampilkan harga.
- Menampilkan jumlah pembelian.
- Mengubah jumlah produk.
- Menghapus produk.
- Menghitung subtotal.
- Menghitung total belanja.
- Memilih produk yang ingin dibeli.
- Tombol Checkout.

Ketentuan:

- Jumlah produk tidak boleh melebihi stok.
- Jika stok habis, produk tidak dapat dibeli.
- Total harga dihitung otomatis menggunakan JavaScript.

#### **7.5 Checkout**

Halaman checkout digunakan untuk menyelesaikan simulasi pembelian.

Informasi yang ditampilkan:

**A. Informasi Pembeli**

- Nama penerima.
- Nomor telepon.
- Alamat pengiriman.
- Catatan untuk penjual.

**B. Ringkasan Pesanan**

- Nama produk.
- Jumlah pembelian.
- Harga produk.
- Subtotal.
- Biaya pengiriman dummy.
- Total pembayaran.

**C. Metode Pembayaran**

- Transfer Bank (simulasi).
- E-Wallet (simulasi).
- COD (simulasi).

**D. Tombol Konfirmasi Pesanan**

Ketika pembeli melakukan konfirmasi:

1. Sistem memvalidasi data.
2. Sistem membuat ID pesanan.
3. Pesanan disimpan ke LocalStorage.
4. Status awal pesanan menjadi Belum Dibayar.
5. Pembeli diarahkan ke halaman detail pesanan.

Catatan: Tidak ada pembayaran uang sungguhan atau integrasi payment gateway.

#### **7.6 Halaman Daftar Pesanan**

Halaman ini menampilkan seluruh transaksi yang pernah dilakukan pengguna.

Status pesanan:

| Status           | Keterangan                                                 |
| ---------------- | ---------------------------------------------------------- |
| Belum Dibayar    | Pesanan dibuat tetapi belum dibayar                        |
| Dikemas          | Pembayaran sudah dikonfirmasi dan pesanan sedang disiapkan |
| Dikirim          | Pesanan sudah diserahkan untuk pengiriman                  |
| Dalam Perjalanan | Pesanan sedang menuju alamat pembeli                       |
| Selesai          | Pesanan telah diterima                                     |
| Dibatalkan       | Pesanan dibatalkan                                         |

Fitur:

- Daftar pesanan.
- Filter berdasarkan status.
- Nomor pesanan.
- Tanggal transaksi.
- Total pembayaran.
- Detail produk.
- Tombol Lihat Detail.

#### **7.7 Detail Pesanan dan Tracking**

Halaman ini menampilkan informasi lengkap pesanan.

Informasi:

- Nomor pesanan.
- Tanggal transaksi.
- Nama produk.
- Jumlah pembelian.
- Total pembayaran.
- Alamat pengiriman.
- Metode pembayaran.
- Status pesanan.

Tracking ditampilkan menggunakan timeline.

Contoh:

1. Pesanan dibuat.
2. Pembayaran dikonfirmasi.
3. Pesanan dikemas.
4. Pesanan dikirim.
5. Pesanan dalam perjalanan.
6. Pesanan selesai.

Setiap perubahan status menampilkan waktu perubahan berdasarkan simulasi.

Status tidak boleh berubah secara acak. Perubahan harus mengikuti urutan yang masuk akal.

#### **7.8 Halaman Favorit (Wishlist)**

Halaman favorit menampilkan produk yang disimpan pembeli.

Fitur:

- Menambahkan produk ke favorit.
- Menghapus produk dari favorit.
- Melihat detail produk.
- Menambahkan produk ke keranjang.
- Menampilkan informasi stok.

Jika produk sudah tidak tersedia, tampilkan status produk habis.

#### **7.9 Halaman Profil**

Halaman profil menampilkan informasi pengguna.

Informasi:

- Foto profil.
- Nama lengkap.
- Email.
- Nomor telepon.
- Alamat.
- Tanggal bergabung.

Fitur:

- Melihat profil.
- Mengubah informasi profil.
- Menyimpan perubahan.
- Melihat riwayat pesanan.
- Logout.

#### **7.10 Halaman Login**

Komponen:

- Email atau username.
- Password.
- Tombol Login.
- Link Register.

Validasi:

- Input tidak boleh kosong.
- Format email harus benar jika menggunakan email.
- Akun harus tersedia dalam data dummy.

Login hanya merupakan simulasi frontend. Jangan menyimpan password asli atau informasi sensitif di LocalStorage.

#### **7.11 Halaman Register**

Komponen:

- Nama lengkap.
- Email.
- Nomor telepon.
- Password.
- Konfirmasi password.
- Tombol Register.
- Link Login.

Validasi:

- Semua input wajib diisi.
- Email tidak boleh digunakan oleh akun lain.
- Password dan konfirmasi password harus sama.
- Data akun disimpan sebagai data simulasi tanpa password asli.

### **8. Struktur Data Dummy**

Seluruh data awal dibuat menggunakan JavaScript.

Jumlah data yang disarankan:

| Jenis Data         | Jumlah              |
| ------------------ | ------------------- |
| Produk             | 24–30               |
| Penjual            | 6–8                 |
| Pengguna           | 5–10                |
| Pesanan            | 8–12                |
| Ulasan             | 20–30               |
| Dokumentasi produk | 2–3 foto per produk |

#### **8.1 Data Produk**

Setiap produk minimal memiliki:

```
{
  id: 1,
  name: "Ikan Tuna",
  category: "Ikan",
  price: 45000,
  stock: 120,
  stockUnit: "kg",
  freshness: "Sangat Segar",
  catchDate: "2026-11-24",
  catchTime: "05:30",
  catchLocation: "Perairan Pangandaran",
  description: "Ikan tuna hasil tangkapan nelayan Pangandaran.",
  sellerId: 1,
  image: "assets/images/tuna.jpg",
  proofImages: [
    "assets/images/tuna-catch.jpg",
    "assets/images/tuna-weighing.jpg",
    "assets/images/tuna-storage.jpg"
  ],
  rating: 4.8,
  sold: 45,
  isAvailable: true
}
```

#### **8.2 Data Penjual**

```
{
  id: 1,
  shopName: "Nelayan Bahari",
  ownerName: "Budi Santoso",
  location: "Pangandaran",
  rating: 4.8,
  totalProducts: 8,
  description: "Menyediakan hasil tangkapan laut langsung dari nelayan."
}
```

#### **8.3 Data Pengguna**

```
{
  id: 1,
  name: "Andi",
  email: "andi@example.com",
  phone: "081234567890",
  address: "Pangandaran, Jawa Barat",
  profileImage: "assets/images/profile.jpg"
}
```

#### **8.4 Data Pesanan**

```
{
  id: "ORD-001",
  userId: 1,
  products: [
    {
      productId: 1,
      name: "Ikan Tuna",
      price: 45000,
      quantity: 2,
      subtotal: 90000
    }
  ],
  shippingAddress: "Pangandaran, Jawa Barat",
  paymentMethod: "Transfer Bank",
  subtotal: 90000,
  shippingCost: 10000,
  total: 100000,
  status: "Belum Dibayar",
  createdAt: "2026-11-24T10:00:00",
  history: []
}
```

#### **8.5 Data Ulasan**

```
{
  id: 1,
  productId: 1,
  userName: "Andi",
  rating: 5,
  comment: "Produk sesuai dengan deskripsi.",
  date: "2026-11-24",
  image: null
}
```

### **9. Kebutuhan JavaScript**

JavaScript digunakan untuk menjalankan seluruh fungsi website.

Fitur JavaScript yang wajib dibuat:

1. Menampilkan data produk secara dinamis.
2. Menampilkan data penjual.
3. Menampilkan produk terbaru.
4. Menampilkan produk terlaris.
5. Melakukan pencarian produk.
6. Melakukan filter kategori.
7. Melakukan pengurutan produk.
8. Menampilkan detail produk berdasarkan ID.
9. Mengatur jumlah pembelian.
10. Memvalidasi stok produk.
11. Menambahkan produk ke keranjang.
12. Mengubah jumlah produk di keranjang.
13. Menghapus produk dari keranjang.
14. Menghitung subtotal dan total.
15. Menambahkan produk ke favorit.
16. Menghapus produk dari favorit.
17. Membuat transaksi checkout.
18. Membuat nomor pesanan otomatis.
19. Menampilkan riwayat pesanan.
20. Mengubah status pesanan secara simulasi.
21. Menampilkan tracking pesanan.
22. Mengelola data profil pengguna.
23. Melakukan simulasi login dan register.
24. Memberikan notifikasi ketika pengguna melakukan tindakan.
25. Menyimpan data menggunakan LocalStorage.

**Ketentuan JavaScript:**

- Gunakan Vanilla JavaScript.
- Gunakan function untuk memisahkan logika.
- Gunakan array dan object untuk mengelola data.
- Gunakan localStorage untuk menyimpan data simulasi.
- Gunakan event listener untuk interaksi.
- Hindari menuliskan seluruh logika dalam satu file besar.
- Pisahkan JavaScript berdasarkan halaman atau fungsi.
- Gunakan validasi untuk setiap proses penting.
- Pastikan data tetap tersedia setelah halaman di-refresh.

### **10. Struktur Folder dan File**

Struktur proyek yang disarankan:

```
marketplace-hasil-laut/
│
├── index.html
├── products.html
├── product-detail.html
├── cart.html
├── checkout.html
├── orders.html
├── order-detail.html
├── wishlist.html
├── profile.html
├── login.html
├── register.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── home.css
│   │   ├── products.css
│   │   ├── detail.css
│   │   ├── cart.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── data.js
│   │   ├── storage.js
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── orders.js
│   │   ├── wishlist.js
│   │   └── profile.js
│   │
│   └── images/
│       ├── banner/
│       ├── products/
│       ├── sellers/
│       ├── proof/
│       └── profile/
│
└── README.md
```

### **11. Ketentuan UI/UX dan Desain**

Website harus memiliki desain yang konsisten di semua halaman.

**A. Layout**

- Gunakan lebar konten yang konsisten.
- Gunakan jarak antar elemen yang teratur.
- Gunakan card dengan radius yang tidak berlebihan.
- Gunakan navbar yang mudah dipahami.
- Pastikan halaman tidak terlalu padat.
- Gunakan hierarki ukuran teks yang jelas.

**B. Foto Produk**

- Gunakan foto hasil laut yang realistis.
- Pastikan foto memiliki kualitas yang cukup.
- Gunakan rasio gambar yang konsisten pada kartu produk.
- Hindari foto yang tidak relevan dengan produk.
- Gunakan foto berbeda untuk setiap jenis produk.

**C. Tombol**

- Tombol utama menggunakan warna Deep Teal.
- Tombol sekunder menggunakan warna netral.
- Tombol harus memiliki hover state.
- Tombol harus benar-benar menjalankan fungsinya.

**D. Responsiveness**\
Website harus dapat digunakan pada:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.

**E. Animasi**\
Gunakan animasi sederhana seperti:

- Hover pada tombol.
- Transisi card.
- Transisi dropdown.
- Animasi notifikasi.
- Transisi halaman jika diperlukan.

Hindari animasi yang berlebihan karena dapat mengganggu kenyamanan pengguna.

**F. Konsistensi**

- Gunakan satu sistem warna.
- Gunakan satu sistem typography.
- Gunakan ikon dengan gaya yang sama.
- Gunakan komponen tombol yang konsisten.
- Gunakan pola card produk yang sama.
- Pastikan semua halaman memiliki identitas visual yang seragam.

### **12. Penyimpanan Data (LocalStorage)**

LocalStorage digunakan sebagai pengganti database sementara.

Data yang disimpan:

| Key LocalStorage | Kegunaan                             |
| ---------------- | ------------------------------------ |
| products         | Data produk                          |
| sellers          | Data penjual                         |
| users            | Data pengguna simulasi               |
| currentUser      | Informasi pengguna yang sedang login |
| cart             | Data keranjang                       |
| wishlist         | Data favorit                         |
| orders           | Data pesanan                         |
| reviews          | Data ulasan                          |

Ketentuan:

1. Data awal dimuat dari data dummy JavaScript.
2. Data disimpan ke LocalStorage ketika mengalami perubahan.
3. Data harus tetap tersedia setelah halaman di-refresh.
4. Data keranjang harus diperbarui ketika jumlah produk berubah.
5. Stok harus diperbarui setelah transaksi simulasi berhasil sesuai aturan transaksi.
6. Produk yang stoknya habis tidak dapat dibeli.
7. Jangan menyimpan password asli atau informasi sensitif di LocalStorage.
8. Sediakan mekanisme reset data dummy untuk keperluan pengujian.

Catatan: LocalStorage hanya berlaku pada browser dan perangkat yang digunakan. Data tidak tersinkronisasi dengan pengguna lain.

### **13. Aturan dan Validasi Sistem**

Untuk menghindari kesalahan proses, website harus memiliki aturan berikut:

**A. Stok Produk**

- Pembelian tidak boleh melebihi stok.
- Stok tidak boleh bernilai negatif.
- Produk dengan stok nol ditampilkan sebagai habis.
- Jumlah pembelian minimal satu.

**B. Keranjang**

- Produk yang sama tidak boleh ditambahkan sebagai item duplikat jika dapat digabungkan menjadi satu item dengan jumlah berbeda.
- Jumlah produk harus mengikuti stok.
- Total harga harus dihitung otomatis.

**C. Checkout**

- Pembeli harus mengisi informasi pengiriman.
- Pembeli harus memilih metode pembayaran.
- Pesanan harus memiliki nomor unik.
- Total transaksi harus dihitung dari subtotal dan biaya pengiriman.

**D. Status Pesanan**

- Pesanan baru dimulai dari Belum Dibayar.
- Pesanan yang belum dibayar tidak boleh langsung berstatus Dikirim.
- Pesanan hanya dapat berubah ke status berikutnya sesuai alur.
- Pesanan yang dibatalkan tidak dapat dilanjutkan kembali tanpa membuat transaksi baru.

**E. Ulasan**

- Ulasan hanya dapat diberikan untuk pesanan yang sudah selesai.
- Rating menggunakan rentang 1 sampai 5.
- Ulasan harus terhubung dengan produk.

**F. Login**

- Pengguna harus memiliki akun simulasi.
- Pengguna yang belum login diarahkan ke halaman login ketika mengakses fitur yang membutuhkan akun.
- Logout menghapus sesi pengguna aktif.

### **14. Kebutuhan Non-Fungsional**

1. Website harus mudah digunakan.
2. Website harus memiliki tampilan responsif.
3. Website harus memiliki waktu pemuatan yang wajar.
4. Navigasi antarhalaman harus berfungsi.
5. Tampilan harus konsisten.
6. Kode harus mudah dibaca dan dikembangkan.
7. Data dummy harus terstruktur.
8. Tidak boleh ada tombol yang tidak memiliki fungsi.
9. Website harus dapat dijalankan secara lokal.
10. Website harus kompatibel dengan browser modern seperti Google Chrome.

### **15. Tahapan Pengembangan**

Pengembangan dilakukan secara bertahap agar pengerjaan lebih terarah.

**Tahap 1 – Persiapan Proyek**

- Membuat folder proyek.
- Membuat struktur file.
- Menentukan warna dan typography.
- Menyiapkan aset gambar.
- Menyiapkan data dummy.

**Tahap 2 – Pembuatan Tampilan Utama**

- Membuat navbar.
- Membuat homepage.
- Membuat hero banner.
- Membuat kategori.
- Membuat bagian produk terbaru.
- Membuat bagian produk terlaris.
- Membuat footer.

**Tahap 3 – Halaman Produk**

- Membuat halaman daftar produk.
- Membuat card produk.
- Membuat filter kategori.
- Membuat search bar.
- Membuat detail produk.
- Menampilkan informasi stok.
- Menampilkan informasi kesegaran.
- Menampilkan tanggal dan waktu penangkapan.
- Menampilkan dokumentasi hasil tangkapan.
- Menampilkan informasi penjual dan ulasan.

**Tahap 4 – Fitur Pembeli**

- Membuat keranjang.
- Membuat wishlist.
- Membuat checkout.
- Membuat profil.
- Membuat login dan register simulasi.

**Tahap 5 – Fitur Pesanan**

- Membuat daftar pesanan.
- Membuat detail pesanan.
- Membuat tracking pesanan.
- Membuat simulasi perubahan status pesanan.

**Tahap 6 – Integrasi JavaScript**

- Menghubungkan data dummy dengan halaman.
- Menghubungkan LocalStorage.
- Menghubungkan seluruh tombol.
- Membuat validasi.
- Memastikan perhitungan berjalan benar.

**Tahap 7 – Pengujian**

- Menguji seluruh halaman.
- Menguji pencarian.
- Menguji filter.
- Menguji keranjang.
- Menguji checkout.
- Menguji perubahan stok.
- Menguji wishlist.
- Menguji status pesanan.
- Menguji tampilan responsif.

**Tahap 8 – Finalisasi**

- Memperbaiki bug.
- Merapikan kode.
- Memastikan konsistensi desain.
- Memastikan semua fitur berjalan.
- Menyiapkan website untuk presentasi.

### **16. Acceptance Criteria (Kriteria Keberhasilan)**

Website dianggap selesai apabila memenuhi kriteria berikut:

| No. | Kriteria      | Target                                |
| --- | ------------- | ------------------------------------- |
| 1   | Homepage      | Berfungsi dan menampilkan produk      |
| 2   | Navbar        | Semua menu dapat digunakan            |
| 3   | Search        | Dapat mencari produk                  |
| 4   | Filter        | Dapat menyaring produk                |
| 5   | Detail Produk | Menampilkan informasi lengkap         |
| 6   | Stok          | Menampilkan jumlah stok dan satuan    |
| 7   | Kesegaran     | Menampilkan status kesegaran          |
| 8   | Penangkapan   | Menampilkan tanggal dan waktu         |
| 9   | Dokumentasi   | Menampilkan foto bukti pendukung      |
| 10  | Penjual       | Menampilkan informasi toko            |
| 11  | Ulasan        | Menampilkan rating dan komentar       |
| 12  | Keranjang     | Dapat menambah dan menghapus produk   |
| 13  | Checkout      | Dapat membuat pesanan simulasi        |
| 14  | Pesanan       | Menampilkan riwayat transaksi         |
| 15  | Tracking      | Menampilkan status pesanan            |
| 16  | Wishlist      | Dapat menyimpan produk favorit        |
| 17  | Profil        | Dapat menampilkan dan mengubah profil |
| 18  | Login         | Dapat menjalankan simulasi login      |
| 19  | Register      | Dapat menjalankan simulasi register   |
| 20  | Responsive    | Berjalan di desktop dan mobile        |

### **17. Batasan Sistem**

Versi pertama website memiliki batasan sebagai berikut:

1. Website hanya menggunakan HTML, CSS, dan JavaScript.
2. Tidak menggunakan backend.
3. Tidak menggunakan database server.
4. Seluruh data menggunakan dummy data.
5. Transaksi hanya simulasi.
6. Pembayaran tidak menggunakan uang sungguhan.
7. Tidak menggunakan payment gateway.
8. Tracking pengiriman hanya simulasi.
9. Tidak terhubung dengan jasa ekspedisi.
10. Data LocalStorage tidak tersinkronisasi antarperangkat.
11. Dokumentasi hasil tangkapan merupakan foto pendukung dari penjual dan belum diverifikasi secara otomatis.
12. Login dan register hanya untuk simulasi frontend.

### **18. Pengembangan Berikutnya**

Apabila website dikembangkan menjadi aplikasi yang lebih lengkap, fitur berikut dapat ditambahkan:

- Backend menggunakan Laravel.
- Database MySQL.
- Dashboard penjual.
- Dashboard administrator.
- Pengelolaan produk oleh nelayan.
- Upload foto hasil tangkapan.
- Verifikasi dokumentasi hasil tangkapan.
- Payment gateway.
- Integrasi jasa pengiriman.
- Tracking pengiriman secara real-time.
- Notifikasi pesanan.
- Chat antara pembeli dan penjual.
- Laporan penjualan.
- Sistem rating dan ulasan yang tersimpan di database.

### **19. Gambaran Akhir Produk**

AkuAnakNelayan merupakan website marketplace yang menghubungkan nelayan dengan konsumen melalui sistem penjualan online.

Fokus utama website bukan hanya menyediakan tempat untuk membeli hasil laut, tetapi juga memberikan informasi yang transparan mengenai produk, stok, kesegaran, waktu penangkapan, serta dokumentasi hasil tangkapan.

Dengan adanya informasi tersebut, pembeli diharapkan dapat lebih mudah menentukan produk yang ingin dibeli, sedangkan nelayan memiliki media tambahan untuk memasarkan hasil tangkapannya kepada konsumen yang lebih luas.

### **20. Instruksi untuk AI Coding Assistant**

Jika PRD ini diberikan kepada AI Coding Assistant seperti ChatGPT, Gemini, atau GitHub Copilot, gunakan instruksi berikut:

Buat website AkuAnakNelayan berdasarkan seluruh kebutuhan yang dijelaskan dalam PRD ini.

Ketentuan pengerjaan:

1. Gunakan HTML, CSS, dan Vanilla JavaScript.
2. Jangan menggunakan Laravel, React, Vue, atau framework JavaScript lainnya.
3. Gunakan LocalStorage untuk penyimpanan data simulasi.
4. Buat setiap halaman sesuai struktur sitemap.
5. Pisahkan file HTML, CSS, dan JavaScript.
6. Gunakan data dummy yang realistis dan saling terhubung.
7. Pastikan seluruh tombol dan fitur benar-benar berfungsi.
8. Jangan hanya membuat tampilan statis.
9. Pastikan informasi stok, kesegaran, tanggal penangkapan, dan dokumentasi hasil tangkapan ditampilkan.
10. Buat proses keranjang, checkout, dan pesanan saling terhubung.
11. Pastikan stok diperbarui setelah transaksi simulasi berhasil.
12. Gunakan desain Modern Coastal Marketplace.
13. Gunakan warna dan typography sesuai identitas desain.
14. Gunakan Lucide Icons.
15. Gunakan foto hasil laut yang relevan dan realistis.
16. Pastikan tampilan responsif di desktop, tablet, dan smartphone.
17. Hindari desain yang terlalu ramai, penggunaan gradient berlebihan, glassmorphism, dan dekorasi yang tidak diperlukan.
18. Gunakan kode yang rapi, mudah dipahami, dan mudah dikembangkan.
19. Jangan mengubah teknologi yang sudah ditentukan dalam PRD.
20. Kerjakan proyek secara bertahap dan pastikan setiap tahap dapat dijalankan sebelum melanjutkan ke tahap berikutnya.

**Prioritas utama:** Buat website yang memiliki tampilan profesional, mudah digunakan, dan seluruh fitur frontend-nya berjalan dengan baik. Jangan hanya fokus pada tampilan visual, tetapi pastikan logika JavaScript dan hubungan antarhalaman juga berfungsi.