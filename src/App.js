import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const ref = useRef(false);

  //componentDidMount
  useEffect(() => {
    console.log('first render');

    //componentWillUnmount
    return () => {
      console.log('unmount');
    }
  }, []);

  //componentDidUpdate
  useEffect(() => {

    //чтобы не выполнялся первичный рендер
    if (!ref.current) {
      ref.current = true
      return;
    }
    console.log('time is changed')
  }, [time]);

  const startTimer = useCallback(() => {

    if (intervalId) {
      return;
    }
    const id = setInterval(() => {
      setTime(time => time + 1)
    }, 1000);

    setIntervalId(id);
  }, [intervalId]);

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  const resetTimer = () => {
    setTime(0);
  }



  return (
    <div className="App">
      <h2>Time {time}</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

//реализация shouldComponentUpdate
export default React.memo(App, (props, nextProps) => {
  if (props.prop1 !== nextProps.prop1) {
    return true
  }
  return false
});
