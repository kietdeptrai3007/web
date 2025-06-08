// 📁 backend/routes/views.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Tăng lượt truy cập
router.post('/increase', async (req, res) => {
  try {
    await db.query('UPDATE view_counter SET count = count + 1');
    res.status(200).json({ message: 'View increased' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi tăng view' });
  }
});

// Lấy lượt truy cập
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT count FROM view_counter');
    res.json({ count: rows[0]?.count || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy số view' });
  }
});

module.exports = router;
