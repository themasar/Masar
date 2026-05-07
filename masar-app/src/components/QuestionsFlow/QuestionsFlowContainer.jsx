import { useAssessment } from "../../hooks/useAssessment";
import { HiOutlineChevronRight } from "react-icons/hi2";
import QuestionHeader from "./QuestionHeader";
import QuestionCard from "./QuestionCard";
import EmailInputStep from "./EmailInputStep";
import LoadingSequence from "./LoadingSequence";
import questionsDataRaw from "../../data/Questions.json";

const questionsData = questionsDataRaw.map((q) => {
  const optionOrder = ["A", "B", "C", "D"];
  const filteredKeys = optionOrder.filter((key) => key in q.options);

  const options = Object.fromEntries(
    filteredKeys.map((key, index) => [
      String.fromCharCode(65 + index),
      q.options[key],
    ]),
  );

  const keyMap = Object.fromEntries(
    filteredKeys.map((key, index) => [String.fromCharCode(65 + index), key]),
  );

  return {
    id: q.id,
    question: q.text,
    options,
    keyMap,
  };
});

const QuestionsFlowContainer = ({ onBackToMain, onComplete }) => {
  const {
    flowState,
    currentStepIndex,
    answers,
    isSubmitting,
    submitError,
    updateAnswer,
    handleNext,
    handlePrev,
    handleEmailSubmit,
    retrySubmit,
  } = useAssessment({ onComplete });

  const totalSteps = questionsData.length;
  const currentQuestion =
    flowState === "questions" ? questionsData[currentStepIndex] : null;

  if (isSubmitting) return <LoadingSequence />;

  if (submitError) {
    return (
      <div
        className="min-h-[100dvh] bg-[#061224] flex flex-col items-center justify-center px-4"
        dir="rtl"
      >
        <div className="bg-[#101827] border border-white/5 rounded-[24px] p-10 max-w-md w-full text-center shadow-lg">
          <div className="text-5xl mb-6">⚠️</div>
          <h2 className="text-white text-xl font-bold mb-3">
            حدث خطأ في الاتصال
          </h2>
          <p className="text-[#94A3B8] text-sm mb-8">
            تعذّر الاتصال بالخادم. يرجى المحاولة مرة أخرى.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={retrySubmit}
              className="w-full bg-[#146EEC] hover:bg-[#1d83ff] text-white font-bold py-3 rounded-[14px] transition-colors"
            >
              إعادة المحاولة
            </button>
            <button
              onClick={onBackToMain}
              className="w-full bg-[#1E293B] hover:bg-[#2d3f56] text-[#94A3B8] font-bold py-3 rounded-[14px] transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-[100dvh] bg-[#061224] flex flex-col justify-center pt-[20px] md:pt-[40px] pb-4 px-4 relative z-20">
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 rtl:left-6 rtl:right-auto md:rtl:left-8 md:rtl:right-auto">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onBackToMain}
        >
          <span className="text-[#94A3B8] font-bold text-sm md:text-base group-hover:text-white transition-colors">
            الرئيسية
          </span>
          <button className="w-10 h-10 rounded-full bg-[#1E293B] group-hover:bg-[#3B82F6] flex items-center justify-center transition-colors shadow-lg">
            <HiOutlineChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[650px] bg-[#061224] min-h-[400px] flex flex-col mx-auto relative z-30">
        {flowState === "email" && <EmailInputStep onNext={handleEmailSubmit} />}

        {(flowState === "pre1" || flowState === "pre2") && (
          <>
            <QuestionHeader
              currentStep={flowState === "pre1" ? 1 : 2}
              totalSteps={2}
              onBack={handlePrev}
              titleOverride="مرحلة ما قبل التقييم"
              subtitleOverride="نحتاج إلى معرفة وضعك الحالي لتوجيهك بشكل أفضل"
              hideProgressLine
            />
            <div className="flex-grow mt-4">
              <QuestionCard
                question={
                  flowState === "pre1"
                    ? "هل محدد تراك معين بالفعل ؟"
                    : "اختيارك ده كان بناء علي ايه ؟"
                }
                options={
                  flowState === "pre1"
                    ? { A: "نعم، حددت تراك", B: "لا، لسه بكتشف" }
                    : {
                        A: "جربته وبدأت فيه فعلاً",
                        B: "عجبني من الكلام اللي بسمعه عنه",
                      }
                }
                selectedOption={answers[flowState]}
                onSelectOption={(val) => updateAnswer(flowState, val)}
                onNext={() => handleNext(questionsData)}
                onPrev={handlePrev}
                onBackToMain={onBackToMain}
                isLastQuestion={false}
              />
            </div>
          </>
        )}

        {flowState === "questions" && currentQuestion && (
          <>
            <QuestionHeader
              currentStep={currentStepIndex + 1}
              totalSteps={totalSteps}
              onBack={handlePrev}
            />
            <div className="flex-grow mt-4">
              <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedOption={Object.keys(currentQuestion.keyMap).find(
                  (displayKey) =>
                    currentQuestion.keyMap[displayKey] ===
                    answers[currentQuestion.id],
                )}
                onSelectOption={(val) =>
                  updateAnswer(currentQuestion.id, currentQuestion.keyMap[val])
                }
                onNext={() => handleNext(questionsData)}
                onPrev={handlePrev}
                onBackToMain={onBackToMain}
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
