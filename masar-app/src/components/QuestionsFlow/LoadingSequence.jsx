import { useState, useEffect } from 'react';
import { 
  HiOutlineCheckCircle, 
  HiOutlineChartBar, 
  HiOutlineBookOpen, 
  HiOutlineSparkles,
  HiOutlineUser
} from 'react-icons/hi2';

const LoadingSequence = ({ isSubmitting = true }) => {
  const [progress, setProgress] = useState(0);

  const steps = [
    { threshold: 0, text: 'تحليل اهتماماتك', Icon: HiOutlineUser, activeColor: 'bg-green-500' },
    { threshold: 25, text: 'مطابقة المسارات المهنية', Icon: HiOutlineChartBar, activeColor: 'bg-indigo-500' },
    { threshold: 50, text: 'اختيار الدورات', Icon: HiOutlineBookOpen, activeColor: 'bg-blue-500' },
    { threshold: 75, text: 'بناء خارطة طريقك', Icon: HiOutlineSparkles, activeColor: 'bg-purple-500' },
    { threshold: 95, text: 'وضع اللمسات الأخيرة', Icon: HiOutlineCheckCircle, activeColor: 'bg-teal-500' }
  ];

  useEffect(() => {
    // 4 seconds animation
    const duration = 4000;
    const intervalTime = 50;
    const stepsCount = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / stepsCount) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[100dvh] bg-[#061224] flex flex-col items-center justify-center py-12 px-4 relative z-50 w-full">
      <div className="w-full max-w-[600px] z-50 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          جار إنشاء خارطة التعلم الشخصية
        </h2>
        <p className="text-[#94A3B8] text-sm md:text-base text-center mb-10">
          يرجى الانتظار بينما نقوم بإنشاء المسار المثالي لك...
        </p>

        <div className="space-y-3 mb-12" dir="rtl">
          {steps.map((step, idx) => {
            const isCompleted = progress >= (steps[idx + 1]?.threshold || 100);
            const isActive = progress >= step.threshold && !isCompleted;
            const isPending = progress < step.threshold;

            let bgColor = 'bg-[#15243D] border-[#1E293B]';
            let textColor = 'text-[#94A3B8]';
            let iconBg = 'bg-[#334155]';
            
            if (isCompleted) {
              bgColor = 'bg-[#24354D] border-[#2A3A5A]';
              textColor = 'text-white font-semibold';
              iconBg = 'bg-[#22C55E]';
            } else if (isActive) {
              bgColor = 'bg-white border-white shadow-lg scale-[1.02]';
              textColor = 'text-[#0B1120] font-bold';
              iconBg = step.activeColor;
            }

            return (
              <div 
                key={idx}
                className={`
                  flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                  ${bgColor}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${iconBg} transition-colors duration-300`}>
                    <step.Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-base ${textColor} transition-colors duration-300`}>
                    {step.text}
                  </span>
                </div>

                <div className="flex items-center">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                      <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {isActive && (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar under steps */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[#94A3B8] text-xs font-semibold">{Math.round(progress)}% مكتمل</span>
        </div>

      </div>
    </section>
  );
};

export default LoadingSequence;
