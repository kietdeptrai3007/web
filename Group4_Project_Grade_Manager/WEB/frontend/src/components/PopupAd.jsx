import React, { useEffect, useState } from 'react';

function PopupAd() {
  const [visible, setVisible] = useState(false);

  /*useEffect(() => {
    const hasClosed = document.cookie.includes('popupClosed=true');
    if (hasClosed) return;*/

    useEffect(() => {
  // 👇 Tạm tắt cookie để test
      document.cookie = "popupClosed=; max-age=0";


    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000); // Hiện sau 5s

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Cookie tồn tại 7 ngày
    document.cookie = "popupClosed=true; max-age=" + 60 * 60 * 24 * 7;
  };

  if (!visible) return null;

  return (
    <div style={popupOverlay}>
      <div style={popupContent}>
        <img
          src="data:image/png;base64,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"
          alt="Popup quảng cáo"
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
        <button style={closeBtn} onClick={handleClose}>✖</button>
      </div>
    </div>
  );
}

// Style
const popupOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const popupContent = {
  position: 'relative',
  background: '#fff',
  padding: '10px',
  borderRadius: '12px',
  boxShadow: '0 0 15px rgba(0,0,0,0.2)',
  maxWidth: '400px',
};

const closeBtn = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer'
};

export default PopupAd;
