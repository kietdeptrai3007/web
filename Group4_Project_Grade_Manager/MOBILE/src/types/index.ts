export interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'user';
}

export interface Student {
  student_id: number;
  student_name: string;
  birth_year: number;
}

export interface Score {
  score_id: number;
  subject_name: string;
  semester_name: string;
  score: number;
}