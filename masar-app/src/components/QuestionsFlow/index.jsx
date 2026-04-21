import { useState } from 'react';
import QuestionsFlowContainer from './QuestionsFlowContainer';
import LoadingSequence from './LoadingSequence';
import FinalResult from './FinalResult';

export const QuestionsFlow = ({ onBackToMain }) => {
  const [phase, setPhase] = useState('questions'); // 'questions' | 'loading' | 'result'
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleCompleteQuestions = (backendData) => {
    setAssessmentResult(backendData);
    setPhase('loading');
  };

  const handleLoadingFinished = () => {
    setPhase('result');
  };

  return (
    <div className="w-full">
      {phase === 'questions' && (
        <QuestionsFlowContainer 
          onBackToMain={onBackToMain} 
          onComplete={handleCompleteQuestions} 
        />
      )}
      
      {phase === 'loading' && (
        <LoadingSequence onFinish={handleLoadingFinished} />
      )}
      
      {phase === 'result' && (
        <FinalResult onRestart={onBackToMain} result={assessmentResult} />
      )}
    </div>
  );
};
