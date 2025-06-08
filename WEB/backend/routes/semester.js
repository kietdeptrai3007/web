// 📁 backend/routes/semester.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM semesters', (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi lấy học kỳ' });
    res.json(results);
  });
});

module.exports = router;
