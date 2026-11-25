# AkuAnakNelayan

Marketplace hasil laut Pangandaran berbasis HTML, Tailwind CSS, dan JavaScript murni. Seluruh data disimulasikan melalui LocalStorage; tidak membutuhkan backend atau proses build.

## Menjalankan

Buka `index.html` langsung di browser modern, atau jalankan server lokal:

```powershell
python -m http.server 5500
```

Kemudian buka `http://localhost:5500`.

## Akun Demo

- Email: `andi@example.com`
- Password: minimal 4 karakter, misalnya `1234`

Akun baru dapat dibuat melalui `register.html` dan otomatis mendapat role Buyer. Untuk membuka formulir yang sama sebagai jalur pendaftaran penjual, pilih **Daftar sebagai Penjual**; formulir akan meminta nama dan deskripsi toko.

Login menggunakan satu halaman dan mengarahkan Buyer ke marketplace, Seller ke dashboard penjual, serta Admin ke dashboard admin. Role Admin tidak dibuat melalui formulir register publik. Halaman `content.html` menampilkan Bantuan, Tentang Kami, Kebijakan Privasi, Syarat dan Ketentuan, Pengiriman, serta Kontak yang isinya dapat diubah dari area admin.

### Akun Demo Penjual

- Email: `nelayan@example.com`
- Peran: Penjual
- Password simulasi: karakter apa pun dengan panjang minimal 4, misalnya `1234`

Password tidak disimpan atau diverifikasi terhadap kredensial asli. Autentikasi hanya simulasi frontend.

### Akun Demo Admin

- Email: `admin@example.com`
- Peran: Admin
- Password simulasi: karakter apa pun dengan panjang minimal 4, misalnya `1234`

Area admin dapat diakses setelah login melalui `admin-dashboard.html`. Akun admin tidak dapat dibuat dari `register.html`.

## Fitur

- Pencarian, filter kategori/lokasi/kesegaran, dan pengurutan produk
- Detail produk, galeri dokumentasi, penjual, stok, dan ulasan
- Keranjang, checkout, pengurangan stok, wishlist, profil, dan pesanan
- Tracking status pesanan dengan alur yang terkontrol
- Portal penjual untuk ringkasan penjualan, inventaris, transaksi, dan profil toko
- Area admin untuk dasbor statistik, kelola pengguna, verifikasi penjual, moderasi produk/ulasan, transaksi lintas toko, laporan CSV, kategori, konten, dan pengaturan
- Reset data dummy melalui admin atau profil pengguna
- Penyimpanan data di LocalStorage (termasuk `categories`, `siteContent`, dan `siteSettings`)
- Validasi form, tombol tampilkan password, pencarian/filter, serta interaksi DOM dan event untuk tugas kuliah

## Struktur

Struktur utama setiap halaman berada di file HTML di root proyek, termasuk halaman admin (`admin-dashboard.html`, `admin-users.html`, `admin-sellers.html`, `admin-products.html`, `admin-product-preview.html`, `admin-orders.html`, `admin-order-detail.html`, `admin-reviews.html`, `admin-reports.html`, `admin-categories.html`, `admin-content.html`, `admin-settings.html`) dan `content.html`. Tailwind CSS dimuat melalui CDN; `assets/css/style.css` menyimpan font dan gaya dasar. JavaScript tetap mengelola data dan bagian dinamis seperti kartu produk, keranjang, dan pesanan. Logika area admin berada di `assets/js/admin-*.js`; halaman informasi publik memakai `assets/js/content.js`. Tailwind CDN memerlukan koneksi internet dan cocok untuk prototipe; gunakan proses build Tailwind untuk deployment produksi.
