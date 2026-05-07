import React, { useState } from "react";
import {
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentCheck,
} from "react-icons/hi2";
import { supabase } from "../../lib/supabase";
import { TRACK_DETAILS, TRACK_OPTIONS } from "../../data/tracks";

const FinalResult = ({ onRestart, result, onNavigate }) => {
  const [feedback, setFeedback] = useState(null);
  const [suggestedTrack, setSuggestedTrack] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  let topTracks = [];
  if (result?.confidence?.top_track) {
    const trackKey = result.confidence.top_track;
    const matchScore =
      result.confidence?.score !== undefined
        ? Math.round(result.confidence.score * 100)
        : 0;
    topTracks = [{ trackKey, score: matchScore }];
  } else if (result?.scores) {
    topTracks = Object.entries(result.scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 1)
      .map(([trackKey, score]) => ({
        trackKey,
        score: Math.round(score * 100),
      }));
  }

  const normalizeTrackKey = (key) => {
    const map = {
      Mobile: "Mobile Applications",
      "Mobile Application": "Mobile Applications",
      Testing: "Software Testing",
      frontend: "Frontend",
      backend: "Backend",
      ai: "AI",
    };
    return map[key] || key;
  };

  const recommendations =
    topTracks.length > 0
      ? topTracks.map((t) => {
        const normalizedKey = normalizeTrackKey(t.trackKey);
        const details = TRACK_DETAILS[normalizedKey];
        return {
          ...(details || {}),
          match: t.score.toString(),
          title: details ? details.title : t.trackKey,
          badgeColor: details?.badgeColor || "bg-[#94A3B8]",
        };
      })
      : [{ ...TRACK_DETAILS["Frontend"], match: "95" }];

  const handleFeedbackSubmit = async (selectedFeedback) => {
    setFeedback(selectedFeedback);
    if (selectedFeedback !== "unsuitable") {
      await submitToDb(selectedFeedback, null);
    }
  };

  const handleTrackSuggestSubmit = async () => {
    if (!suggestedTrack) return;
    await submitToDb("unsuitable", suggestedTrack);
  };

  const submitToDb = async (fbValue, trackValue) => {
    if (!result?.dbId) {
      console.warn("No DB ID found to update feedback.");
      setFeedbackSubmitted(true);
      return;
    }
    setIsSubmittingFeedback(true);
    try {
      const { error } = await supabase
        .from("user_assessments")
        .update({
          user_feedback: fbValue,
          user_suggested_track: trackValue,
          user_rejection_reason:
            trackValue === "غير ذلك" ? rejectionReason : null,
        })
        .eq("id", result.dbId);
      if (error) console.error("Error updating feedback:", error);
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error("Error updating feedback:", err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 flex flex-col items-center justify-center min-h-[100dvh] animate-fade-in relative z-20">
      {/* Header Back Button */}
      <div className="w-full flex items-center justify-start absolute top-6 right-6 rtl:left-auto rtl:right-6">
        <button
          onClick={() => {
            onRestart();
            onNavigate("/");
          }}
          className="flex items-center gap-2 text-white hover:text-[#94A3B8] transition-colors font-bold text-sm cursor-pointer"
        >
          <HiOutlineChevronRight className="w-5 h-5 rtl:hidden" />
          <HiOutlineChevronRight className="w-5 h-5 hidden rtl:block rotate-180" />
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="text-center mb-8 mt-12 w-full flex flex-col items-center">
        <div className="inline-flex items-center justify-center gap-2 bg-[#052E16] text-[#22C55E] border border-[#22C55E]/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(34,197,94,0.15)] font-bold text-xs">
          <span>التحليل مكتمل</span>
          <HiOutlineCheckCircle className="w-4 h-4" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-wide">
          المسار المهني الموصى به لك
        </h1>
        <p className="text-[#94A3B8] text-sm md:text-base max-w-2xl mx-auto">
          بناءً على إجاباتك، قمنا باختيار مسار التعلم المثالي لك
        </p>
      </div>

      {/* Result Card */}
      <div className="flex justify-center w-full max-w-[600px] mb-4 mx-auto">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="w-full relative border border-[#1E293B] rounded-[24px] bg-[#0B1120] overflow-hidden flex flex-col hover:border-[#334155] transition-all duration-300 shadow-xl"
          >
            {/* Match Badge */}
            <div className="absolute top-0 left-0 z-10">
              <div
                className={`flex flex-col items-center justify-center w-[132px] h-[124px] rounded-br-[24px] ${rec.badgeColor} text-white shadow-[5px_5px_15px_rgba(0,0,0,0.2)]`}
              >
                <div className="flex items-center gap-0.5" dir="ltr">
                  <span className="font-bold text-2xl leading-none">
                    {rec.match}
                  </span>
                  <span className="text-2xl font-bold opacity-90">%</span>
                </div>
                <span className="text-lg font-bold mt-1">تطابق</span>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col h-full flex-grow text-right relative z-10">
              <div className="pl-20 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 pr-2">
                  {rec.title}
                </h2>
                <p className="text-[#94A3B8] text-xs md:text-sm leading-relaxed pr-2">
                  {rec.description}
                </p>
              </div>

              {/* Explanation Section */}
              {result?.explanation && result.explanation.length > 0 && (
                <div className="pr-2 mb-6">
                  <p className="text-white text-sm mb-3 font-bold flex items-center gap-2">
                    <span
                      className={`w-1.5 h-4 ${rec.badgeColor} rounded-full inline-block`}
                    ></span>
                    لماذا تم ترشيح هذا المسار؟
                  </p>
                  <ul className="space-y-2">
                    {result.explanation.map((text, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#94A3B8] text-xs leading-relaxed"
                      >
                        <span className="shrink-0 w-1 h-1 rounded-full bg-[#60A5FA] mt-1.5"></span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Feedback */}
              <div className="mt-auto pt-4 border-t border-[#1E293B]">
                {!feedbackSubmitted ? (
                  <>
                    {feedback !== "unsuitable" ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-[#94A3B8] text-xs font-bold shrink-0">
                          النتيجة بتعبر عن ميولك؟
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFeedbackSubmit("suitable")}
                            className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E] hover:text-white px-3 py-1.5 rounded-lg transition-colors font-bold text-xs"
                          >
                            نعم، مناسب
                          </button>
                          <button
                            onClick={() => handleFeedbackSubmit("not_sure")}
                            className="bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] hover:bg-[#F97316] hover:text-white px-3 py-1.5 rounded-lg transition-colors font-bold text-xs"
                          >
                            مش متأكد
                          </button>
                          <button
                            onClick={() => setFeedback("unsuitable")}
                            className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-3 py-1.5 rounded-lg transition-colors font-bold text-xs"
                          >
                            غير مناسب
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end text-right animate-fade-in gap-3">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-white text-sm font-bold">
                            ايه التراك اللي شايفه مناسب؟
                          </p>
                          <button
                            onClick={() => {
                              setFeedback(null);
                              setSuggestedTrack("");
                              setRejectionReason("");
                            }}
                            className="text-[#64748B] hover:text-white text-xs transition-colors"
                          >
                            إلغاء
                          </button>
                        </div>

                        {/* Dropdown */}
                        <div className="w-full relative">
                          <select
                            value={suggestedTrack}
                            onChange={(e) => {
                              setSuggestedTrack(e.target.value);
                              setRejectionReason("");
                            }}
                            dir="rtl"
                            className="w-full appearance-none bg-[#101822] border border-[#1E293B] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-xl px-4 py-2.5 text-xs font-bold text-right focus:outline-none transition-colors cursor-pointer"
                            style={{
                              color: suggestedTrack ? "white" : "#64748B",
                            }}
                          >
                            <option
                              value=""
                              disabled
                              style={{ color: "#64748B" }}
                            >
                              اختار التراك...
                            </option>
                            {TRACK_OPTIONS.map((track, idx) => (
                              <option
                                key={idx}
                                value={track}
                                style={{
                                  color: "white",
                                  background: "#101822",
                                }}
                              >
                                {track}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                            <svg
                              className="w-4 h-4 text-[#64748B]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Textarea — only when a track is selected */}
                        {suggestedTrack && (
                          <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="ليه شايف إن التراك ده مناسب أكتر؟"
                            rows={2}
                            className="w-full bg-[#101822] border border-[#1E293B] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#3B82F6] resize-none transition-colors"
                            dir="rtl"
                          />
                        )}

                        <button
                          onClick={handleTrackSuggestSubmit}
                          disabled={!suggestedTrack || !rejectionReason || isSubmittingFeedback}
                          className="bg-[#3B82F6] text-white py-2 px-6 rounded-lg font-bold text-xs hover:bg-[#2563EB] disabled:opacity-50 transition-colors self-stretch"
                        >
                          {isSubmittingFeedback ? "جاري الإرسال..." : "إرسال"}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-1 animate-fade-in">
                    <HiOutlineCheckCircle className="w-4 h-4 text-[#22C55E]" />
                    <p className="text-[#94A3B8] text-xs font-bold">
                      شكراً! ملاحظاتك بتساعدنا نحسن النظام
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Button */}
      <div className="w-full max-w-[600px] mb-8 mx-auto relative group">
        <button
          disabled
          className="w-full bg-[#1E293B] text-[#64748B] py-3 rounded-xl font-bold text-sm md:text-base cursor-not-allowed"
        >
          عرض خارطة الطريق
        </button>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#1E293B] text-white text-base px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          قريباً
        </div>
      </div>

      {/* Global CTA */}
      <div className="w-full max-w-[600px] flex items-center justify-center border-t border-[#1E293B] pt-6 mb-10">
        <div className="relative group w-full sm:w-auto order-2 sm:order-1">
          <button
            onClick={() => onNavigate("/#tracks")}
            className="w-full sm:w-auto bg-[#146EEC] text-[#FFFFFF] py-3 px-8 rounded-xl font-bold transition-colors text-sm cursor-pointer hover:bg-[#0F5AC1]"
          >
            تصفح كل المسارات
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalResult;
