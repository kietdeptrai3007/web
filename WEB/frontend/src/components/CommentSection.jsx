import React, { useState, useEffect } from 'react';

function CommentSection({ contentId, userId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);

  // Load bình luận
  useEffect(() => {
    fetch(`http://localhost:5001/api/comments/${contentId}`)
      .then(res => res.json())
      .then((data) => {
  console.log("API data:", data); // kiểm tra trong console
  setComments(Array.isArray(data) ? data : []);
})

      .catch(err => console.error('❌ Lỗi khi lấy bình luận:', err));
  }, [contentId]);

  // Gửi bình luận
  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      user_id: userId,
      content_id: contentId,
      comment: commentText,
      rating: parseInt(rating),
    };

    fetch('http://localhost:5001/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server lỗi khi ghi bình luận');
        return res.json();
      })
      .then((data) => {
        console.log('✅ Gửi bình luận:', data);
        setCommentText('');
        setRating(5);
        // Reload bình luận sau khi gửi
        return fetch(`http://localhost:5001/api/comments/${contentId}`);
      })
      .then(res => res.json())
      .then(data => setComments(data))
      .catch((err) => {
        console.error('❌ Lỗi gửi bình luận:', err);
      });
  };

  return (
    <div>
      <h2>Đánh giá & Bình luận</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Điểm đánh giá (1–5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Bình luận:
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Gửi</button>
      </form>

      <ul>
        {Array.isArray(comments) &&
  comments.map((c, idx) => (
    <li key={idx}>
      <strong>⭐ {c.rating}</strong> - {c.comment}
    </li>
))}

      </ul>
    </div>
  );
}

export default CommentSection;
