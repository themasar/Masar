import React from 'react';
import { HiOutlineChevronRight, HiOutlineCheckCircle, HiOutlineClock, HiOutlineDocumentCheck } from 'react-icons/hi2';

const TRACK_DETAILS = {
  "Frontend": {
    title: 'تطوير واجهات المستخدم (Frontend)',
    matchColor: 'from-[#BD00FF]/20 to-transparent',
    badgeColor: 'bg-[#BD00FF]',
    description: 'أتقن تقنيات الويب الحديثة وابن تطبيقات ويب متجاوبة وتفاعلية.',
    duration: '6-8 أشهر',
    skills_count: '5 مهارات',
    tags: ['React', 'JavaScript', 'HTML/CSS', 'UI Integration', 'Responsive Design'],
  },
  "Backend": {
    title: 'تطوير الواجهات الخلفية (Backend)',
    matchColor: 'from-[#F97316]/20 to-transparent',
    badgeColor: 'bg-[#F97316]',
    description: 'بناء قواعد بيانات قوية، تصميم واجهات برمجة التطبيقات، وتطوير خوادم سريعة وآمنة.',
    duration: '8-10 أشهر',
    skills_count: '6 مهارات',
    tags: ['Node.js', 'Python', 'SQL', 'APIs', 'System Design'],
  },
  "AI": {
    title: 'الذكاء الاصطناعي (AI)',
    matchColor: 'from-[#6366F1]/20 to-transparent',
    badgeColor: 'bg-[#6366F1]',
    description: 'تعلم تدريب النماذج، تعلم الآلة، وتحليل البيانات لبناء تطبيقات ذكية.',
    duration: '10-12 أشهر',
    skills_count: '5 مهارات',
    tags: ['Machine Learning', 'Python', 'Data Science', 'Deep Learning'],
  },
  "UI/UX": {
    title: 'تصميم تجربة المستخدم (UI/UX)',
    matchColor: 'from-[#22C55E]/20 to-transparent',
    badgeColor: 'bg-[#22C55E]',
    description: 'تعلم كيفية إنشاء تصاميم تتمحور حول المستخدم تحل المشاكل الحقيقية وتسعد المستخدمين.',
    duration: '6-8 أشهر',
    skills_count: '5 مهارات',
    tags: ['اختبار قابلية الاستخدام', 'تصميم الواجهات', 'النماذج الأولية', 'الإطارات الشبكية', 'بحث المستخدم'],
  },
  "Cybersecurity": {
    title: 'الأمن السيبراني',
    matchColor: 'from-[#F97316]/20 to-transparent',
    badgeColor: 'bg-[#F97316]',
    description: 'تعلم التصدي للهجمات واكتشاف الثغرات وتأمين الأنظمة وتطبيق أفضل الممارسات.',
    duration: '12-16 أشهر',
    skills_count: '5 مهارات',
    tags: ['أمن الشبكات', 'اختبار الاختراق', 'التشفير', 'تحليل المخاطر'],
  },
  "Data Analysis": {
    title: 'تحليل البيانات',
    matchColor: 'from-[#22C55E]/20 to-transparent',
    badgeColor: 'bg-[#22C55E]',
    description: 'حول البيانات الخام إلى رؤى قابلة للتنفيذ باستخدام أدوات وتقنيات تحليلية.',
    duration: '7-9 أشهر',
    skills_count: '5 مهارات',
    tags: ['التحليل الإحصائي', 'تصور البيانات', 'Python', 'SQL', 'Excel'],
  },
  "Default": {
    title: 'المسار التقني الشامل',
    matchColor: 'from-[#3B82F6]/20 to-transparent',
    badgeColor: 'bg-[#3B82F6]',
    description: 'ابنِ أساساً قوياً في التكنولوجيا لتبدأ رحلتك المهنية بمرونة عالية.',
    duration: '6-12 أشهر',
    skills_count: 'مهارات متعددة',
    tags: ['Problem Solving', 'Programming', 'System Basics'],
  }
};

