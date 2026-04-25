import React, { useState } from 'react';
import { HiOutlineChevronRight, HiOutlineCheckCircle, HiOutlineClock, HiOutlineDocumentCheck } from 'react-icons/hi2';
import { supabase } from '../../lib/supabase';

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
};

const FinalResult = ({ onRestart, result }) => {
  const [feedback, setFeedback] = useState(null); // 'suitable', 'not_sure', 'unsuitable'
  const [suggestedTrack, setSuggestedTrack] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Extract top 1 score from backend result
  let topTracks = [];
  if (result?.confidence?.top_track) {
    const trackKey = result.confidence.top_track;
    const matchScore = result.scores?.[trackKey] !== undefined
      ? Math.round(result.scores[trackKey] * 100)
      : (result.confidence.score !== undefined ? Math.round(result.confidence.score * 100) : 0);
      
    topTracks = [
      { 
        trackKey, 
        score: matchScore
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

  const handleFeedbackSubmit = async (selectedFeedback) => {
    setFeedback(selectedFeedback);
    if (selectedFeedback !== 'unsuitable') {
      await submitToDb(selectedFeedback, null);
    }
  };

  const handleTrackSuggestSubmit = async () => {
    if (!suggestedTrack) return;
    await submitToDb('unsuitable', suggestedTrack);
  };

  const submitToDb = async (fbValue, trackValue) => {
    if (!result?.dbId) {
      console.warn("No DB ID found to update feedback.");
      setFeedbackSubmitted(true);
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      const { error } = await supabase
        .from('user_assessments')
        .update({
          user_feedback: fbValue,
          user_suggested_track: trackValue
        })
        .eq('id', result.dbId);
        
      if (error) console.error('Error updating feedback:', error);
      
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error('Error updating feedback:', err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const trackOptions = [
    'تطوير واجهات المستخدم (Frontend)',
    'تطوير الواجهات الخلفية (Backend)',
    'الذكاء الاصطناعي (AI)',
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 flex flex-col items-center justify-center min-h-[100dvh] animate-fade-in relative z-20">
      
      {/* Header Back Button */}
      <div className="w-full flex items-center justify-start absolute top-6 right-6 rtl:left-auto rtl:right-6">
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
      <div className="text-center mb-8 mt-12 w-full flex flex-col items-center">
        {/* Success Badge */}
        <div className="inline-flex items-center justify-center gap-2 bg-[#052E16] text-[#22C55E] border border-[#22C55E]/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(34,197,94,0.15)] font-bold text-xs">
          <span>التحليل مكتمل</span>
          <HiOutlineCheckCircle className="w-4 h-4" />
        </div>
        
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-wide">
          المسار المهني الموصى به لك
        </h1>
        <p className="text-[#94A3B8] text-sm md:text-base max-w-2xl mx-auto">
          بناءً على إجاباتك، قمنا باختيار مسار التعلم المثالي لك
        </p>
      </div>

      {/* Result Cards Grid */}
      <div className="flex justify-center w-full max-w-[600px] mb-8 mx-auto">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="w-full relative border border-[#1E293B] rounded-[24px] bg-[#0B1120] overflow-hidden flex flex-col hover:border-[#334155] transition-all duration-300 shadow-xl"
          >
            {/* Top Left Match Badge container */}
            <div className="absolute top-0 left-0 z-10">
               <div className={`flex flex-col items-center justify-center w-[132px] h-[124px] rounded-br-[24px] ${rec.badgeColor} text-white shadow-[5px_5px_15px_rgba(0,0,0,0.2)]`}>
                 <div className="flex items-center gap-0.5" dir="ltr">
                   <span className="font-bold text-2xl leading-none">{rec.match}</span>
                   <span className="text-2xl font-bold opacity-90">%</span>
                 </div>
                 <span className="text-lg font-bold mt-1">تطابق</span>
               </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col h-full flex-grow text-right relative z-10">
              
              <div className="pl-20 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 pr-2">{rec.title}</h2>
                <p className="text-[#94A3B8] text-xs md:text-sm leading-relaxed pr-2">
                  {rec.description}
                </p>
              </div>

              {/* Explanation Section */}
              {result?.explanation && result.explanation.length > 0 && (
                <div className="pr-2 mb-6">
                  <p className="text-white text-sm mb-3 font-bold flex items-center gap-2">
                    <span className={`w-1.5 h-4 ${rec.badgeColor} rounded-full inline-block`}></span>
                    لماذا تم ترشيح هذا المسار؟
                  </p>
                  <ul className="space-y-2">
                    {result.explanation.map((text, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#94A3B8] text-xs leading-relaxed">
                        <span className="shrink-0 w-1 h-1 rounded-full bg-[#60A5FA] mt-1.5"></span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Card CTA */}
              <div className="mt-auto pt-2">
                 <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold text-sm md:text-base transition-colors">
                    عرض خارطة الطريق
                 </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="w-full max-w-[600px] mb-8 bg-[#0B1120] border border-[#1E293B] rounded-[24px] p-6 text-center shadow-xl">
        {!feedbackSubmitted ? (
          <>
            <h3 className="text-white font-bold text-lg mb-4">شايف ان النتيجة دي بتعبر عن ميولك الفعلية ؟</h3>
            
            {feedback !== 'unsuitable' ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => handleFeedbackSubmit('suitable')}
                  className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E] hover:text-white px-4 py-2.5 rounded-xl transition-colors font-bold text-sm"
                >
                  نعم، مناسب
                </button>
                <button 
                  onClick={() => handleFeedbackSubmit('not_sure')}
                  className="bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] hover:bg-[#F97316] hover:text-white px-4 py-2.5 rounded-xl transition-colors font-bold text-sm"
                >
                  مش متأكد بصراحة
                </button>
                <button 
                  onClick={() => setFeedback('unsuitable')}
                  className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-4 py-2.5 rounded-xl transition-colors font-bold text-sm"
                >
                  لا، غير مناسب
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-right animate-fade-in">
                <p className="text-white mb-3 text-sm font-bold w-full">ايه التراك اللي شايفه مناسب؟</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-4">
                  {trackOptions.map((track, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSuggestedTrack(track)}
                      className={`px-4 py-2.5 rounded-xl border transition-colors text-sm font-bold ${
                        suggestedTrack === track
                          ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                          : 'bg-[#101822] border-[#1E293B] text-[#94A3B8] hover:border-[#3B82F6]'
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={handleTrackSuggestSubmit}
                    disabled={!suggestedTrack || isSubmittingFeedback}
                    className="flex-grow bg-[#3B82F6] text-white py-2.5 rounded-xl font-bold hover:bg-[#2563EB] disabled:opacity-50 transition-colors"
                  >
                    {isSubmittingFeedback ? 'جاري الإرسال...' : 'إرسال'}
                  </button>
                  <button 
                    onClick={() => setFeedback(null)}
                    className="bg-[#1E293B] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#334155] transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
            <div className="w-12 h-12 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-3">
              <HiOutlineCheckCircle className="w-7 h-7 text-[#22C55E]" />
            </div>
            <p className="text-white font-bold text-lg">شكراً لتقييمك!</p>
            <p className="text-[#94A3B8] text-sm mt-1">ملاحظاتك بتساعدنا نحسن النظام باستمرار</p>
          </div>
        )}
      </div>

      {/* Global CTA */}
      <div className="w-full max-w-[600px] flex items-center justify-between border-t border-[#1E293B] pt-6 flex-col sm:flex-row gap-4 mb-10">
         <button className="w-full sm:w-auto bg-[#1E293B] hover:bg-[#334155] text-white py-3 px-8 rounded-xl font-bold transition-colors order-2 sm:order-1 text-sm">
            تصفح كل المسارات
         </button>
         
         <div className="text-right order-1 sm:order-2">
            <h3 className="text-white font-bold text-lg mb-1">غير متأكد من النتيجة؟</h3>
            <p className="text-[#94A3B8] text-xs md:text-sm">يمكنك دائماً البدء بمسار وتغييره لاحقاً</p>
         </div>
      </div>

    </div>
  );
};

export default FinalResult;
