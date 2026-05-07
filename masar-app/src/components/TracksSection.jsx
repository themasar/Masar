import { motion } from "framer-motion";

const tracks = [
  {
    title: "Frontend Development",
    description: "بناء واجهات مستخدم حديثة وتفاعلية باستخدام React وJavaScript",
  },
  {
    title: "Backend Development",
    description: "تصميم APIs وقواعد بيانات وأنظمة قوية وقابلة للتوسع",
  },
  {
    title: "Artificial Intelligence (AI)",
    description: "تعلم الآلة وتحليل البيانات وبناء نماذج ذكية",
  },
  {
    title: "Software Testing",
    description: "اختبار الأنظمة وضمان الجودة باستخدام أدوات وتقنيات حديثة",
  },
  {
    title: "Mobile Applications",
    description: "تطوير تطبيقات موبايل باستخدام Flutter أو React Native",
  },
];

const TracksSection = () => {
  return (
    <motion.section
      id="tracks"
      className="py-24 bg-[#061224] relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            التراكات المتاحة حالياً
          </h2>
          <p className="text-[#94A3B8]">
            اختر المسار المناسب لك وابدأ رحلتك المهنية
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {tracks.map((track, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
                y: -6,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#A68200";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(166,130,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E293B";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Gold glow line (زي FeaturesCards) */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A68200] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h3 className="text-white font-bold text-lg mb-3">
                {track.title}
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {track.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TracksSection;
