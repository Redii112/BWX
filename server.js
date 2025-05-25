const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Jika file HTML ada di folder public

// Koneksi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bwx_shop'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal:', err.stack);
    return;
  }
  console.log('Terhubung ke database sebagai ID', db.threadId);
});

// Route untuk handle order
app.post('/order', (req, res) => {
  const { nama, produk, jumlah } = req.body;

  const sql = 'INSERT INTO orders (nama, produk, jumlah) VALUES (?, ?, ?)';
  db.query(sql, [nama, produk, jumlah], (err, result) => {
    if (err) {
      console.error('Error menyimpan pesanan:', err);
      return res.status(500).send(`
        <h2>❌ Gagal menyimpan pesanan</h2>
        <p><a href='/'>Kembali ke halaman utama</a></p>
      `);
    }

    res.send(`
      <h2>✅ Pesanan berhasil dikirim!</h2>
      <p><a href='/'>Kembali ke halaman utama</a></p>
    `);
  });
});

// Route untuk file HTML utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});