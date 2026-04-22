import { FaFacebookF, FaLinkedinIn, FaInstagram, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="pt-24 pb-8 relative z-10 border-t border-white/5 bg-navy-medium/30 overflow-hidden"
    >
      {/* Footer Ambient Tech BG */}
      <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none">
        <FaCode size={300} className="transform translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-16"
        >
          
          {/* Brand & Socials (Rightmost logically, but spans 2 cols potentially) */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2 text-right">
            <div className="mb-12 flex justify-start">
              <a href="#" className="flex items-center justify-center relative group">
                {/* Logo slight glow on hover */}
                <div className="absolute inset-0 bg-[#146EEC]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src="/images/logo.png" alt="Logo" className="w-auto h-32 md:h-32 object-contain relative z-10" />
              </a>
            </div>
            <p className="text-gray-light text-sm leading-relaxed mb-6 max-w-[300px]">
              منصتك الذكية لاكتشاف المسار المهني وبناء مهاراتك بطريقة منظمة وموثوقة، خريطتك لمستقبل مشرق.
            </p>
            <div className="flex gap-3 justify-start">
              <a href="https://www.facebook.com/profile.php?id=61572100627908" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-light hover:bg-[#146EEC] hover:shadow-[0_0_15px_rgba(20,110,236,0.5)] hover:text-white transition-all duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/themasar-institute/" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-light hover:bg-[#146EEC] hover:shadow-[0_0_15px_rgba(20,110,236,0.5)] hover:text-white transition-all duration-300">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold text-base mb-6">روابط سريعة</h4>
            <ul className="space-y-5">
              <li><a href="#hero" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">الرئيسية</a></li>
              <li><a href="#why" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">لماذا مسار</a></li>
              <li><a href="#features" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">المسارات</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold text-base mb-6">الموارد</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">المكتبة</a></li>
              <li><a href="#" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">المدونة</a></li>
              <li><a href="#" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">مركز المساعدة</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold text-base mb-6">تواصل معنا</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm">info@masar.sa</a></li>
              <li><a href="#" className="text-gray-light hover:text-[#146EEC] hover:-translate-x-1 inline-block transition-all duration-300 text-sm direction-ltr">+966 000 000 00</a></li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right"
        >
          <p className="text-gray-dark text-sm">
            © 2026 مسار. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6 justify-center">
            <a href="#" className="text-gray-dark hover:text-gray-light text-sm transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-gray-dark hover:text-gray-light text-sm transition-colors">شروط الاستخدام</a>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;
