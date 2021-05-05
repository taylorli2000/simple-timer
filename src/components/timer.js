import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import Alarm from "../assets/alarm.wav";

const MAXTIME = 359999; //99 hours 59 minutes 59 seconds

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const displayTime = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor((seconds % 3600) % 60),
  };

  function resetTimer() {
    setSeconds(0);
  }

  function toggleRunning() {
    setRunning((prevRunning) => !prevRunning);
  }

  function incrementSeconds(value) {
    if (seconds + value > MAXTIME) {
      setSeconds(359999);
    } else {
      setSeconds((prevSeconds) => prevSeconds + value);
    }
  }

  function decrementSeconds(value) {
    if (seconds - value < 0) {
      setSeconds(0);
    } else {
      setSeconds((prevSeconds) => prevSeconds - value);
    }
  }

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(() => {
        if (seconds === 1) {
          toggleRunning();
          new Audio(Alarm).play();
        }
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [seconds, running]);

  return (
    <Card className="text-center">
      <Card.Body>
        {!running && (
          <ButtonGroup size="lg" style={{ minWidth: "200px" }}>
            <Button
              className="mr-3"
              variant="primary"
              onClick={() => {
                incrementSeconds(3600);
              }}
            >
              +
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                incrementSeconds(60);
              }}
            >
              +
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              onClick={() => {
                incrementSeconds(1);
              }}
            >
              +
            </Button>
          </ButtonGroup>
        )}

        <h2
          className="mb-4 mt-4"
          style={{
            fontSize: "50px",
          }}
        >
          {displayTime.hours} : {displayTime.minutes} : {displayTime.seconds}
        </h2>

        {!running && (
          <ButtonGroup size="lg" style={{ minWidth: "200px" }}>
            <Button
              className="mr-3"
              variant="danger"
              onClick={() => {
                decrementSeconds(3600);
              }}
            >
              -
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                decrementSeconds(60);
              }}
            >
              -
            </Button>
            <Button
              className="ml-3"
              variant="danger"
              onClick={() => {
                decrementSeconds(1);
              }}
            >
              -
            </Button>
          </ButtonGroup>
        )}

        {(!running && (
          <div className="mt-4">
            <ButtonGroup size="lg" style={{ minWidth: "200px" }}>
              <Button
                disabled={seconds === 0}
                variant="secondary"
                onClick={toggleRunning}
              >
                Start
              </Button>
              <Button
                disabled={seconds === 0}
                className="ml-4"
                variant="secondary"
                onClick={resetTimer}
              >
                Reset
              </Button>
            </ButtonGroup>
          </div>
        )) || (
          <div className="mt-4">
            <Button variant="secondary" size="lg" onClick={toggleRunning}>
              Stop
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
