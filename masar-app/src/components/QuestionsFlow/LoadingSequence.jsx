import { useState, useEffect } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

const LoadingSequence = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  const steps = [
    { threshold: 0, text: 'تحليل اهتماماتك...' },
    { threshold: 25, text: 'مطابقة المسارات المهنية...' },
    { threshold: 50, text: 'اختيار الدورات...' },
    { threshold: 75, text: 'بناء خارطة طريقك...' },
    { threshold: 95, text: 'وضع اللمسات الأخيرة...' }
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds total loading
    const intervalTime = 50;
    const stepsCount = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / stepsCount) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => onFinish(), 500); // Wait half a second at 100% before finishing
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <section className="min-h-screen bg-[#101822] flex flex-col items-center justify-center py-24 px-4 relative z-20">
      <div className="w-full max-w-[600px]">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          جار إنشاء خارطة التعلم الشخصية
        </h2>
        <p className="text-[#94A3B8] text-center mb-12">
          جاري تحليل بياناتك لبناء أفضل مسار...
        </p>

        <div className="space-y-4 mb-12">
          {steps.map((step, idx) => {
            const isCompleted = progress >= step.threshold && (idx === steps.length - 1 || progress >= steps[idx + 1].threshold);
            const isActive = progress >= step.threshold && !isCompleted;
            const isPending = progress < step.threshold;

            return (
              <div 
                key={idx}
                className={`
                  flex items-center justify-between p-4 rounded-xl border transition-all duration-500
                  ${isCompleted ? 'bg-[#146EEC]/10 border-[#146EEC]/30' : ''}
                  ${isActive ? 'bg-[#1E293B] border-[#334155]' : ''}
                  ${isPending ? 'bg-transparent border-transparent opacity-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <HiOutlineCheckCircle className="w-6 h-6 text-[#146EEC]" />
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[#146EEC] border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#1E293B]" />
                  )}
                  <span className={`font-semibold ${isCompleted ? 'text-[#146EEC]' : isActive ? 'text-white' : 'text-[#64748B]'}`}>
                    {step.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar under steps */}
        <div className="text-center">
            <span className="text-[#146EEC] font-bold block mb-2">{Math.round(progress)}% مكتمل</span>
        </div>

      </div>
    </section>
  );
};

export default LoadingSequence;
