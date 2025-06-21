import React from 'react';

function SimpleApp() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px',
      backgroundColor: '#f0f0f0'
    }}>
      <div>
        <h1>Hello from React!</h1>
        <p>If you can see this, React is working.</p>
      </div>
    </div>
  );
}

export default SimpleApp;
