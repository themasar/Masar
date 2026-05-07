import { HiCheckCircle } from "react-icons/hi";

const ABOUT_POINTS = [
  "مسارات مهنية متسلسلة وموثوقة",
  "دورات منسقة من أفضل المصادر العالمية",
  "تقارير أداء، وخرائط مهارات تفاعلية",
  "دعم في كل خطوة من رحلتك بخطط عملية",
];

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden py-8">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-right">
            <h2 className="text-3xl lg:text-[40px] font-bold mb-6 bg-gradient-to-l from-[#FFCF23] to-[#A68200] bg-clip-text text-transparent inline-block">
              عن مسار
            </h2>

            <p className="text-gray-light text-base lg:text-lg leading-relaxed mb-10 max-w-[500px]">
              في عالم مليء بالمحتوى التعليمي، يصعب اختيار الطريق الصحيح. مسار
              تحل هذه المشكلة بتوفير خارطة طريق واضحة ومخصصة لكل متعلم.
            </p>

            <ul className="space-y-5">
              {ABOUT_POINTS.map((point, index) => (
                <li key={index} className="flex items-center gap-4 text-white">
                  <HiCheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium text-[15px]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]" />
            <img
              src="/images/about.png"
              alt="شاشات مسار"
              className="w-full relative z-10 hover:-translate-y-2 transition-transform duration-500 drop-shadow-2xl"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
