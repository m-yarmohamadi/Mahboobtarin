import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen transition-all duration-1000 ease-in-out">
      <img
        src="/images/logo.png" 
        alt="Logo"
        className={` w-72 transition-opacity duration-50 ${visible ? 'opacity-100' : 'opacity-50'}`}
      />
    </div>
  );
};

export default LoadingPage;