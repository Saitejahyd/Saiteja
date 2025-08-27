const express = require('express');
const cors = require('cors');
const mysql = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Update with your MySQL credentials
const db = mysql.createConnection({
  host: 'saireddy.ddns.net',
  user: 'postgres',
  password: 'root',
  database: 'Testify',
  port: 5432,
  ssl: false
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to PostgreSQL database');
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));