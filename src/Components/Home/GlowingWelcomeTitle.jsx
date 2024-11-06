import React, { useEffect, useState } from 'react';

const GlowingWelcomeTitle = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      <style>{`
        .title-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-in, transform 1s ease-out;
        }

        .title-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .glow-text {
          color: white;
          font-weight: bold;
          letter-spacing: 7px;
          cursor: pointer;
          animation: glow 1s ease-in-out infinite alternate;
        }
        
        .glow-text span {
          display: inline-block;
        }
        
        @keyframes glow {
          from {
            text-shadow: 0 0 10px #fff, 
                         0 0 20px #fff, 
                         0 0 30px #2563eb, 
                         0 0 40px #2563eb, 
                         0 0 50px #2563eb, 
                         0 0 60px #2563eb, 
                         0 0 70px #2563eb;
          }
          
          to {
            text-shadow: 0 0 20px #fff, 
                         0 0 30px #3b82f6, 
                         0 0 40px #3b82f6, 
                         0 0 50px #3b82f6, 
                         0 0 60px #3b82f6, 
                         0 0 70px #3b82f6, 
                         0 0 80px #3b82f6;
          }
        }

        .welcome-text {
          display: block;
          position: relative;
          font-size: 5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      
      <div className={`title-container ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-5xl font-bold text-white font-sans">
          <span className="welcome-text">
            <h1 className="glow-text mt-2">
              <span>Welcome to MedManage</span>
            </h1>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default GlowingWelcomeTitle;