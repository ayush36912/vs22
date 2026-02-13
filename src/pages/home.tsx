import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Confetti from "react-confetti";

// Question Data
const questions = [
  {
    text: "If I’m angry and hungry at the same time… what should you do?",
    options: ["Say sorry", "Order food", "Both immediately"],
  },
  {
    text: "Who is more cute in this house?",
    options: ["Me", "Me", "Obviously me"],
  },
  {
    text: "If I say ‘I’m fine’… what does that mean?",
    options: ["I’m fine", "I’m not fine", "You are in danger"],
  },
  {
    text: "If I start a pillow fight at 2 AM, what do you do?",
    options: ["Run away 🏃♂️", "Fight back 🥊", "Accept your fate and lose 😆"],
  },
  {
    text: "Who controls the TV remote in this house?",
    options: ["Me 🤷♀️", "Me 🙃", "Obviously me 😎"],
  },
  {
    text: "If I say ‘Do whatever you want’… what does that mean?",
    options: [
      "I can really do anything 😳",
      "Big mistake 😅",
      "You are already in trouble 😏",
    ],
  },
  {
    text: "Why do you love me?",
    options: [
      "Because I’m beautiful 💃",
      "Because I’m cute 🥺",
      "Because I’m perfect and all of the above 😌",
    ],
  },
  {
    text: "If I leave clothes all over the floor… what do you do?",
    options: [
      "Pick them up 🙄",
      "Ignore and survive 🫣",
      "Pray for your life 😏",
    ],
  },
  {
    text: "If you had to choose again… would you marry me?",
    options: [
      "Yes ❤️",
      "Of course yes 😍",
      "I would marry you in every lifetime 💕",
    ],
  },
  {
    text: "Who is your Valentine?",
    options: [
      "My wife",
      "Roshni",
      "The most beautiful girl in world (which is me)",
    ],
  },
];

