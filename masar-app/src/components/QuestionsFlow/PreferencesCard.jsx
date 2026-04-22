import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { HiOutlineVideoCamera, HiOutlineBookOpen, HiOutlineCodeBracket, HiOutlineClock, HiOutlineBriefcase, HiOutlineBolt } from 'react-icons/hi2';

const PreferencesCard = ({ questionData, answers, onUpdateAnswers, onNext, onPrev, isLastQuestion }) => {
  
  const handleStyleOptionClick = (optionId) => {
    const currentSelected = answers['learning_style'] || [];
    if (currentSelected.includes(optionId)) {
      onUpdateAnswers('learning_style', currentSelected.filter(id => id !== optionId));
    } else {
      onUpdateAnswers('learning_style', [...currentSelected, optionId]);
    }
  };

  const handleSpeedOptionClick = (optionId) => {
    onUpdateAnswers('learning_speed', optionId);
  };

  const selectedStyles = answers['learning_style'] || [];
  const selectedSpeed = answers['learning_speed'];

  const isNextDisabled = selectedStyles.length === 0 || !selectedSpeed;

  const styleOptions = [
    { id: 'style_video', icon: <HiOutlineVideoCamera className="w-6 h-6" />, text: 'فيديوهات تعليمية', subText: 'شاهد وتعلم بالسرعة التي تناسبك' },
    { id: 'style_book', icon: <HiOutlineBookOpen className="w-6 h-6" />, text: 'مواد قراءة', subText: 'مقالات، أدلة ومستندات' },
    { id: 'style_project', icon: <HiOutlineCodeBracket className="w-6 h-6" />, text: 'مشاريع عملية', subText: 'تعلم من خلال بناء أشياء حقيقية' },
  ];

  const speedOptions = [
    { id: 'speed_fast', icon: <HiOutlineBriefcase className="w-6 h-6" />, text: 'مريح', subText: '2-3 ساعات أسبوعياً', subTextLeft: '3-4 أشهر لكل مرحلة' },
    { id: 'speed_balanced', icon: <HiOutlineClock className="w-6 h-6" />, text: 'متوسط', subText: '5-7 ساعات أسبوعياً', subTextLeft: '2-3 أشهر لكل مرحلة' },
    { id: 'speed_flexible', icon: <HiOutlineBolt className="w-6 h-6" />, text: 'مكثف', subText: '10+ ساعات أسبوعياً', subTextLeft: '1-2 شهر لكل مرحلة' },
  ];

  return (
    <div className="w-full flex flex-col h-full pl-4 md:pl-0">
      <div className="space-y-6 flex-grow mb-12">
        {/* Learning Style Section */}
        <div className="border border-[#1E293B] rounded-2xl p-6 bg-[#0B1120]/50 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-6">
            <div className="text-right w-full">
              <h2 className="text-[#60A5FA] font-bold text-xl md:text-2xl mb-1">طريقة التعلم المفضلة</h2>
              <p className="text-[#94A3B8] text-sm">اختر كل ما ينطبق</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styleOptions.map((option) => {
              const isSelected = selectedStyles.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleStyleOptionClick(option.id)}
                  className={`
                    relative rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border py-8 px-4
                    ${isSelected 
                      ? 'border-[#1D83CC] bg-[#1D83CC]/10 shadow-[0_0_15px_rgba(20,110,236,0.1)]' 
                      : 'border-[#1E293B] bg-transparent hover:border-[#334155] hover:bg-[#1E293B]/50'
                    }
                  `}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-colors ${isSelected ? 'text-[#60A5FA]' : 'text-white'}`}>
                    {option.icon}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-[#60A5FA]' : 'text-white'}`}>{option.text}</h3>
                  <p className="text-[#94A3B8] text-xs">{option.subText}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Speed Section */}
        <div className="border border-[#1E293B] rounded-2xl p-6 bg-[#0B1120]/50 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-6">
            <div className="text-right w-full">
              <h2 className="text-[#60A5FA] font-bold text-xl md:text-2xl mb-1">سرعة التعلم</h2>
              <p className="text-[#94A3B8] text-sm">كم من الوقت يمكنك تخصيصه؟</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {speedOptions.map((option) => {
              const isSelected = selectedSpeed === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSpeedOptionClick(option.id)}
                  className={`
                    relative rounded-xl flex items-center justify-between transition-all duration-300 border text-right px-6 py-5
                    ${isSelected 
                      ? 'border-[#1D83CC] bg-[#1D83CC]/10 shadow-[0_0_15px_rgba(20,110,236,0.1)]' 
                      : 'border-[#1E293B] bg-transparent hover:border-[#334155] hover:bg-[#1E293B]/50'
                    }
                  `}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-[#60A5FA] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
                         {option.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>{option.text}</h3>
                        <p className="text-[#94A3B8] text-xs">{option.subText}</p>
                      </div>
                   </div>
                   <div className="text-left hidden sm:block">
                      <span className="text-[#94A3B8] text-xs leading-relaxed inline-block max-w-[120px]">{option.subTextLeft}</span>
                   </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Centered bottom button like screenshot) */}
      <div className="flex items-center justify-center mt-auto">
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`
            flex items-center justify-center px-10 py-3.5 rounded-xl font-bold transition-all duration-300
            ${!isNextDisabled 
              ? 'bg-[#1D83CC] text-white hover:bg-[#105bc5] hover:shadow-[0_0_15px_rgba(20,110,236,0.3)]' 
              : 'bg-[#1E293B] text-[#64748B] cursor-not-allowed'
            }
          `}
        >
          <span>{isLastQuestion ? 'أنشئ خارطة طريقي' : 'التالي'}</span>
        </button>
      </div>
    </div>
  );
};

export default PreferencesCard;
