import {
  HiOutlineArrowTrendingUp,
  HiOutlineTrophy,
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlassCircle
} from 'react-icons/hi2';
import { motion } from 'framer-motion';

const FeaturesCards = ({ onStartJourney }) => {
  const cards = [
    {
      icon: <HiOutlineMagnifyingGlassCircle className="w-8 h-8" />,
      title: 'اكتشف مسارك',
      description: 'خذ تقييم المسار المهني لإيجاد المسارات التي تتناسب مع اهتماماتك'
    },
    {
      icon: <HiOutlineArrowTrendingUp className="w-8 h-8" />,
      title: 'اتبع خارطة طريقك',
      description: 'احصل على خطة تعلم شخصية منظمة إلى مراحل قابلة للتحقيق'
    },
    {
      icon: <HiOutlineTrophy className="w-8 h-8" />,
      title: 'تتبع تقدمك',
      description: 'اكسب نقاط الخبرة، افتح الإنجازات، وشاهد مهاراتك تنمو'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="features" className="py-24 relative" style={{ isolation: 'isolate', zIndex: 10 }}>
      <div className="max-w-[1123px] mx-auto px-6">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white mb-4">
            خطوتك الأولى نحو <span className="text-[#FFCF23] font-bold">احتراف مجالك</span> تبدأ من هنا
          </h2>
          <p className="text-[#94A3B8] text-base max-w-[650px] mx-auto leading-relaxed">
            مسار يساعدك على اكتشاف شغفك، وبناء خريطة طريق مخصصة لك، والوصول إلى الاحتراف من خلال رحلة تعليمية منظمة
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-3xl px-6 py-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
              style={{
                background: 'rgba(16, 24, 34, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FFCF23';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(255,207,35,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
              }}
            >
              {/* Animated subtle tech line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFCF23] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                style={{ background: '#FFCF23', color: '#FFFFFF' }}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{card.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed text-[15px] px-2">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Button & Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center mt-4"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onStartJourney) onStartJourney();
            }}
            className="border border-white/20 text-white rounded-full px-8 py-3.5 text-[15px] font-semibold transition-all duration-300 flex items-center gap-3 bg-transparent hover:bg-white/10 hover:border-white/50 group mb-3 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>ابدأ رحلتك</span>
            <HiOutlineArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <p className="text-[#64748B] text-sm font-medium">
            تستغرق 5 دقائق فقط لللإكمال
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesCards;
