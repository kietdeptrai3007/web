import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.8:5001/api'; // <-- Nhớ thay IP của bạn

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User
export const loginUser = (data: any) => api.post('/users/login', data);
export const registerUser = (data: any) => api.post('/users/register', data);

// Students (Admin)
export const getStudents = () => api.get('/students');
export const addStudent = (data: { student_name: string; birth_year: number }) => api.post('/students', data);
export const deleteStudent = (id: number) => api.delete(`/students/${id}`);

// Scores (Admin)
export const getScoresByStudentId = (studentId: number) => api.get(`/scores/${studentId}`);
export const addScore = (data: any) => api.post('/scores', data);
export const updateScore = (scoreId: number, data: any) => api.put(`/scores/${scoreId}`, data);
export const deleteScore = (scoreId: number) => api.delete(`/scores/${scoreId}`);

// Feedback
export const submitFeedback = (data: any) => api.post('/feedback', data);
export const getSubjects = () => api.get('/subjects');
export const getSemesters = () => api.get('/semesters');
export const sendNotification = (data: { sender_id: number; recipient_id: number; message: string; }) => api.post('/notifications', data);
export const getNotifications = (userId: number) => api.get(`/notifications/${userId}`);

export default api;