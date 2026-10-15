import { useState, useEffect } from 'react';
import { lights } from './trafficLightConfig';

function App() {
  debugger
  const [index, setIndex] = useState(0); // which light is on
  const [running, setRunning] = useState(false); // tells lights are running or not 
  const [timeLeft, setTimeLeft] = useState(lights[0].duration); // calculates the time 

  const current = lights[index];

  // Change light after its duration, and show countdown
  useEffect(() => {
    if (!running) return;

    // reset countdown whenever light changes
    setTimeLeft(current.duration);

    // countdown every 1 second
    const countdownId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    // move to next light after duration
    const timeoutId = setTimeout(() => {
      setIndex((i) => (i + 1) % lights.length);
    }, current.duration * 1000);

    // cleanup: clear timers on stop, light change, or unmount
    return () => {
      clearInterval(countdownId);
      clearTimeout(timeoutId);
    };
  }, [running, index]);
  

  function handleStart() {
    debugger
    setRunning(true);
  }

  function handleStop() {
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setIndex(0);
    setTimeLeft(lights[0].duration);
  }

  return (
    <div className="app">
      <h1>Traffic Light</h1>

      <p>
      
        Active: <b>{current.name}</b> | Time left: <b>{timeLeft}s</b>
      </p>

      <div className="box">
        {lights.map((light, i) => (
          <div
            key={light.name}
            className="light"
            style={{
              backgroundColor: i === index ? light.color : '#333',
            }}
          />
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleStart} disabled={running}>
          Start
        </button>
        <button onClick={handleStop} disabled={!running}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
