const JourneySteps = () => {
  const steps = [
    {
      align: 'right', // 1
      image: '/images/step1.png',
      text: null
    },
    {
      align: 'left', // 2
      image: '/images/step2.png',
      text: 'منصة مسار تختصر عليك الطريق. ابدأ الآن بتحديد اهتماماتك وأهدافك المهنية وخلفيتك الحالية عبر نظام ذكي متكامل'
    },
    {
      align: 'right', // 3
      image: '/images/step3.png',
      text: 'بناءً على إجاباتك، سنقترح عليك أفضل أربعة مسارات تعليمية تناسب شخصيتك تماماً'
    },
    {
      align: 'left', // 4
      image: '/images/step4.png',
      text: 'الآن خريطتك جاهزة! مسارٌ تعليمي مُنظّم بدقة، مقسّم إلى ثلاث مراحل: المبتدئ، المتوسط، والمتقدم'
    },
    {
      align: 'right', // 5
      image: '/images/step5.png',
      text: 'حوّل شغفك إلى مهنة احترافية. قصتك تبدأ من هنا'
    }
  ];

  return (
    <section id="steps" className="py-24 relative overflow-hidden" style={{ minHeight: '1200px' }}>
      <div className="max-w-[1123px] mx-auto px-6 relative">
        
        {/* Title */}
        <div className="text-center mb-16 lg:mb-20 relative">
          <h2 className="text-2xl md:text-[32px] lg:text-[36px] font-bold text-white leading-relaxed max-w-[900px] mx-auto">
            هل تشعر بالضياع وسط مئات المجالات المهنية؟ 
            <br className="hidden md:block" />
            لا تعرف من أين تبدأ أو أي طريق هو الأنسب لقدراتك؟
          </h2>
          
          {/* Arrow from title to step 1 (Right) */}
          <div className="hidden lg:block absolute -bottom-20 left-1/2 -translate-x-1/2 w-[35%] h-[120px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker id="arrow-start" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="#146EEC" />
                </marker>
              </defs>
              {/* Center (x=50) to Right (x=100) */}
              <path 
                d="M 50,0 C 50,60 100,40 100,100" 
                stroke="#146EEC" 
                strokeWidth="1.5" 
                strokeDasharray="6 6" 
                fill="none" 
                markerEnd="url(#arrow-start)" 
              />
            </svg>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col space-y-16 lg:space-y-6 relative z-10 w-full">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative w-full flex ${step.align === 'right' ? 'justify-start' : 'justify-end'}`}
            >
              
              {/* Connector from current step to next step */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-[55%] left-1/2 -translate-x-1/2 w-[40%] h-[160px] pointer-events-none z-[-1]"
                >
                   <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <defs>
                       <marker id={`arrow-${index}`} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                         <polygon points="0 0, 5 2.5, 0 5" fill="#146EEC" />
                       </marker>
                     </defs>
                     {/* If current step is right (x=100), curve to left (x=0) */}
                     <path 
                       d={step.align === 'right' ? "M 100,0 C 100,60 0,40 0,100" : "M 0,0 C 0,60 100,40 100,100"} 
                       stroke="#146EEC" 
                       strokeWidth="1.5" 
                       strokeDasharray="6 6" 
                       fill="none"
                       markerEnd={`url(#arrow-${index})`}
                     />
                   </svg>
                </div>
              )}

              {/* Step Content */}
              <div className="w-full lg:w-[45%] flex flex-col items-center justify-center text-center">
                {step.text && (
                  <p className="text-white text-base md:text-[16px] font-semibold leading-[1.8] mb-6 max-w-[360px]">
                    {step.text}
                  </p>
                )}
                
                <div className="relative group mx-auto">
                  <div className="absolute inset-0 bg-[#146EEC]/5 rounded-full blur-[40px] transition-all duration-700" />
                  <img 
                    src={step.image} 
                    alt={`Step ${index + 1}`} 
                    className="relative z-10 w-full max-w-[280px] lg:max-w-[340px] h-auto object-contain transition-transform duration-500 hover:scale-[1.03]"
                    draggable="false"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="text-center mt-24 max-w-[750px] mx-auto border-t border-white/5 pt-16">
          <p className="text-xl lg:text-[24px] font-bold text-white leading-[1.8]">
            مع مسار، لن تمشي في طريقك وحيداً؛ خريطتك واضحة، 
            <br className="hidden md:block" />
            تقدمك ملموس، ومستقبلك المهني بات بين يديك
          </p>
        </div>

      </div>
    </section>
  );
};

export default JourneySteps;