const FinalResult = ({ onRestart, result }) => {
  // Extract top 1 score from backend result
  let topTracks = [];
  if (result?.confidence?.top_track) {
    topTracks = [
      { 
        trackKey: result.confidence.top_track, 
        score: result.scores ? Math.round(result.scores[result.confidence.top_track] * 100) : 0 
      }
    ];
  } else if (result?.scores) {
    topTracks = Object.entries(result.scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 1)
        .map(([trackKey, score]) => ({
           trackKey,
           score: Math.round(score * 100)
        }));
  }

  const recommendations = topTracks.length > 0 
    ? topTracks.map(t => ({
        ...(TRACK_DETAILS[t.trackKey] || TRACK_DETAILS["Default"]),
        match: t.score.toString(),
        title: TRACK_DETAILS[t.trackKey] ? TRACK_DETAILS[t.trackKey].title : t.trackKey,
      }))
    : [
        { ...TRACK_DETAILS["UI/UX"], match: '95' }
      ];

  const primaryTrackName = recommendations.length > 0 ? recommendations[0].title : 'المسار المناسب';

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 flex flex-col items-center animate-fade-in relative z-20">
      
      {/* Header Back Button */}
      <div className="w-full flex items-center justify-start mb-12 absolute top-8 right-8 rtl:left-auto rtl:right-8">
        <button 
          onClick={onRestart}
          className="flex items-center gap-2 text-white hover:text-[#94A3B8] transition-colors font-bold text-sm"
        >
          <HiOutlineChevronRight className="w-5 h-5 rtl:hidden" />
          <HiOutlineChevronRight className="w-5 h-5 hidden rtl:block rotate-180" />
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="text-center mb-10 mt-6 w-full flex flex-col items-center">
        {/* Success Badge */}
        <div className="inline-flex items-center justify-center gap-2 bg-[#052E16] text-[#22C55E] border border-[#22C55E]/30 rounded-full px-5 py-2 mb-8 mt-4 shadow-[0_0_15px_rgba(34,197,94,0.15)] font-bold text-sm">
          <span>التحليل مكتمل</span>
          <HiOutlineCheckCircle className="w-5 h-5" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          المسار المهني الموصى به لك
        </h1>
        <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto mt-2 mb-6">
          بناءً على إجاباتك، قمنا باختيار مسار التعلم المثالي لك
        </p>
      </div>

      {/* Result Cards Grid */}
      <div className="flex justify-center w-full max-w-2xl mb-16 mx-auto">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="w-full relative border border-[#1E293B] rounded-[24px] bg-[#0B1120] overflow-hidden flex flex-col hover:border-[#334155] transition-all duration-300 shadow-xl"
          >
            {/* Top Left Match Badge container */}
            <div className="absolute top-0 left-0 z-10">
               {/* Decorative corner curve for badge */}
               <div className="relative w-24 h-24 flex items-center justify-center rounded-br-[24px] bg-[#101822] shadow-sm">
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${rec.badgeColor} text-white shadow-lg`}>
                    <span className="font-bold text-lg leading-none">{rec.match}</span>
                    <span className="text-[10px] opacity-80">%</span>
                  </div>
                  <span className="absolute bottom-2 text-xs text-[#94A3B8]">تطابق</span>
               </div>
               {/* Border lines for the corner cut effect */}
               <div className="absolute top-0 right-[-1px] w-[1px] h-24 bg-[#1E293B]"></div>
               <div className="absolute bottom-[-1px] left-0 w-24 h-[1px] bg-[#1E293B]"></div>
            </div>

            <div className="p-8 pt-8 flex flex-col h-full flex-grow text-right mt-4 md:mt-0 relative z-10">
              
              <div className="pl-20">
                <h2 className="text-2xl font-bold text-white mb-3 pr-2">{rec.title}</h2>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 pr-2">
                  {rec.description}
                </p>
              </div>

              {/* Meta stats */}
              <div className="flex items-center justify-start gap-8 mb-6 pr-2 pl-20">
                <div className="flex items-center gap-2 text-[#94A3B8] text-xs">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>{rec.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[#94A3B8] text-xs">
                  <HiOutlineDocumentCheck className="w-4 h-4" />
                  <span>{rec.skills_count}</span>
                </div>
              </div>

              {/* Skills section */}
              <div className="mb-8 pr-2">
                 <p className="text-[#94A3B8] text-xs mb-3 font-semibold">المهارات التي ستتعلمها:</p>
                 <div className="flex flex-wrap gap-2 justify-end flex-row-reverse">
                    {/* flex-row-reverse for right to left tag wrapping properly */}
                    {rec.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="px-3 py-1.5 bg-[#0F172A] text-[#60A5FA] border border-[#1E293B] rounded-full text-xs hover:border-[#f5c519a9] transition-colors">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Card CTA */}
              <div className="mt-auto pt-4">
                 <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold transition-colors">
                    عرض خارطة الطريق
                 </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Global CTA */}
      <div className="w-full max-w-4xl flex items-center justify-between border-t border-[#1E293B] pt-8 flex-col sm:flex-row gap-6">
         <button className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3.5 px-8 rounded-xl font-bold transition-colors order-2 sm:order-1 text-sm md:text-base">
            ابدأ بـ {primaryTrackName.split('(')[0].trim()}
         </button>
         
         <div className="text-right order-1 sm:order-2">
            <h3 className="text-white font-bold text-xl mb-1">غير متأكد من أي مسار تختار؟</h3>
            <p className="text-[#94A3B8] text-sm">ابدأ بالمسار الأعلى تطابقاً ويمكنك دائماً التبديل لاحقاً</p>
         </div>
      </div>

    </div>
  );
};

export default FinalResult;
