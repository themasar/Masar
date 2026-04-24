import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 175;
const currentFrame = (index) => `/frames/frame_${index.toString().padStart(4, "0")}.jpg`;

export default function JourneySteps() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const currentFrameRef = useRef(1);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoaded(loadedCount);
            if (loadedCount === FRAME_COUNT) {
                 requestAnimationFrame(() => drawFrame(1, imgs));
            }
        };
        imgs.push(img);
    }
    setImages(imgs);
  }, []);

  const drawFrame = (index, imgsArray = images) => {
      if (!canvasRef.current || !imgsArray[index - 1] || imgsArray[index - 1].naturalWidth === 0) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Fixed internal resolution based on the video source
      canvas.width = 1280;
      canvas.height = 720;
      
      const img = imgsArray[index - 1];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
      const handleScroll = () => {
          if (!containerRef.current) return;
          
          const { top, height } = containerRef.current.getBoundingClientRect();
          const scrollFraction = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
          
          const frameIndex = Math.min(
            FRAME_COUNT,
            Math.max(1, Math.ceil(scrollFraction * FRAME_COUNT))
          );
          
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            requestAnimationFrame(() => drawFrame(frameIndex));
          }
      };

      const handleResize = () => {
          requestAnimationFrame(() => drawFrame(currentFrameRef.current));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
  }, [images]);

  return (
    <section className="relative w-full bg-[#101822]" style={{ marginTop: "40px", marginBottom: "40px" }}>
      <div 
        ref={containerRef} 
        style={{ height: "300vh" }} 
        className="w-full relative"
      >
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#101822] relative"
        >
          {/* Loading Indicator */}
          {loaded < FRAME_COUNT && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#101822]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#FFCF23] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-light">جاري التحميل... {Math.round((loaded / FRAME_COUNT) * 100)}%</p>
              </div>
            </div>
          )}



           {/* Canvas Animation Container - absolutely centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dark underlay gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1A2533_0%,_transparent_60%)] z-0 opacity-50 pointer-events-none" />
            
            <canvas 
               ref={canvasRef} 
               className="relative z-10 pointer-events-none transform-gpu"
               style={{ 
                 width: "100%",
                 maxWidth: "700px",
                 height: "auto",
                 /* CSS Mask - wider on mobile to avoid clipping */
                 WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 78%)",
                 maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 78%)",
                 filter: "contrast(1.02) brightness(1.05)" 
               }}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
