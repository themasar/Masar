import { HiLightningBolt, HiMap, HiAcademicCap } from 'react-icons/hi';
import { FaTerminal, FaCode, FaMicrochip } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: <HiMap className="w-8 h-8" />,
      title: 'مسارات واضحة ومنظمة',
      description: 'خطوات محددة توصلك لهدفك المهني بدون تشتت أو ضياع وقت.',
    },
    {
      icon: <HiAcademicCap className="w-8 h-8" />,
      title: 'محتوى تعليمي مُنتقى',
      description: 'دورات ومصادر مختارة بعناية من أفضل المنصات العالمية والعربية.',
    },
    {
      icon: <HiLightningBolt className="w-8 h-8" />,
      title: 'تتبع تقدمك بسهولة',
      description: 'تقارير مفصلة وخرائط مهارات تفاعلية تبين لك أين وصلت.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      </div>

      {/* Tech Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 10, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] text-[#AFDDFF]"
        >
          <FaTerminal size={100} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -10, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[15%] text-[#AFDDFF]"
        >
          <FaCode size={130} />
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] left-[45%] text-[#AFDDFF]"
        >
          <FaMicrochip size={90} />
        </motion.div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-4">
            هل تشعر بالضياع في بحر <span className="gradient-text">الخيارات</span>؟
          </h2>
          <p className="text-gray-light text-lg max-w-[650px] mx-auto leading-relaxed">
            مسار يوفر لك خريطة طريق واضحة ومخصصة تساعدك على اتخاذ القرارات الصحيحة في مسيرتك المهنية.
          </p>
        </motion.div>

        {/* Person at crossroads illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-full max-w-[300px]">
            <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_10px_30px_rgba(20,110,236,0.15)]">
               {/* Crossroads sign */}
               <rect x="140" y="60" width="8" height="140" rx="2" fill="#1E293B" />
               
               {/* Arrow signs */}
               <g transform="translate(90, 60)">
                 <rect width="70" height="24" rx="4" fill="#146EEC" opacity="0.8" />
                 <polygon points="0,0 -12,12 0,24" fill="#146EEC" opacity="0.8" />
               </g>
               <g transform="translate(148, 90)">
                 <rect width="70" height="24" rx="4" fill="#AFDDFF" opacity="0.6" />
                 <polygon points="70,0 82,12 70,24" fill="#AFDDFF" opacity="0.6" />
               </g>
               <g transform="translate(100, 120)">
                 <rect width="55" height="20" rx="4" fill="#1E293B" />
                 <polygon points="0,0 -10,10 0,20" fill="#1E293B" />
               </g>
               
               {/* Person */}
               <circle cx="144" cy="35" r="18" fill="#E8D5C4" />
               <path d="M140 25 Q144 18 148 25" fill="#2C1810" />
               <path d="M130 30 Q130 18 144 15 Q158 18 158 30" fill="#2C1810" />
               
               {/* Question marks */}
               <text x="60" y="45" fill="#146EEC" fontSize="20" fontWeight="bold" opacity="0.6">؟</text>
               <text x="220" y="50" fill="#AFDDFF" fontSize="16" fontWeight="bold" opacity="0.5">؟</text>
               <text x="240" y="90" fill="#146EEC" fontSize="14" fontWeight="bold" opacity="0.4">؟</text>
               
               {/* Ground */}
               <ellipse cx="144" cy="205" rx="100" ry="12" fill="#1E293B" opacity="0.3" />
            </svg>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 group relative overflow-hidden"
            >
              {/* Subtle tech background line inside card */}
              <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#146EEC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
