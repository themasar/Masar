import { motion } from 'framer-motion';

const CTASection = () => {
  // Generate random tech strings for the background
  const techStrings = [
    "const future = await user.buildPath();",
    "npm run start --masar-journey",
    "while(true) { improveSkills(); }",
    "> System.out.println('Hello Masar!');",
    "def analyze_potential(user): return UNLIMITED",
    "git commit -m 'Started my career path'",
    "SELECT * FROM opportunities WHERE user = 'YOU'",
    "<Masar> Discover. Learn. Achieve. </Masar>"
  ];

  return (
    <section className="relative z-10 py-20 px-6 overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Absolute Tech Matrix Background */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh" }}
            animate={{ y: "-100vh" }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20 // Start at random positions
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              color: '#146EEC',
              fontFamily: 'monospace',
              fontSize: `${12 + Math.random() * 14}px`,
              whiteSpace: 'nowrap',
              transform: 'rotate(-90deg)', // Falling horizontal text
              transformOrigin: 'left top'
            }}
          >
            {techStrings[i % techStrings.length]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat group"
          style={{
            backgroundImage: "url('/images/Section.png')",
            borderRadius: '40px',
            border: '2px solid rgba(175,221,255,0.34)',
            minHeight: '388px',
            boxShadow: '0 0 40px rgba(20,110,236,0.1)'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1E293B]/60 backdrop-blur-[2px] rounded-[38px] group-hover:bg-[#1E293B]/40 transition-all duration-700" />

          {/* Programming Cursor Effect Overlay Line */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], top: ['0%', '100%'] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-[#146EEC] shadow-[0_0_10px_#146EEC]" 
          />

          {/* Content — single, centered */}
          <div className="relative z-10 min-h-[388px] flex flex-col items-center justify-center text-center px-4 md:px-24 py-16">
            <h2 className="text-[28px] md:text-[40px] lg:text-[45px] font-medium text-white mb-4 leading-tight tracking-wide drop-shadow-md">
              جاهز لتحديد وجهتك القادمة؟
            </h2>
            <h1 className="text-[34px] md:text-[50px] lg:text-[60px] font-bold mt-2 tracking-wide leading-tight drop-shadow-lg">
              <span className="text-white">طريقك</span>
              <span className="bg-gradient-to-l from-[#FFCF23] to-[#A68200] bg-clip-text text-transparent mr-2">بطريقتك !</span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
