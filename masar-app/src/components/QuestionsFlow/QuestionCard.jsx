import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

const QuestionCard = ({ question, questionSub, options, selectedOption, onSelectOption, isMultiSelect, onNext, onPrev, isLastQuestion, layout }) => {
  // Determine if options is an array or object
  const optionsEntries = Array.isArray(options) 
    ? options.map(opt => [opt.id, opt]) 
    : Object.entries(options).map(([key, value]) => [key, { id: key, text: value }]);

  const handleOptionClick = (optionId) => {
    if (isMultiSelect) {
      let currentSelected = Array.isArray(selectedOption) ? selectedOption : [];
      if (currentSelected.includes(optionId)) {
         onSelectOption(currentSelected.filter(id => id !== optionId));
      } else {
         onSelectOption([...currentSelected, optionId]);
      }
    } else {
      onSelectOption(optionId);
    }
  };

  const isNextDisabled = isMultiSelect 
    ? (!selectedOption || selectedOption.length === 0)
    : !selectedOption;

  return (
    <div className="w-full flex flex-col h-full min-h-[300px]">
      <h2 className={`text-white font-bold text-center leading-relaxed ${questionSub ? 'mb-2 text-lg md:text-xl' : 'mb-4 text-base md:text-lg'}`}>{question}</h2>
      {questionSub && <p className="text-center text-[#94A3B8] mb-4">{questionSub}</p>}

      <div className={`
        grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 flex-grow content-center
      `}>
        {optionsEntries.map(([key, option]) => {
          const isSelected = isMultiSelect 
            ? (Array.isArray(selectedOption) && selectedOption.includes(option.id))
            : (selectedOption === option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`
                relative rounded-2xl flex flex-col transition-all duration-300 border-2 text-right items-start justify-center p-4 md:p-5
                ${isSelected 
                  ? 'border-[#1D83CC] bg-[#1D83CC]/10 shadow-[0_0_20px_rgba(20,110,236,0.3)] scale-[1.02] z-10' 
                  : 'border-[#1E293B] bg-[#0B1120] hover:border-[#3B82F6]/50 hover:bg-[#1E293B]/50 hover:-translate-y-1 hover:shadow-lg'
                }
              `}
            >
               <div className="flex flex-row items-center gap-3 w-full mb-2">
                  <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-base font-bold transition-colors ${isSelected ? 'bg-[#1D83CC] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
                    {key}
                  </div>
               </div>
               <div className="w-full">
                  <h3 className={`font-semibold text-sm md:text-base leading-relaxed ${isSelected ? 'text-[#1D83CC]' : 'text-white'}`}>{option.text}</h3>
                  {option.subText && <p className="text-[#94A3B8] text-xs mt-1">{option.subText}</p>}
               </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base
            ${!isNextDisabled 
              ? 'bg-[#1D83CC] text-white hover:bg-[#105bc5] hover:shadow-[0_0_15px_rgba(20,110,236,0.3)]' 
              : 'bg-[#1E293B] text-[#64748B] cursor-not-allowed'
            }
          `}
        >
          <span>{isLastQuestion ? 'إرسال وعرض النتيجة' : 'التالي'}</span>
          <HiOutlineChevronLeft className="w-5 h-5" />
        </button>

        {onPrev && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-[#1E293B] group text-sm md:text-base"
          >
            <HiOutlineChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <span>السابق</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
