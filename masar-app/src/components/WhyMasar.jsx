import { HiOutlineLightBulb, HiOutlineMap, HiOutlineBadgeCheck } from 'react-icons/hi';
import { FaNetworkWired, FaCodeBranch, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyMasar = () => {
  const cards = [
    {
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      iconColor: 'text-primary',
      iconBg: 'bg-[#1a2b4b]',
      title: 'اكتشاف الشغف',
      description: 'اختبارات متقدمة مبنية على أسس علمية لتحديد ميولك المهنية ونقاط قوتك بدقة.'
    },
    {
      icon: <HiOutlineMap className="w-6 h-6" />,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-[#163533]',
      title: 'خرائط طريق مخصصة',
      description: 'مسارات تعليمية خطوة بخطوة تناسب مستواك الحالي وأهدافك المستقبلية في سوق العمل.'
    },
    {
      icon: <HiOutlineBadgeCheck className="w-6 h-6" />,
      iconColor: 'text-primary',
      iconBg: 'bg-[#1a2b4b]',
      title: 'الوصول للاحتراف',
      description: 'محتوى منسق بعناية من أفضل المصادر العالمية والمحلية للوصول إلى أعلى مستويات التميز.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="why" className="py-24 relative z-10 overflow-hidden">
      {/* Tech Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] text-white"
        >
          <FaNetworkWired size={120} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[10%] text-white"
        >
          <FaCodeBranch size={150} />
        </motion.div>

        <motion.div 
          animate={{ x: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-[50%] text-white"
        >
          <FaDatabase size={80} />
        </motion.div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-white mb-4">
            لماذا تختار مسار؟
          </h2>
          <p className="text-gray-light text-base lg:text-lg max-w-[700px] mx-auto">
            نحن نوفر لك الأدوات اللازمة للنجاح في مسيرتك المهنية من البداية وحتى الاحتراف
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-navy rounded-[23px] p-8 lg:p-10 flex flex-col text-right border border-[#A68200]/30 hover:border-[#FFCF23] hover:shadow-[0_0_20px_rgba(255,207,35,0.25)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFCF23] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconColor} ${card.iconBg} mb-8 transition-transform duration-300 group-hover:scale-110`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-light leading-relaxed text-[15px]">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyMasar;
