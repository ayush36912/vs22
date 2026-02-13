import { useState, CSSProperties, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Confetti from "react-confetti";

const Home = () => {
  const [noBtnPosition, setNoBtnPosition] = useState({
    top: "auto",
    left: "auto",
    position: "static",
  });
  const [yesSize, setYesSize] = useState(1);
  const [isYesClicked, setIsYesClicked] = useState(false);

  // Import the image (placeholder)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const familyImg = require("../assets/img/family_placeholder.svg").default;

  const moveNoButton = () => {
    const newTop = Math.random() * 80 + 10; // Random between 10% and 90%
    const newLeft = Math.random() * 80 + 10;
    setNoBtnPosition({
      top: `${newTop}%`,
      left: `${newLeft}%`,
      position: "fixed",
    });
  };

  const handleYesClick = () => {
    setIsYesClicked(true);
  };

  return (
    <div
      className="vh-100 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${familyImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Video Container */}
      <div
        className={`position-absolute w-100 h-100 d-flex justify-content-center align-items-center ${isYesClicked ? "visible" : "invisible"
          }`}
        style={{ zIndex: 0, transition: "visibility 0s 1s" }}
      >
        {isYesClicked && (
          <>
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={true}
              numberOfPieces={500}
              gravity={0.3}
            />
            <video
              autoPlay
              loop
              muted
              className="w-100 h-100 object-fit-cover"
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
                // objectFit: "cover",
              }}
            >
              <source src="jetha.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}
      </div>

      {/* Left Curtain */}
      <div
        className="position-absolute h-100 bg-danger"
        style={{
          top: 0,
          left: 0,
          width: "50%",
          background:
            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
          transform: isYesClicked ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 1.5s ease-in-out",
          zIndex: 10,
        }}
      />

      {/* Right Curtain */}
      <div
        className="position-absolute h-100 bg-danger"
        style={{
          top: 0,
          right: 0,
          width: "50%",
          background:
            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
          transform: isYesClicked ? "translateX(100%)" : "translateX(0)",
          transition: "transform 1.5s ease-in-out",
          zIndex: 10,
        }}
      />

      {/* Content Overlay */}
      <div
        className={`position-absolute top-50 start-50 translate-middle text-center w-100 ${isYesClicked ? "opacity-0" : "opacity-100"
          }`}
        style={{
          zIndex: 20,
          transition: "opacity 0.5s ease-out",
          pointerEvents: isYesClicked ? "none" : "auto",
        }}
      >
        <div
          className="card shadow-lg p-5 d-inline-block rounded-3 bg-white bg-opacity-75"
          style={{ maxWidth: "800px", backdropFilter: "blur(5px)" }}
        >
          <h1 className="display-4 text-danger fw-bold mb-5">
            Will you be my Valentine Zeel ( Titli )?? 🌹
          </h1>

          <div
            className="d-flex justify-content-center align-items-center gap-4 position-relative"
            style={{ minHeight: "100px" }}
          >
            <button
              className="btn btn-success fw-bold text-uppercase shadow"
              style={{
                fontSize: `${1.5 * yesSize}rem`,
                padding: `${10 * yesSize}px ${20 * yesSize}px`,
                transition: "all 0.3s ease",
                transform: `scale(${yesSize})`,
              }}
              onClick={handleYesClick}
              onMouseEnter={() => setYesSize((s) => (s < 1.5 ? s + 0.1 : s))}
            >
              Yes! 😍
            </button>

            <button
              className="btn btn-outline-secondary rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-white"
              style={{
                width: "80px",
                height: "80px",
                transition: "all 0.3s ease",
                position: (noBtnPosition.position === "fixed"
                  ? "fixed"
                  : "relative") as any, // Cast to any to avoid strict type checks on position
                top:
                  noBtnPosition.position === "fixed"
                    ? noBtnPosition.top
                    : "auto",
                left:
                  noBtnPosition.position === "fixed"
                    ? noBtnPosition.left
                    : "auto",
                zIndex: 30,
              }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No 😢
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
