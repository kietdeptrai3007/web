const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server khi lấy danh sách' });
    res.json(results);
  });
});

// POST add student
// POST: Thêm học sinh
router.post('/', (req, res) => {
  const { student_name, birth_year } = req.body;
  const sql = 'INSERT INTO students (student_name, birth_year) VALUES (?, ?)';
  db.query(sql, [student_name, birth_year], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi thêm học sinh:', err.message);
      return res.status(500).json({ error: 'Lỗi khi thêm học sinh' });
    }
    res.json({ message: '✅ Thêm học sinh thành công', studentId: result.insertId });
  });
});

// DELETE: Xoá học sinh theo ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM students WHERE student_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi xoá học sinh:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json({ success: true, message: 'Đã xoá học sinh thành công!' });
  });
});
// PUT: Cập nhật học sinh
router.put('/:id', (req, res) => {
  const { student_name, birth_year } = req.body;
  const sql = 'UPDATE students SET student_name = ?, birth_year = ? WHERE student_id = ?';
  db.query(sql, [student_name, birth_year, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi cập nhật học sinh' });
    }
    res.json({ success: true });
  });
});




module.exports = router;
