import { HiOutlineChevronRight } from 'react-icons/hi2';

const QuestionHeader = ({ currentStep, totalSteps, onBack, titleOverride, subtitleOverride, hideProgressLine }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-[#94A3B8] font-medium">العودة للرئيسية</div>
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#1E293B] hover:bg-[#2E3C51] flex items-center justify-center transition-colors text-white shadow-lg"
        >
          <HiOutlineChevronRight className="w-5 h-5 text-white ml-1" />
        </button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide leading-tight mt-6">
          {titleOverride || 'اكتشاف المسار المهني'}
        </h1>
        <p className="text-[#94A3B8] text-base md:text-lg mt-3">
          {subtitleOverride || 'يساعدنا في فهم اهتماماتك وأهدافك'}
        </p>
      </div>

      {!hideProgressLine && (
        <>
          <div className="flex items-center justify-between text-sm text-[#146EEC] font-bold mb-3 px-1 mt-6">
            <span>{Math.round(progressPercentage)}% مكتمل</span>
            <span>السؤال {currentStep} من {totalSteps}</span>
            <span>تحديد الشخصية</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mb-12">
            <div 
              className="h-full bg-[#146eec] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionHeader;
