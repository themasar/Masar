import { supabase } from "../lib/supabase";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_API_URL ||
  "https://masar-backend-production-a94e.up.railway.app/api/Recommend";

export const submitAssessment = async (answers, email) => {
  const questionAnswersOnly = Object.fromEntries(
    Object.entries(answers).filter(([key]) => key !== "pre1" && key !== "pre2"),
  );

  const payload = {
    answers: questionAnswersOnly,
    pre1: answers.pre1,
    pre2: answers.pre2 || null,
  };

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  const backendData = await response.json();

  const { data: insertedData, error } = await supabase
    .from("user_assessments")
    .insert([
      {
        email,
        answers: payload,
        result_track: backendData.track,
        result_confidence: backendData.confidence,
        result_traits: backendData.traits,
        result_scores: backendData.scores,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
  }

  return { ...backendData, dbId: insertedData?.[0]?.id || null };
};

export const submitFeedback = async (dbId, feedbackData) => {
  if (!dbId) return;
  const { error } = await supabase
    .from("user_assessments")
    .update(feedbackData)
    .eq("id", dbId);
  if (error) console.error("Feedback error:", error);
};

export const fetchAssessments = async () => {
  const { data, error } = await supabase
    .from("user_assessments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};
