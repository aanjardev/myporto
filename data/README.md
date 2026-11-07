# Penyimpanan lokal

Aplikasi membaca dan menulis `data/portfolio.json`, tanpa koneksi database.
Saat file belum tersedia, data awal dibaca dari `portfolio.initial.json`.
Upload gambar dan PDF disimpan di `data/uploads/` dan dilayani melalui `/api/uploads/`.

## Pemakaian

1. Jalankan `npm run dev`.
2. Buka `/admin/login`, gunakan password `ADMIN_SECRET` dari `.env.local`.
3. Tambah atau edit konten melalui admin, lalu buka ulang halaman portofolio.

Backup seluruh folder `data/`, khususnya `portfolio.json` dan `uploads/`.
Jangan hapus `portfolio.json` kecuali ingin kembali ke data awal. Data awal berasal
 dari sumber lokal repository, bukan ekspor dari Supabase.

Bisa memakai `PORTFOLIO_DATA_DIR` untuk lokasi penyimpanan lain. Server harus memiliki
izin menulis. Gunakan komputer lokal atau server dengan disk persisten; perubahan
JSON lokal tidak otomatis masuk ke Git atau situs lain yang sudah dipublikasikan.
Jika server berhenti paksa saat menyimpan dan menyisakan `portfolio.json.lock`,
hentikan semua proses aplikasi sebelum menghapus folder lock tersebut.

Prisma lama tetap tersedia sebagai arsip migrasi; halaman dan API aktif menggunakan
`src/lib/json-store.ts`. Tipe query memakai type-only import yang sudah tersedia,
tanpa membuat koneksi Prisma saat runtime. Jangan jalankan `db:seed` untuk data JSON.

Empat proyek tambahan dapat diimpor ulang dengan `python scripts/add_portfolio_projects.py`.
Importer melewati proyek dengan slug atau GitHub URL yang sudah ada, mempertahankan
edit admin, dan menambahkan data awal secara terpisah. Cover SVG berlabel "PROJECT
COVER" adalah ilustrasi judul, bukan screenshot aplikasi. Ganti melalui admin jika
screenshot final sudah tersedia.
