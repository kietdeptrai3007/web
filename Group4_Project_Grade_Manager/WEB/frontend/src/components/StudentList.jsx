import React, { useEffect, useState } from 'react';
import ScoreList from './ScoreList';
import './Home.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState('');
  const [newBirthYear, setNewBirthYear] = useState(2004);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBirthYear, setEditBirthYear] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      alert('Không thể tải danh sách học sinh');
    }
  };

  const addStudent = async () => {
    if (!newName.trim()) return alert('Vui lòng nhập tên học sinh');

    try {
      const res = await fetch('http://localhost:5001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: newName, birth_year: newBirthYear }),
      });
      if (res.ok) {
        fetchStudents();
        setNewName('');
        setNewBirthYear(2004);
      } else {
        alert('Lỗi khi thêm học sinh');
      }
    } catch (err) {
      alert('Lỗi server khi thêm học sinh');
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Xác nhận xoá học sinh này?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/students/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchStudents();
      } else {
        alert('Lỗi khi xoá học sinh');
      }
    } catch (err) {
      alert('Lỗi server');
    }
  };

  const startEditing = (student) => {
    setEditingId(student.student_id);
    setEditName(student.student_name);
    setEditBirthYear(student.birth_year);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditBirthYear('');
  };

  const updateStudent = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/students/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: editName, birth_year: editBirthYear }),
      });
      if (res.ok) {
        fetchStudents();
        cancelEdit();
      } else {
        alert('Lỗi khi cập nhật học sinh');
      }
    } catch (err) {
      alert('Lỗi server khi cập nhật');
    }
  };

  return (
    <div className="student-container">
      <div className="student-list">
        <h2>Danh sách học sinh</h2>
        {students.map((s, index) => (
          <div key={s.student_id} className="student-item">
            {editingId === s.student_id ? (
              <>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input value={editBirthYear} onChange={(e) => setEditBirthYear(e.target.value)} />
                {isAdmin && (
                  <div className="action-buttons">
                    <button className="btn-save" onClick={updateStudent}>💾</button>
                    <button className="btn-cancel" onClick={cancelEdit}>❌</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="student-name">
                  {index + 1}. {s.student_name} ({s.birth_year})
                </div>
                <div className="action-buttons">
                  {isAdmin && (
                    <>
                      <button className="btn-delete" onClick={() => deleteStudent(s.student_id)}>❌</button>
                      <button className="btn-edit" onClick={() => startEditing(s)}>✏️</button>
                    </>
                  )}
                  <button className="btn-view" onClick={() => setSelectedStudentId(s.student_id)}>📘 Xem điểm</button>
                </div>
              </>
            )}
          </div>
        ))}

        {isAdmin && (
          <div>
            <h3>➕ Thêm học sinh mới</h3>
            <input
              type="text"
              placeholder="Tên học sinh"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              value={newBirthYear}
              onChange={(e) => setNewBirthYear(Number(e.target.value))}
            />
            <button onClick={addStudent}>Thêm</button>
          </div>
        )}
      </div>

      <div className="score-section">
        {selectedStudentId && <ScoreList studentId={selectedStudentId} />}
      </div>
    </div>
  );
}

export default StudentList;
