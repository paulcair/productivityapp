import React, { useState, useEffect } from 'react'
import alarmSound from './alarm.mp3'

function Timer({ initialTime, onTimerEnd }) {
    const [time, setTime] = useState(initialTime*60)
    const [isPaused, setIsPaused] = useState(false);

    const playAlarm = () => {
        const audio = new Audio(alarmSound)
        audio.play()
    }

    useEffect(()=>{
        setTime(initialTime*60)
    },[initialTime])


    useEffect(() => {
       
       let intervalId

       if (!isPaused){
        
            if (initialTime > 0) {
                intervalId = setInterval(() => {
                    setTime((prevTime) => {
                        if(prevTime>0) {
                            return prevTime - 1
                        } else {
                            clearInterval(intervalId)
                            playAlarm()
                            onTimerEnd()
                            return 0
                        }
                    })
                }, 1000)
            } else {
                onTimerEnd()
            }
            return () => clearInterval(intervalId)
        }
    }, [initialTime,isPaused, onTimerEnd])
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    const handlePauseResume = () => {
        setIsPaused((prevIsPaused) => !prevIsPaused)
      }
  
    return (
      <div className='border-b border-gray-300'>
        <h1 className="text-center text-5xl font-bold mb-4 mt-4 border border-gray-300 background-gray">{formatTime(time)}</h1>
        <div className="flex justify-center pb-5">
            <button onClick={handlePauseResume} className="btn">
            {isPaused ? 'Resume' : 'Pause'}
            </button>
        </div>
      </div>
    )
  }

export default Timer