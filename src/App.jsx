import { useEffect, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");

  // Stopwatch
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // Timer
  const [timerInput, setTimerInput] = useState(60);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Reset animation
  const [resetAnimating, setResetAnimating] = useState(false);

  // Stopwatch Logic
  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  // Timer Logic
  useEffect(() => {
    let interval;

    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && timerRunning) {
      setTimerRunning(false);
      alert("⏰ Time Finished!");
    }

    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  // Format Function
  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset animation
  const triggerResetAnimation = () => {
    setResetAnimating(true);

    setTimeout(() => {
      setResetAnimating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 flex justify-center items-center p-6">

      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] shadow-2xl p-8 text-white">

        <h1 className="text-5xl font-bold text-center mb-10">
          ⏱ Stopwatch & Timer
        </h1>

        {/* Tabs */}

        <div className="flex gap-4 mb-10">

          <button
            onClick={() => setActiveTab("stopwatch")}
            className={`flex-1 py-4 rounded-2xl font-bold text-xl transition ${
              activeTab === "stopwatch"
                ? "bg-purple-600"
                : "bg-slate-700"
            }`}
          >
            Stopwatch
          </button>

          <button
            onClick={() => setActiveTab("timer")}
            className={`flex-1 py-4 rounded-2xl font-bold text-xl transition ${
              activeTab === "timer"
                ? "bg-purple-600"
                : "bg-slate-700"
            }`}
          >
            Timer
          </button>

        </div>

        {/* Stopwatch */}

        {activeTab === "stopwatch" && (

          <div>

            <div className="text-center text-8xl font-bold mb-12">

              {formatTime(seconds)}

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setRunning(true)}
                className={`flex-1 py-4 rounded-2xl text-xl transition-all duration-300 ${
                  running
                    ? "bg-green-500 shadow-[0_0_25px_rgba(34,197,94,.8)] scale-105"
                    : "bg-green-500"
                }`}
              >
                {running ? "⏸ Running" : "▶ Start"}
              </button>

              <button
                onClick={() => setRunning(false)}
                className={`flex-1 py-4 rounded-2xl text-xl transition-all duration-300 ${
                  !running
                    ? "bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,.8)]"
                    : "bg-yellow-500"
                }`}
              >
                ⏸ Pause
              </button>

              <button
                onClick={() => {

                  if (seconds > 0) {
                    triggerResetAnimation();
                  }

                  setRunning(false);
                  setSeconds(0);

                }}
                className="flex-1 bg-red-500 py-4 rounded-2xl text-xl"
              >
                <span
                  className={
                    resetAnimating
                      ? "inline-block animate-spin"
                      : "inline-block"
                  }
                >
                  ↻
                </span>

                {" "}Reset
              </button>

            </div>

          </div>
        )}

        {/* Timer */}

        {activeTab === "timer" && (

          <div>

            <div className="flex justify-center items-center gap-5 mb-10">

              <button
                onClick={() => {
                  if (timerInput > 10) {
                    setTimerInput((prev) => prev - 10);
                    setTimer((prev) => prev - 10);
                  }
                }}
                className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400 text-4xl"
              >
                −
              </button>

              <div className="bg-white/10 px-8 py-6 rounded-3xl">

                <input
                  type="number"
                  value={timerInput}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    setTimerInput(value);
                    setTimer(value);
                  }}
                  className="bg-transparent text-center text-5xl text-white w-28 outline-none"
                />

                <p className="text-center text-gray-400">
                  Seconds
                </p>

              </div>

              <button
                onClick={() => {
                  setTimerInput((prev) => prev + 10);
                  setTimer((prev) => prev + 10);
                }}
                className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400 text-4xl"
              >
                +
              </button>

            </div>

            <div className="w-80 h-80 mx-auto rounded-full border-[8px] border-purple-500 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,.7)] mb-10">

              <div className="text-center">

                <div className="text-7xl font-bold">
                  {formatTime(timer)}
                </div>

                <p className="text-gray-400 mt-2">
                  HH : MM : SS
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setTimerRunning(true)}
                className={`flex-1 py-4 rounded-2xl text-xl transition-all duration-300 ${
                  timerRunning
                    ? "bg-green-500 shadow-[0_0_25px_rgba(34,197,94,.8)] scale-105"
                    : "bg-green-500"
                }`}
              >
                {timerRunning ? "⏸ Running" : "▶ Start"}
              </button>

              <button
                onClick={() => setTimerRunning(false)}
                className={`flex-1 py-4 rounded-2xl text-xl transition-all duration-300 ${
                  !timerRunning
                    ? "bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,.8)]"
                    : "bg-yellow-500"
                }`}
              >
                ⏸ Pause
              </button>

              <button
                onClick={() => {

                  if (timer !== timerInput) {
                    triggerResetAnimation();
                  }

                  setTimerRunning(false);
                  setTimer(timerInput);

                }}
                className="flex-1 bg-red-500 py-4 rounded-2xl text-xl"
              >
                <span
                  className={
                    resetAnimating
                      ? "inline-block animate-spin"
                      : "inline-block"
                  }
                >
                  ↻
                </span>

                {" "}Reset

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;