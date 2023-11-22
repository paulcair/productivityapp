import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimerEnd }) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
      if (time > 0) {
        const intervalId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
  
        return () => clearInterval(intervalId);
      } else {
        onTimerEnd();
      }
    }, [time, onTimerEnd]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    return (
      <div>
        <h1 className="text-center text-5xl font-bold mb-4 mt-4">{formatTime(time)}</h1>
        {/* You can style the timer as needed */}
      </div>
    );
  };
  

export default Timer