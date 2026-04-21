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
    <div className="w-full flex flex-col h-full min-h-[400px]">
      <h2 className={`text-white font-bold text-center leading-relaxed ${questionSub ? 'mb-2 text-xl md:text-2xl' : 'mb-6 text-lg md:text-xl'}`}>{question}</h2>
      {questionSub && <p className="text-center text-[#94A3B8] mb-6">{questionSub}</p>}

      <div className={`
        flex flex-col gap-3 mb-6 flex-grow
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
                relative rounded-2xl flex transition-all duration-300 border-2 text-right items-center justify-start px-5 py-3.5 md:py-4
                ${isSelected 
                  ? 'border-[#146EEC] bg-[#146EEC]/10 shadow-[0_0_20px_rgba(20,110,236,0.3)] scale-[1.02]' 
                  : 'border-[#1E293B] bg-[#0B1120] hover:border-[#3B82F6]/50 hover:bg-[#1E293B]/50 hover:-translate-y-1 hover:shadow-lg'
                }
              `}
            >
               <div className="flex items-center gap-4 w-full">
                  <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold transition-colors ${isSelected ? 'bg-[#146EEC] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
                    {key}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-base md:text-lg leading-relaxed ${isSelected ? 'text-[#146EEC]' : 'text-white'}`}>{option.text}</h3>
                    {option.subText && <p className="text-[#94A3B8] text-sm mt-1">{option.subText}</p>}
                  </div>
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
            flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300
            ${!isNextDisabled 
              ? 'bg-[#146EEC] text-white hover:bg-[#105bc5] hover:shadow-[0_0_15px_rgba(20,110,236,0.3)]' 
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
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-[#1E293B] group"
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
