import React from 'react';

const Home = () => {
  return (
    <div>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        Welcome to the Home Page
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          color: '#333',
          textAlign: 'center',
          marginTop: '1rem',
        }}
      >
        This is a sample React application using Tailwind CSS.
      </p>
    </div>
  );
};

export default Home;
