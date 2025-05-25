<?php
$koneksi = new mysqli("localhost", "root", "", "bwx_shop");

// Cek koneksi
if ($koneksi->connect_error) {
  die("Koneksi gagal: " . $koneksi->connect_error);
}

// Ambil data dari form
$nama   = $_POST['nama'];
$produk = $_POST['produk'];
$jumlah = $_POST['jumlah'];


// Simpan ke database
$sql = "INSERT INTO orders (nama, produk, jumlah) VALUES ('$nama', '$produk', '$jumlah')";

if ($koneksi->query($sql) === TRUE) {
  echo "<h2>✅ Pesanan berhasil dikirim!</h2><p><a href='index.html'>Kembali ke halaman utama</a></p>";
} else {
  echo "❌ Gagal menyimpan: " . $koneksi->error;
}

$koneksi->close();
?>