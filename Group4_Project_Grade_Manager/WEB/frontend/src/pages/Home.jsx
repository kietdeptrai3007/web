import React from 'react';
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

function Home() {
  const contentId = 1; // ví dụ gán cứng để test
  const userId = 1;     // ví dụ user đang đăng nhập

  return (
    <div>
      <h1>Trang chủ</h1>
      <Link to="/login">Đăng nhập</Link> | <Link to="/about">Giới thiệu</Link>

      <hr />

      {/* Bình luận cho nội dung có id = 1 */}
      <CommentSection contentId={contentId} userId={userId} />
    </div>
  );
}

export default Home;
