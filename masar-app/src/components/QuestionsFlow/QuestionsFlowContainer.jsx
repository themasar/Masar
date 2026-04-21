import { useState } from 'react';
import QuestionHeader from './QuestionHeader';
import QuestionCard from './QuestionCard';
import EmailInputStep from './EmailInputStep';
import questionsDataRaw from '../../data/Questions.json';
import { supabase } from '../../lib/supabase';

// Map Questions.json into our format.
// Questions.json array has { id, text, options: { A, B, C, D } }
const questionsData = questionsDataRaw.map(q => ({
  id: q.id,
  question: q.text,
  options: q.options,
  type: 'question'
}));

const QuestionsFlowContainer = ({ onBackToMain, onComplete }) => {
  const [email, setEmail] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1 is Email Step
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = questionsData.length;
  const currentQuestion = currentStepIndex >= 0 ? questionsData[currentStepIndex] : null;

  const handleSelectOption = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = async () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Finished all questions
      await submitAssessment();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleEmailSubmit = (userEmail) => {
    setEmail(userEmail);
    setCurrentStepIndex(0);
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    // Format answers exactly as requested
    const formattedAnswers = {
      answers: answers
    };

    try {
      // 1. Send to Backend API
      const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'https://masar-backend-production-a94e.up.railway.app/api/Recommend';
      
      let backendData = null;
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedAnswers)
        });
        if (response.ok) {
          backendData = await response.json();
        } else {
          console.warn("Backend API not reachable or returned an error. Using fallback.");
        }
      } catch (err) {
        console.warn("Backend fetch failed, using fallback data:", err);
      }

      // Mock backend response if API fails or placeholder is used
      if (!backendData) {
        backendData = {
          "track": "AI",
          "confidence": {
            "score": 0.46,
            "label": "medium",
            "top_track": "AI",
            "second_track": "Backend"
          },
          "traits": {
            "analytical": 0.873,
            "structure": 0.622,
            "execution": 0.455,
            "ambiguity": 0.745,
            "trial": 0.473,
            "frustration": 0.536,
            "ideation": 0.5,
            "precision": 0.702,
            "visual": 0.473,
            "pattern": 0.852
          },
          "scores": {
            "AI": 0.4262,
            "Backend": 0.3438,
            "Frontend": 0.23
          },
          "explanation": [
            "بناءً على إجاباتك، تفضل التفكير المنطقي والتحليل الدقيق للمشكلات.",
            "المسار الأول المقترح لك هو الذكاء الاصطناعي لتطابق مهاراتك التحليلية القوية.",
            "للنمو في هذا المسار، ستحتاج إلى تنمية قدرتك على التعامل مع الغموض والبيانات غير المكتملة."
          ]
        };
      }

      // 2. Save to Supabase (we do NOT store explanation as requested)
      const { error } = await supabase
        .from('user_assessments')
        .insert([{
          email: email,
          answers: formattedAnswers,
          result_track: backendData.track,
          result_confidence: backendData.confidence,
          result_traits: backendData.traits,
          result_scores: backendData.scores
        }]);
        
      if (error) {
        console.error("Error saving to Supabase:", error);
      }

      // 3. Complete Flow and pass result back
      onComplete(backendData);

    } catch (error) {
      console.error("Submission error:", error);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#101822] flex flex-col justify-center pt-[60px] pb-6 px-4 relative z-20">
      <div className="w-full max-w-[800px] bg-[#101822] min-h-[500px] flex flex-col mx-auto relative z-30">
        
        {currentStepIndex === -1 ? (
          <EmailInputStep onNext={handleEmailSubmit} />
        ) : (
          <>
            <QuestionHeader
              currentStep={currentStepIndex + 1}
              totalSteps={totalSteps}
              onBack={currentStepIndex === 0 ? () => setCurrentStepIndex(-1) : handlePrev}
              titleOverride={currentQuestion.titleOverride}
              subtitleOverride={currentQuestion.subtitleOverride}
            />

            <div className="flex-grow mt-6">
              {isSubmitting ? (
                 <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-8">
                   {/* Tech Animation */}
                   <div className="relative w-32 h-32 flex items-center justify-center">
                     {/* Outer spinning ring */}
                     <div className="absolute inset-0 border-2 border-dashed border-[#1E293B] rounded-full animate-[spin_10s_linear_infinite]"></div>
                     
                     {/* Scanning line effect */}
                     <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#3B82F6] shadow-[0_0_15px_#3B82F6] -translate-x-1/2 animate-scan"></div>
                     
                     {/* Center pulsing core */}
                     <div className="w-16 h-16 bg-[#0F172A] border-2 border-[#3B82F6] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
                     </div>
                     
                     {/* Floating nodes */}
                     <div className="absolute top-2 right-2 w-3 h-3 bg-[#60A5FA] rounded-full animate-ping"></div>
                     <div className="absolute bottom-4 left-2 w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></div>
                     <div className="absolute top-1/2 -right-3 w-2.5 h-2.5 bg-[#BD00FF] rounded-full animate-bounce"></div>
                   </div>

                   <div className="text-center">
                     <p className="text-white text-lg font-bold mb-2">جاري تحليل إجاباتك وإعداد مسارك...</p>
                     <p className="text-[#94A3B8] text-sm animate-pulse">نقوم بمطابقة مهاراتك مع أفضل المسارات التقنية</p>
                   </div>
                 </div>
              ) : (
                <QuestionCard 
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  selectedOption={answers[currentQuestion.id]}
                  onSelectOption={handleSelectOption}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isLastQuestion={currentStepIndex === totalSteps - 1}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default QuestionsFlowContainer;
