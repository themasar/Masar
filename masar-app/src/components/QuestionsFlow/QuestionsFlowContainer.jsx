import { useState } from 'react';
import QuestionHeader from './QuestionHeader';
import QuestionCard from './QuestionCard';
import EmailInputStep from './EmailInputStep';
import questionsDataRaw from '../../data/Questions.json';
import { supabase } from '../../lib/supabase';
import LoadingSequence from './LoadingSequence';
import { HiOutlineChevronRight } from 'react-icons/hi2';

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
  const [flowState, setFlowState] = useState('email'); // 'email', 'pre1', 'pre2', 'questions'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = questionsData.length;
  const currentQuestion = flowState === 'questions' ? questionsData[currentStepIndex] : null;

  const handleSelectOption = (optionId) => {
    if (flowState === 'pre1') {
      setAnswers(prev => ({ ...prev, pre1: optionId }));
    } else if (flowState === 'pre2') {
      setAnswers(prev => ({ ...prev, pre2: optionId }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    }
  };

  const handleNext = async () => {
    if (flowState === 'pre1') {
      if (answers.pre1 === 'A') {
        setFlowState('pre2');
      } else {
        setFlowState('questions');
      }
    } else if (flowState === 'pre2') {
      setFlowState('questions');
    } else if (flowState === 'questions') {
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Finished all questions
        await submitAssessment();
      }
    }
  };

  const handlePrev = () => {
    if (flowState === 'pre1') {
      setFlowState('email');
    } else if (flowState === 'pre2') {
      setFlowState('pre1');
    } else if (flowState === 'questions') {
      if (currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      } else {
        // If at first question, go back to pre2 or pre1 depending on answer
        if (answers.pre1 === 'A') {
          setFlowState('pre2');
        } else {
          setFlowState('pre1');
        }
      }
    }
  };

  const handleEmailSubmit = (userEmail) => {
    setEmail(userEmail);
    setFlowState('pre1');
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    const startTime = Date.now();
    
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
      const { data: insertedData, error } = await supabase
        .from('user_assessments')
        .insert([{
          email: email,
          answers: formattedAnswers,
          result_track: backendData.track,
          result_confidence: backendData.confidence,
          result_traits: backendData.traits,
          result_scores: backendData.scores
        }])
        .select();
        
      if (error) {
        console.error("Error saving to Supabase:", error);
      }

      // Pass dbId along with backendData to be used for updates in FinalResult
      const resultData = {
        ...backendData,
        dbId: insertedData?.[0]?.id || null
      };

      // Ensure loading animation plays for at least 4 seconds
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 4000) {
        await new Promise(r => setTimeout(r, 4000 - elapsedTime));
      }

      // 3. Complete Flow and pass result back
      onComplete(resultData);

    } catch (error) {
      console.error("Submission error:", error);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreQuestions = () => {
    if (flowState === 'pre1') {
      return (
        <>
          <QuestionHeader
            currentStep={1}
            totalSteps={2}
            onBack={handlePrev}
            titleOverride="مرحلة ما قبل التقييم"
            subtitleOverride="نحتاج إلى معرفة وضعك الحالي لتوجيهك بشكل أفضل"
            hideProgressLine={true}
          />
          <div className="flex-grow mt-4">
            <QuestionCard 
              question="هل محدد تراك معين بالفعل ؟"
              options={{ "A": "نعم، حددت تراك", "B": "لا، لسه بكتشف" }}
              selectedOption={answers.pre1}
              onSelectOption={(opt) => handleSelectOption(opt)}
              onNext={handleNext}
              onPrev={handlePrev}
              isLastQuestion={false}
            />
          </div>
        </>
      );
    }
    
    if (flowState === 'pre2') {
      return (
        <>
          <QuestionHeader
            currentStep={2}
            totalSteps={2}
            onBack={handlePrev}
            titleOverride="مرحلة ما قبل التقييم"
            subtitleOverride="نحتاج إلى معرفة وضعك الحالي لتوجيهك بشكل أفضل"
            hideProgressLine={true}
          />
          <div className="flex-grow mt-4">
            <QuestionCard 
              question="اختيارك ده كان بناء علي ايه ؟"
              options={{
                "A": "جربته وبدأت فيه فعلاً",
                "B": "عجبني من الكلام اللي بسمعه عنه"
              }}
              selectedOption={answers.pre2}
              onSelectOption={(opt) => handleSelectOption(opt)}
              onNext={handleNext}
              onPrev={handlePrev}
              isLastQuestion={false}
            />
          </div>
        </>
      );
    }
    return null;
  };

  if (isSubmitting) {
    return <LoadingSequence />;
  }

  return (
    <section className="min-h-[100dvh] bg-[#061224] flex flex-col justify-center pt-[20px] md:pt-[40px] pb-4 px-4 relative z-20">
      
      {/* Absolute Back Button */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 rtl:left-6 rtl:right-auto md:rtl:left-8 md:rtl:right-auto">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handlePrev}>
          <span className="text-[#94A3B8] font-bold text-sm md:text-base group-hover:text-white transition-colors">
            {flowState === 'email' ? 'العودة للموقع' : 'السابق'}
          </span>
          <button className="w-10 h-10 rounded-full bg-[#1E293B] group-hover:bg-[#3B82F6] flex items-center justify-center transition-colors shadow-lg">
            <HiOutlineChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[650px] bg-[#061224] min-h-[400px] flex flex-col mx-auto relative z-30">
        
        {flowState === 'email' && <EmailInputStep onNext={handleEmailSubmit} />}
        
        {(flowState === 'pre1' || flowState === 'pre2') && renderPreQuestions()}

        {flowState === 'questions' && (
          <>
            <QuestionHeader
              currentStep={currentStepIndex + 1}
              totalSteps={totalSteps}
              onBack={handlePrev}
              titleOverride={currentQuestion.titleOverride}
              subtitleOverride={currentQuestion.subtitleOverride}
            />

            <div className="flex-grow mt-4">
              <QuestionCard 
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedOption={answers[currentQuestion.id]}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                onPrev={handlePrev}
                isLastQuestion={currentStepIndex === totalSteps - 1}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default QuestionsFlowContainer;
