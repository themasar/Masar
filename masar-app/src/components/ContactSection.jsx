import { useState } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    {
      icon: <FaFacebookF className="w-5 h-5" />,
      href: 'https://www.facebook.com/profile.php?id=61572100627908',
      label: 'Facebook',
      color: 'hover:bg-[#1877F2]',
    },
    {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      href: 'https://www.linkedin.com/company/themasar-institute/',
      label: 'LinkedIn',
      color: 'hover:bg-[#0A66C2]',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:themasar.platform@gmail.com?subject=رسالة من ${formData.name}&body=البريد الإلكتروني: ${formData.email}%0D%0A%0D%0Aالرسالة:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#146EEC]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[650px] mx-auto px-6 relative z-10">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#101827] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-[0_0_40px_rgba(20,110,236,0.15)] relative"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              تواصل معنا !
            </h2>
            <p className="text-[#94A3B8] text-sm md:text-base">
              املأ البيانات و قم بالتواصل معنا !
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Name (Right in RTL) */}
              <input
                type="text"
                placeholder="الاسم بالكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-[#E2E8F0] text-[#0F172A] placeholder-[#64748B] font-medium rounded-[16px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#146EEC] transition-all"
              />
              {/* Email (Left in RTL) */}
              <input
                type="email"
                placeholder="البريد الالكتروني"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                dir="rtl"
                className="w-full bg-[#E2E8F0] text-[#0F172A] placeholder-[#64748B] font-medium rounded-[16px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#146EEC] transition-all text-right"
              />
            </div>
            
            <textarea
              placeholder="اكتب رسالتك هنا"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full bg-[#E2E8F0] text-[#0F172A] placeholder-[#64748B] font-medium rounded-[16px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#146EEC] transition-all resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#9ebbe2] text-[#061224] font-bold text-lg rounded-[16px] py-4 mt-2 hover:bg-[#146EEC] transition-colors"
            >
              ارسال
            </button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-5 mt-12"
        >

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
