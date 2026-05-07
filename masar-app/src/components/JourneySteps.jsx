import {
  robotImage,
  ringsImage,
  titleFrameImage,
  cardYellowImage,
  cardBeigeImage,
} from "../assets/Images";

const IMAGES = {
  robot: robotImage,
  rings: ringsImage,
  titleFrame: titleFrameImage,
  cardYellow: cardYellowImage,
  cardBeige: cardBeigeImage,
};

const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-18px); }
  }

  @keyframes slideFromLeft {
    0% { opacity: 0; transform: translateX(-120px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideFromRight {
    0% { opacity: 0; transform: translateX(120px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  .card-left.visible {
    animation: slideFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .card-right.visible {
    animation: slideFromRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .card-left, .card-right {
    opacity: 0;
  }
`;

import { useEffect, useRef } from "react";

export default function JourneySteps() {
  const sectionRef = useRef(null);
  const cardLeftRef = useRef(null);
  const cardRightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardLeftRef.current)
                cardLeftRef.current.classList.add("visible");
            }, 100);
            setTimeout(() => {
              if (cardRightRef.current)
                cardRightRef.current.classList.add("visible");
            }, 300);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{style}</style>
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{
          marginTop: "40px",
          marginBottom: "60px",
          background: "#101822",
        }}
        dir="rtl"
      >
        <div
          className="relative w-full flex items-center justify-center"
          style={{ minHeight: "100vh", background: "#101822" }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 65%, #162236 0%, #101822 70%)",
            }}
          />

          {/* Main content */}
          <div
            className="relative w-full max-w-4xl mx-auto flex flex-col items-center px-6 py-16"
            style={{ gap: 0 }}
          >
            {/* Title frame */}
            <div
              className="relative w-full mb-10"
              style={{ maxWidth: "800px" }}
            >
              <img
                src={IMAGES.titleFrame}
                alt=""
                className="w-full h-auto"
                draggable={false}
              />
            </div>

            {/* Two cards side by side */}
            <div
              className="relative w-full flex justify-between items-start mb-6"
              style={{ width: "100%", maxWidth: "850px" }}
            >
              {/* Right card - slides in from right */}
              <div
                ref={cardRightRef}
                className="card-right relative"
                style={{ width: "48%" }}
              >
                <img
                  src={IMAGES.cardBeige}
                  alt=""
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>

              {/* Left card - slides in from left */}
              <div
                ref={cardLeftRef}
                className="card-left relative"
                style={{ width: "48%" }}
              >
                <img
                  src={IMAGES.cardYellow}
                  alt=""
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>
            </div>

            {/* Robot + rings */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: "100%" }}
            >
              {/* Rings */}
              <div
                className="absolute"
                style={{
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  zIndex: 1,
                }}
              >
                <img
                  src={IMAGES.rings}
                  alt=""
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>

              {/* Floating robot */}
              <div
                className="robot-float relative"
                style={{ zIndex: 2, width: "55%" }}
              >
                <img
                  src={IMAGES.robot}
                  alt=""
                  className="w-full h-auto"
                  style={{
                    filter: "drop-shadow(0 20px 60px rgba(0,150,255,0.35))",
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
