import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatWidget = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000,
      cursor: 'pointer'
    }}>
      <div style={{
        backgroundColor: 'var(--color-primary)',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
        color: 'white',
        transition: 'transform 0.3s ease',
      }}
      className="chat-btn"
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={28} />
      </div>
    </div>
  );
};

export default ChatWidget;
