// 📁 backend/routes/score.js (dùng mysql thường)
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Danh sách điểm
router.get('/:student_id', (req, res) => {
  const { student_id } = req.params;

  const sql = `
    SELECT s.score_id, sb.subject_name, sm.semester_name, s.score
    FROM scores s
    JOIN subjects sb ON s.subject_id = sb.subject_id
    JOIN semesters sm ON s.semester_id = sm.semester_id
    WHERE s.student_id = ?
  `;

  db.query(sql, [student_id], (err, rows) => {
    if (err) {
      console.error('🔥 Lỗi truy vấn điểm:', err.message);
      return res.status(500).json({ error: 'Lỗi server khi lấy điểm' });
    }
    res.json(rows);
  });
});
//Thêm điểm
router.post('/', (req, res) => {
  const { student_id, subject_id, semester_id, score } = req.body;
  const sql = 'INSERT INTO scores (student_id, subject_id, semester_id, score) VALUES (?, ?, ?, ?)';
  db.query(sql, [student_id, subject_id, semester_id, score], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi thêm điểm' });
    res.status(201).json({ message: 'Đã thêm điểm thành công' });
  });
});
//Update điểm
router.put('/:score_id', (req, res) => {
  const { score_id } = req.params;
  const { score } = req.body;

  if (score === undefined || isNaN(score)) {
    return res.status(400).json({ error: 'Giá trị điểm không hợp lệ' });
  }

  const sql = 'UPDATE scores SET score = ? WHERE score_id = ?';

  console.log('📤 Update request:', { score_id, score }); // debug

  db.query(sql, [score, score_id], (err, result) => {
    if (err) {
      console.error('🔥 Lỗi cập nhật điểm:', err.message);
      return res.status(500).json({ error: 'Lỗi khi cập nhật điểm' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy điểm để cập nhật' });
    }

    res.json({ message: 'Cập nhật điểm thành công' });
  });
});
//Xoá điểm
router.delete('/:score_id', (req, res) => {
  const { score_id } = req.params;
  db.query('DELETE FROM scores WHERE score_id = ?', [score_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi xoá điểm' });
    res.json({ message: 'Đã xoá điểm thành công' });
  });
});


module.exports = router;
