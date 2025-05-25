const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bwx_shop'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke MySQL XAMPP!');
});


app.use(express.static('public'));


app.post('/order', (req, res) => {
  const { nama, produk, jumlah } = req.body;
  const sql = 'INSERT INTO orders (nama, produk, jumlah) VALUES (?, ?, ?)';
  
  db.query(sql, [nama, produk, jumlah], (err, result) => {
    if (err) return res.status(500).send('Gagal menyimpan pesanan!');
    res.send('Pesanan berhasil!');
  });
});


app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});