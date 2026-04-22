import { HiOutlineChevronRight } from 'react-icons/hi2';

const QuestionHeader = ({ currentStep, totalSteps, onBack, titleOverride, subtitleOverride, hideProgressLine }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">

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
          <div className="flex items-center justify-between text-xs md:text-sm text-[#3B82F6] font-bold mb-2 px-1 mt-4">
            <span>{Math.round(progressPercentage)}% مكتمل</span>
            <span>السؤال {currentStep} من {totalSteps}</span>
            <span>تحديد الشخصية</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionHeader;
