import { HiCheckCircle } from 'react-icons/hi';

const AboutSection = () => {
  const points = [
    'مسارات مهنية متسلسلة وموثوقة',
    'دورات منسقة من أفضل المصادر العالمية',
    'تقارير أداء، وخرائط مهارات تفاعلية',
    'دعم في كل خطوة من رحلتك بخطط عملية'
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ paddingTop: '32px', paddingBottom: '32px' }}
    >
      <div className="max-w-[1120px] mx-auto px-6"> {/* Figma: 1120px container */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — isometric image */}
          <div className="order-2 lg:order-2 relative flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] z-0" />
            <img
              src="/images/about.png"
              alt="شاشات مسار"
              className="w-full relative z-10 hover:-translate-y-2 transition-transform duration-500 drop-shadow-2xl"
              draggable="false"
            />
          </div>
          {/* Right — Text & Checklist */}
          <div className="order-1 lg:order-1 text-right">
            <h2 className="text-3xl lg:text-[40px] font-bold mb-6 bg-gradient-to-l from-[#FFCF23] to-[#A68200] bg-clip-text text-transparent inline-block">
              عن مسار
            </h2>
            <p className="text-gray-light text-base lg:text-lg leading-relaxed mb-10 max-w-[500px]">
              في عالم مليء بالمحتوى التعليمي، يصعب اختيار الطريق الصحيح. مسار تحل هذه المشكلة بتوفير خارطة طريق واضحة ومخصصة لكل متعلم.
            </p>
            <ul className="space-y-5">
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-4 text-white">
                  <div className="flex-shrink-0 text-primary">
                    <HiCheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-[15px]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
