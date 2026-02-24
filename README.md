# Frontend Dev Assessment - Kledo

## Deskripsi Project

Proyek ini adalah aplikasi frontend untuk filter wilayah Indonesia yang dibangun sebagai bagian dari frontend dev assessment dari Kledo. Aplikasi ini memungkinkan pengguna untuk memilih provinsi, kota/kabupaten, dan kecamatan secara berurutan (cascading filter) dan melihat detail wilayah yang dipilih.

## Fitur Utama

1. **Filter Wilayah**: Pilih provinsi, kota/kabupaten, dan kecamatan secara berurutan
2. **Cascading Filter**: Pilihan kota/kabupaten dan kecamatan di-filter berdasarkan provinsi yang dipilih
3. **Local Storage**: Data pilihan user disimpan di local storage untuk penggunaan selanjutnya
4. **Responsive Design**: Aplikasi responsif dan dapat diakses dari berbagai perangkat
5. **Reset Filter**: Tombol reset untuk menghapus semua pilihan dan kembali ke awal
6. **Breadcrumb**: Menampilkan jalur navigasi dari Indonesia ke kecamatan yang dipilih

## Teknologi yang Digunakan

- **React 18**: Library utama untuk membangun antarmuka pengguna
- **TypeScript**: Type safety untuk kode yang lebih maintainable
- **Tailwind CSS**: Framework CSS untuk styling yang cepat dan responsif
- **Vite**: Build tool untuk pengembangan dan bundling
- **React Router DOM**: Routing untuk single page application

## Struktur Project

```
kledo-frontend-assessment/
├── src/
│   ├── components/          # Komponen React (tidak digunakan di version final)
│   ├── data/               # Data wilayah Indonesia (JSON)
│   ├── hooks/              # Custom hooks (tidak digunakan di version final)
│   ├── FilterPage.tsx      # Komponen utama aplikasi
│   ├── index.css           # Styling utama
│   └── main.tsx            # Entry point aplikasi
├── public/
│   └── data/               # Data wilayah untuk fetching
├── index.html              # Template HTML utama
├── package.json            # Konfigurasi project dan dependencies
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── postcss.config.js       # Konfigurasi PostCSS
├── vite.config.js          # Konfigurasi Vite
└── .gitignore              # File untuk mengexclude dari git
```

## Cara Instalasi

1. **Clone Repository**:
   ```bash
   git clone https://github.com/FauzanAhnaf999/frontend-dev-test_kledo.git
   cd frontend-dev-test_kledo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```

4. **Build untuk Production**:
   ```bash
   npm run build
   ```

## Cara Menggunakan Aplikasi

1. **Pilih Provinsi**: Klik pada dropdown provinsi dan pilih provinsi yang diinginkan
2. **Pilih Kota/Kabupaten**: Setelah memilih provinsi, dropdown kota/kabupaten akan aktif dan menampilkan kota/kabupaten yang terkait dengan provinsi yang dipilih
3. **Pilih Kecamatan**: Setelah memilih kota/kabupaten, dropdown kecamatan akan aktif dan menampilkan kecamatan yang terkait dengan kota/kabupaten yang dipilih
4. **Reset Filter**: Klik tombol reset untuk menghapus semua pilihan dan kembali ke awal

## Struktur Data

Data wilayah Indonesia disimpan dalam file `public/data/indonesia_regions.json` dan `src/data/indonesia_regions.json` yang berisi:

- **Provinces**: Daftar provinsi di Indonesia (3 provinsi untuk demo)
- **Regencies**: Daftar kota/kabupaten yang terkait dengan provinsi
- **Districts**: Daftar kecamatan yang terkait dengan kota/kabupaten

## Kodingan Utama

### FilterPage.tsx

Komponen utama aplikasi yang berisi:

1. **useRegions Hook**: Custom hook untuk fetching dan loading data wilayah
2. **RegionFilter Component**: Komponen filter untuk memilih provinsi, kota/kabupaten, dan kecamatan
3. **Breadcrumb Component**: Komponen breadcrumb untuk menampilkan jalur navigasi
4. **RegionContent Component**: Komponen untuk menampilkan detail wilayah yang dipilih
5. **Main FilterPage Component**: Komponen utama yang merender semua komponen di atas

### Styling

Styling aplikasi menggunakan Tailwind CSS dengan:

- Warna primer biru (#007bff)
- Desain card dengan shadow untuk visual yang menarik
- Rounded-2xl untuk border radius yang lebih lembut
- Responsive grid untuk tata letak yang adaptif

## Catatan

- Data wilayah yang digunakan adalah data demo dengan 3 provinsi, 6 kota/kabupaten, dan 18 kecamatan
- Aplikasi menggunakan local storage untuk menyimpan pilihan user
- Filter cascading memastikan bahwa hanya kota/kabupaten dan kecamatan yang terkait dengan provinsi yang dipilih yang ditampilkan
- Aplikasi responsive dan dapat diakses dari perangkat mobile hingga desktop

## Kesan dan Pesan Singkat

Saya sangat senang bisa mengerjakan frontend dev assessment ini dari Kledo. Proyek ini memberikan tantangan yang menarik dalam membuat filter wilayah Indonesia dengan fitur cascading dan local storage. Saya belajar banyak tentang cara merancang antarmuka pengguna yang responsif dan mudah digunakan.

Untuk saya, hal yang paling penting dalam proyek ini adalah:
1. **Kepastian Persyaratan**: Memahami dengan jelas apa yang diharapkan dari aplikasi sebelum memulai coding
2. **Struktur Data**: Menyusun data wilayah yang terstruktur dan mudah diakses
3. **User Experience**: Membuat filter yang intuitif dan memberikan feedback yang jelas kepada pengguna
4. **Testing**: Memastikan aplikasi bekerja dengan benar di berbagai perangkat dan browser

Saya merasa puas dengan hasil yang di capai, tetapi juga sadar bahwa selalu ada ruang untuk perbaikan. Saya akan terus belajar dan meningkatkan keterampilan frontend saya untuk proyek-proyek selanjutnya.

## Author

Fauzan Ahnaf
