import { useNavigate } from "react-router-dom";
import QuestionsFlow from "../components/QuestionsFlow";

const AssessmentPage = () => {
  const navigate = useNavigate();

  return <QuestionsFlow onBackToMain={() => navigate("/")} />;
};

export default AssessmentPage;
