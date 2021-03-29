import './App.css';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

const Apps = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #000000;
`

const Container = styled.div`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
`

const Time = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #ffffff;
  font-size: 200px;
  margin-bottom: 50px;
`

const Button = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Play = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    margin-right: 10px;
    font-size: 25px;
    background-color: ${props => props.active? "#b3b3b3" : "#99ff99"};
    color: #ffffff;
    outline: none;
`

const Stop = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    margin-right: 10px;
    font-size: 25px;
    background-color: ${props => props.active ? "#b3b3b3" : "#99ccff"};
    color: #ffffff;
    outline: none;
`

const Reset = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    margin-right: 10px;
    font-size: 25px;
    background-color: #ff9999;
    color: #ffffff;
    outline: none;
    &:active {
      background-color: #b3b3b3;
    }
`

const formatTime = (second) => {
  const minuteRef = (second/60).toString().split('.')[0].padStart(2, "0");
  const secondRef = (second%60).toString().split('.')[0].padStart(2, "0");

  return `${minuteRef}:${secondRef}`;
};

function App() {
  const [act, setAct] = useState("pause");
  const [time, setTime] = useState(1500);
  const refTime = useRef(null);

  useEffect(() => {
    console.log("chay eff");
    let interval;
    let currentSecond = time;
    if (act === "run" && time > 0) {
      interval = setInterval(() => {
        if (refTime !== null && currentSecond > 0) {
          currentSecond -= 1;
          refTime.current.dataset.time = currentSecond;
          refTime.current.innerHTML = formatTime(currentSecond);
          
        }
      }, 1000)
    } 
    if (act === "pause") {
      const second = refTime.current.dataset.time;
      setTime(second);
    }
    if (act === "reset") {
      refTime.current.innerHTML = formatTime(time);
      setTime(1500);
    }
    return () => {
      console.log("chay clean up");
      if (interval) { 
        clearInterval(interval);
      }
    }
  }, [act]);

  return (
    <Apps>
      <Container>
        <Time>
          <div ref={refTime} data-time={time}>{formatTime(time)}</div>
        </Time>
        <Button>
          <Play disabled={act==="run"} active={act==="run"} onClick={() => setAct("run")}>Play</Play>
          <Stop disabled={act==="pause" || act==="reset"} active={act==="pause" || act==="reset"} onClick={() => setAct("pause")}>Pause</Stop>
          <Reset onClick={() => setAct("reset")}>Reset</Reset>
        </Button>
      </Container>
    </Apps>
  );
}

export default App;
