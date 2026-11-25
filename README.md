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

Login menggunakan satu halaman dan mengarahkan Buyer ke marketplace atau Seller ke dashboard penjual. Dashboard Admin belum tersedia dan role Admin ditunda.

### Akun Demo Penjual

- Email: `nelayan@example.com`
- Peran: Penjual
- Password simulasi: karakter apa pun dengan panjang minimal 4, misalnya `1234`

Password tidak disimpan atau diverifikasi terhadap kredensial asli. Autentikasi hanya simulasi frontend.

## Fitur

- Pencarian, filter kategori/lokasi/kesegaran, dan pengurutan produk
- Detail produk, galeri dokumentasi, penjual, stok, dan ulasan
- Keranjang, checkout, pengurangan stok, wishlist, profil, dan pesanan
- Tracking status pesanan dengan alur yang terkontrol
- Portal penjual untuk ringkasan penjualan, inventaris, transaksi, dan profil toko
- Penyimpanan data di LocalStorage dan reset data melalui Profil
- Validasi form, tombol tampilkan password, pencarian/filter, serta interaksi DOM dan event untuk tugas kuliah

## Struktur

Struktur utama setiap halaman berada di file HTML di root proyek. Tailwind CSS dimuat melalui CDN; `assets/css/style.css` menyimpan font dan gaya dasar. JavaScript tetap mengelola data dan bagian dinamis seperti kartu produk, keranjang, dan pesanan. Tailwind CDN memerlukan koneksi internet dan cocok untuk prototipe; gunakan proses build Tailwind untuk deployment produksi.
