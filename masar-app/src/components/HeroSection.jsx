import {
  HiOutlineRocketLaunch,
  HiOutlineArrowLeft,
  HiOutlinePlay,
} from "react-icons/hi2";
import { useEffect, useState } from "react";

const HeroSection = ({ onStartJourney }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      // Use requestAnimationFrame to optimize scroll handling
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center bg-[#010C1D]"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      {/* Background Cinematic Effects - Parallax Wrapper */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {/* Soft glowing shifting light gradients (Blue & Purple) */}
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#146EEC] rounded-full blur-[150px] animate-glow-shift mix-blend-screen" />
        <div
          className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] bg-[#6D28D9] rounded-full blur-[150px] animate-glow-shift mix-blend-screen"
          style={{ animationDelay: "-6s" }}
        />

        {/* Background Image Lines with Slow Wave Animation */}
        <div
          className="absolute inset-0 opacity-[0.15] bg-center bg-no-repeat bg-cover animate-wave-flow"
          style={{ backgroundImage: "url('/images/bg-lines.png')" }}
        />

        {/* Thin glowing lines that animate across */}
        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#146EEC] to-transparent opacity-0 animate-laser-sweep" />
        <div
          className="absolute top-[65%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6D28D9] to-transparent opacity-0 animate-laser-sweep"
          style={{ animationDelay: "4s" }}
        />

        {/* Small floating particles (Low Opacity) */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#AFDDFF]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `particleFloat ${8 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content — max-width from Figma: 1123px */}
      <div className="max-w-[1123px] mx-auto px-6 w-full relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right side — Text */}
          <div className="order-2 lg:order-1 text-right">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#146EEC]/30 bg-[#146EEC]/5 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(20,110,236,0.1)]">
              <HiOutlineRocketLaunch className="w-5 h-5 text-[#146EEC]" />
              <span className="text-[#146EEC] text-sm font-semibold">
                مستقبل مخصص لك
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.3] mb-6 text-white drop-shadow-md">
              <span className="block">ارسم مسارك</span>
              <span className="block">
                المهني{" "}
                <span className="text-[#146EEC] drop-shadow-[0_0_15px_rgba(20,110,236,0.4)]">
                  بذكاء
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-10 max-w-[500px]">
              مسار يساعدك على اكتشاف شغفك، وبناء خريطة طريق مخصصة لك، والوصول
              إلى الاحتراف من خلال رحلة تعليمية منظمة تدعمها أحدث تقنيات
              التعليم.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onStartJourney) onStartJourney();
                }}
                className="inline-flex items-center justify-center gap-3 border border-[#FFCF23] bg-transparent text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 hover:bg-[#FFCF23]/10 group shadow-[0_0_15px_rgba(255,207,35,0.15)]"
              >
                <span>ابدأ رحلتك</span>
                <HiOutlineArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-3 bg-[#1E293B]/80 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 hover:bg-[#2e3e57] border border-white/5"
              >
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  <HiOutlinePlay className="w-3 h-3 text-white ml-0.5" />
                </div>
                <span>كيف يعمل مسار؟</span>
              </a>
            </div>
          </div>

          {/* Left side — Illustration */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-center mb-8 lg:mb-0">
            {/* Subtle Light Pulse Behind Laptop */}
            <div className="absolute inset-0 m-auto w-[60%] h-[60%] bg-[#146EEC]/20 rounded-full blur-[80px] animate-pulse-glow z-0" />

            <img
              src="/images/hero.png"
              alt="شخص يبرمج"
              className="w-full max-w-[520px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 animate-float"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
