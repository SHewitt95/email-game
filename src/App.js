import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

function App() {
  const [counter, setCounter] = useState(10);

  useInterval(() => {
    const random = Math.random();
    const FIRST_THRESHOLD = 0.00 < random && random < 0.20;
    const SECOND_THRESHOLD = 0.20 < random && random < 0.70;
    const THIRD_THRESHOLD = 0.70 < random && random < 0.95;
    const FOURTH_THRESHOLD = 0.95 < random && random < 1.0;
    if (FIRST_THRESHOLD) {
      // do nothing
    } else if (SECOND_THRESHOLD) {
      setCounter(counter + 1);
    } else if (THIRD_THRESHOLD) {
      setCounter(counter + 10);
    } else if (FOURTH_THRESHOLD) {
      setCounter(counter + 100);
    }
  }, 1000);

  return (
    <>
      <button onClick={() => setCounter(() => {
        if (counter === 0) return 0;
        return counter - 1;
      })}>Read Email</button>
      <p>Unread Emails: {counter}</p>
    </>
  );
}

export default App;
