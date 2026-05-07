import { useState } from "react";
import { submitAssessment } from "../services/assessmentService";

export const useAssessment = ({ onComplete }) => {
  const [email, setEmail] = useState("");
  const [flowState, setFlowState] = useState("email");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async (questionsData) => {
    const totalSteps = questionsData.length;

    if (flowState === "pre1") {
      setFlowState(answers.pre1 === "A" ? "pre2" : "questions");
    } else if (flowState === "pre2") {
      setFlowState("questions");
    } else if (flowState === "questions") {
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        await handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (flowState === "pre1") {
      setFlowState("email");
    } else if (flowState === "pre2") {
      setFlowState("pre1");
    } else if (flowState === "questions") {
      if (currentStepIndex > 0) {
        setCurrentStepIndex((prev) => prev - 1);
      } else {
        setFlowState(answers.pre1 === "A" ? "pre2" : "pre1");
      }
    }
  };

  const handleEmailSubmit = (userEmail) => {
    setEmail(userEmail);
    setFlowState("pre1");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const startTime = Date.now();
    try {
      const result = await submitAssessment(answers, email);
      const elapsed = Date.now() - startTime;
      if (elapsed < 4000) {
        await new Promise((r) => setTimeout(r, 4000 - elapsed));
      }
      onComplete(result);
    } catch (err) {
      console.error(err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const retrySubmit = () => {
    setSubmitError(false);
    handleSubmit();
  };

  return {
    email,
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
  };
};
