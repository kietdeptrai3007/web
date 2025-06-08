// 📁 frontend/src/components/ScoreList.jsx
import React, { useEffect, useState } from 'react';

function ScoreList({ studentId }) {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState({ subject_id: '', semester_id: '', score: '' });
  const [selectedSemester, setSelectedSemester] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (studentId) fetchScores();
  }, [studentId]);

  const fetchScores = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/scores/${studentId}`);
      if (!res.ok) throw new Error('API lỗi');
      const data = await res.json();
      setScores(data);
    } catch (err) {
      alert('Không thể tải bảng điểm');
      console.error(err);
    }
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    if (!newScores[index]) return;
    newScores[index].score = value;
    setScores(newScores);
  };

  const updateScore = async (score_id, score) => {
    try {
      const res = await fetch(`http://localhost:5001/api/scores/${score_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      });
      if (!res.ok) throw new Error();
      alert('✅ Sửa điểm thành công');
      fetchScores();
    } catch (err) {
      alert('❌ Lỗi khi cập nhật điểm');
    }
  };

  const deleteScore = async (score_id) => {
    if (!window.confirm('Xác nhận xoá điểm này?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/scores/${score_id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error();
      fetchScores();
    } catch (err) {
      alert('Lỗi khi xoá điểm');
    }
  };

  const addScore = async () => {
    const { subject_id, semester_id, score } = newScore;
    if (!subject_id || !semester_id || !score) return alert('Điền đầy đủ thông tin');
    try {
      const res = await fetch('http://localhost:5001/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, subject_id, semester_id, score })
      });
      if (!res.ok) throw new Error();
      fetchScores();
      setNewScore({ subject_id: '', semester_id: '', score: '' });
    } catch (err) {
      alert('Lỗi khi thêm điểm');
    }
  };

  if (!studentId) return null;

  const filteredScores = selectedSemester
    ? scores.filter(s => s.semester_name === selectedSemester)
    : scores;

  const averageScore =
    filteredScores.length > 0
      ? (
          filteredScores.reduce((sum, s) => sum + parseFloat(s.score || 0), 0) /
          filteredScores.length
        ).toFixed(2)
      : 0;

  return (
    <div>
      <h3>📘 Bảng điểm học sinh</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Lọc theo học kỳ: </label>
        <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
          <option value="">Tất cả</option>
          {[...new Set(scores.map(s => s.semester_name))].map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      {filteredScores.length === 0 ? (
        <p>Chưa có dữ liệu điểm.</p>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th>Môn học</th>
              <th>Học kỳ</th>
              <th>Điểm</th>
              {isAdmin && <th></th>}
            </tr>
          </thead>
          <tbody>
            {filteredScores.map((s, index) => (
              <tr key={index}>
                <td>{s.subject_name}</td>
                <td>{s.semester_name}</td>
                <td>
                  {isAdmin ? (
                    <input
                      type="number"
                      value={s.score}
                      onChange={(e) => handleScoreChange(index, e.target.value)}
                    />
                  ) : (
                    <span>{s.score}</span>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <div className="score-actions">
                      <button onClick={() => updateScore(s.score_id, s.score)}>💾</button>
                      <button className="delete" onClick={() => deleteScore(s.score_id)}>❌</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"><strong>Trung bình</strong></td>
              <td>{averageScore}</td>
              {isAdmin && <td></td>}
            </tr>
          </tfoot>
        </table>
      )}

      {isAdmin && (
        <>
          <h4>➕ Thêm điểm</h4>
          <input
            type="number"
            placeholder="Mã môn"
            value={newScore.subject_id}
            onChange={(e) => setNewScore({ ...newScore, subject_id: e.target.value })}
          />
          <input
            type="number"
            placeholder="Mã học kỳ"
            value={newScore.semester_id}
            onChange={(e) => setNewScore({ ...newScore, semester_id: e.target.value })}
          />
          <input
            type="number"
            placeholder="Điểm"
            step="0.1"
            value={newScore.score}
            onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
          />
          <button onClick={addScore}>Thêm</button>
        </>
      )}
    </div>
  );
}

export default ScoreList;
