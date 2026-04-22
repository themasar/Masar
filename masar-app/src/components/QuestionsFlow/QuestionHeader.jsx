import { HiOutlineChevronRight } from 'react-icons/hi2';

const QuestionHeader = ({ currentStep, totalSteps, onBack, titleOverride, subtitleOverride, hideProgressLine }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[#94A3B8] font-medium text-sm md:text-base">العودة للرئيسية</div>
        <button 
          onClick={onBack}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1E293B] hover:bg-[#2E3C51] flex items-center justify-center transition-colors text-white shadow-lg"
        >
          <HiOutlineChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5 md:ml-1" />
        </button>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5 tracking-wide leading-tight mt-2">
          {titleOverride || 'اكتشاف المسار المهني'}
        </h1>
        <p className="text-[#94A3B8] text-sm md:text-base mt-1">
          {subtitleOverride || 'يساعدنا في فهم اهتماماتك وأهدافك'}
        </p>
      </div>

      {!hideProgressLine && (
        <>
          <div className="flex items-center justify-between text-xs md:text-sm text-[#1D83CC] font-bold mb-2 px-1 mt-4">
            <span>{Math.round(progressPercentage)}% مكتمل</span>
            <span>السؤال {currentStep} من {totalSteps}</span>
            <span>تحديد الشخصية</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-[#1D83CC] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionHeader;