const Home = () => {
  const [gameState, setGameState] = useState<"START" | "QUIZ" | "SUCCESS">(
    "START",
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ballPositions, setBallPositions] = useState<{
    [key: number]: { top: string; left: string; position: "fixed" | "static" };
  }>({});
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Audio for success
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setGameState("QUIZ");
  };

  const handleWrongBallHover = (optionIndex: number) => {
    // Generate random positions using 80% of viewport to stay somewhat central but chaotic
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;

    setBallPositions((prev) => ({
      ...prev,
      [optionIndex]: {
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        position: "fixed",
      },
    }));
  };

  const handleCorrectOptionClick = () => {
    setIsCorrectSelected(true); // Turn green instantly
    setShowConfetti(true);
    setTimeout(() => {
      setIsCorrectSelected(false); // Reset for next question
      setShowConfetti(false);
      setBallPositions({}); // Reset positions

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameState("SUCCESS");
      }
    }, 3000);
  };

  useEffect(() => {
    if (gameState === "SUCCESS") {
      // Start a timer to show video after 6 seconds
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [gameState]);

  useEffect(() => {
    // Auto-play video when it shows up
    if (showVideo && videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, [showVideo]);

  return (
    <div
      className="vh-100 position-relative overflow-hidden d-flex flex-column justify-content-center align-items-center text-center p-3"
      style={{
        background:
          "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        backgroundSize: "cover",
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* START SCREEN */}
      {gameState === "START" && (
        <div
          className="card shadow-lg p-5 rounded-4 bg-white bg-opacity-75"
          style={{ maxWidth: "600px", backdropFilter: "blur(10px)" }}
        >
          <h1 className="display-4 fw-bold text-danger mb-4">Warning! ⚠️</h1>
          <p className="lead fw-bold mb-4 fs-3">
            “Choose wisely. This is a lifetime decision my Marigold.” 😂❤️
          </p>
          <button
            className="btn btn-danger btn-lg px-5 py-3 rounded-pill fw-bold shadow hover-scale"
            onClick={handleStart}
          >
            Start Challenge 🚀
          </button>
        </div>
      )}

      {/* QUIZ SCREEN */}
      {gameState === "QUIZ" && (
        <div className="container position-relative h-100 d-flex flex-column justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4 p-md-5 rounded-4 bg-white w-100 border-0"
            style={{ maxWidth: "800px", minHeight: "500px" }}
          >
            <div className="mb-5 border-bottom pb-3">
              <span className="text-muted fw-bold text-uppercase mb-2 d-block">
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
              <h2 className="display-6 fw-bold text-dark lh-base">
                {questions[currentQuestionIndex].text}
              </h2>
            </div>

            <div className="d-flex flex-column gap-3 w-100 px-md-4">
              {questions[currentQuestionIndex].options.map((option, index) => {
                // Options 0 and 1 are "Wrong" (A and B)
                // Option 2 is "Correct" (C)
                const isCorrect = index === 2;
                const labels = ["A", "B", "C"];
                const ballLabel = labels[index];
                const positionStyle = ballPositions[index] || {
                  position: "static",
                };

                // Condition to show green: It is the correct option AND it has been selected
                const showGreen = isCorrect && isCorrectSelected;

                return (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light transition-all"
                  >
                    {/* The Ball Container */}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        minWidth: "50px",
                      }}
                      className="d-flex align-items-center justify-content-center position-relative"
                    >
                      <button
                        className="btn rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 shadow-sm text-white"
                        style={{
                          width: "50px",
                          height: "50px",
                          position: positionStyle.position,
                          top: positionStyle.top,
                          left: positionStyle.left,
                          transition: isCorrect
                            ? "transform 0.2s, background-color 0.2s"
                            : "top 0.4s ease, left 0.4s ease, background-color 0.3s",
                          zIndex: positionStyle.position === "fixed" ? 1000 : 1,
                          // Change color to Green (#2ed573) if selected, else Red (#ff4757)
                          backgroundColor: showGreen ? "#2ed573" : "#ff4757",
                          border: "2px solid white",
                          // Pulse if correct but NOT yet selected (hint mode)
                          animation:
                            isCorrect && !isCorrectSelected
                              ? "pulse 1.5s infinite"
                              : "none",
                          boxShadow: showGreen
                            ? "0 0 20px #2ed573" // Strong green glow on success
                            : isCorrect
                              ? "0 0 10px rgba(255, 71, 87, 0.4)"
                              : "none",
                        }}
                        onMouseEnter={() =>
                          !isCorrect && handleWrongBallHover(index)
                        }
                        onTouchStart={() =>
                          !isCorrect && handleWrongBallHover(index)
                        }
                        onClick={
                          isCorrect ? handleCorrectOptionClick : undefined
                        }
                        disabled={isCorrectSelected} // Disable clicks during success animation
                      >
                        {showGreen ? "✔" : ballLabel}
                      </button>
                    </div>

                    {/* The Option Text (Fixed) */}
                    <div
                      className={`text-start flex-grow-1 p-3 border rounded-3 shadow-sm transition-all ${showGreen ? "bg-success-subtle border-success" : "bg-light"}`}
                    >
                      <span
                        className={`fs-5 fw-medium ${showGreen ? "text-success" : "text-dark"}`}
                      >
                        {option}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {gameState === "SUCCESS" && (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={true}
            numberOfPieces={200}
          />

          {!showVideo && (
            <div
              className="card shadow-lg p-5 text-center rounded-4 bg-white bg-opacity-75 m-3"
              style={{
                maxWidth: "700px",
                backdropFilter: "blur(5px)",
                zIndex: 10,
              }}
            >
              <h1 className="display-4 fw-bold text-danger mb-4">
                Congratulations! 🎉
              </h1>
              <p className="lead fw-bold mb-0 fs-3">
                “Congratulations! You survived Valentine’s questions… for now.{" "}
                <br />
                Lifetime subscription activated. <br />
                No refunds!” 😂❤️
              </p>
            </div>
          )}

          {showVideo && (
            <div
              className="position-absolute w-100 h-100 top-0 start-0"
              style={{ zIndex: 0 }}
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                className="w-40 h-80 object-fit-cover"
              >
                <source src="temp.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}

      {/* Global CSS for Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
