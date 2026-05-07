import { useState, useEffect } from "react";
import { fetchAssessments } from "../services/assessmentService";

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeedbackLabel = (feedback) => {
    if (feedback === "suitable")
      return <span className="text-green-400">مناسب</span>;
    if (feedback === "not_sure")
      return <span className="text-orange-400">غير متأكد</span>;
    if (feedback === "unsuitable")
      return <span className="text-red-400">غير مناسب</span>;
    return <span className="text-gray-500">-</span>;
  };

  const getPreAnswerLabel = (answers, key) => {
    if (!answers || !answers.answers) return "-";
    const val = answers.answers[key];
    if (key === "pre1") return val === "A" ? "نعم" : val === "B" ? "لا" : "-";
    if (key === "pre2")
      return val === "A" ? "جربته" : val === "B" ? "سمعت عنه" : "-";
    return "-";
  };

  const getConfidenceLevelArabic = (label) => {
    switch (label?.toLowerCase()) {
      case "high":
        return (
          <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
            عالي
          </span>
        );
      case "medium":
        return (
          <span className="text-orange-400 bg-orange-400/10 px-2 py-1 rounded-lg">
            متوسط
          </span>
        );
      case "low":
        return (
          <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded-lg">
            منخفض
          </span>
        );
      default:
        return <span className="text-gray-400">{label || "-"}</span>;
    }
  };

  const formatScores = (scores) => {
    if (!scores) return "-";
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([track, score]) => `${track} (${(score * 100).toFixed(1)}%)`)
      .join(" | ");
  };

  const formatTraits = (traits) => {
    if (!traits) return "-";
    return Object.entries(traits)
      .map(([trait, value]) => `${trait}: ${(value * 100).toFixed(0)}%`)
      .join(" , ");
  };

  useEffect(() => {
    fetchAssessments()
      .then((data) => setAssessments(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1D83CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-navy text-white p-8 overflow-y-auto"
      dir="rtl"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم التقييمات</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] rounded-xl transition-colors font-bold text-sm"
          >
            العودة للموقع
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-xl mb-6">
            خطأ في جلب البيانات: {error}
          </div>
        )}

        <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right whitespace-nowrap">
              <thead className="bg-[#1E293B] text-[#94A3B8]">
                <tr>
                  <th className="px-4 py-4 font-semibold text-sm">
                    التاريخ والوقت
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    البريد الإلكتروني
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    محدد تراك؟
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    بناءً على؟
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    المسار الأول
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    المسار التاني
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    مستوى الثقة
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    نسب المسارات
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    السمات (Traits)
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    تقييم النتيجة
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm">
                    المسار المقترح
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {assessments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="px-6 py-12 text-center text-[#94A3B8]"
                    >
                      لا توجد بيانات حالياً
                    </td>
                  </tr>
                ) : (
                  assessments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1E293B]/30 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm" dir="ltr">
                        {new Date(item.created_at).toLocaleString("en-GB")}
                      </td>
                      <td
                        className="px-4 py-4 font-medium text-white"
                        dir="ltr"
                      >
                        {item.email}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-[#60A5FA]">
                        {getPreAnswerLabel(item.answers, "pre1")}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#94A3B8]">
                        {getPreAnswerLabel(item.answers, "pre2")}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-3 py-1 bg-[#1D83CC]/20 text-[#60A5FA] rounded-full text-sm font-semibold">
                          {item.result_confidence?.top_track ||
                            item.result_track ||
                            "-"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#94A3B8]">
                        {item.result_confidence?.second_track ? (
                          <span className="inline-block px-3 py-1 bg-[#1E293B] rounded-full text-xs">
                            {item.result_confidence.second_track}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold">
                        <div className="flex items-center gap-2">
                          {getConfidenceLevelArabic(
                            item.result_confidence?.label,
                          )}
                          <span className="text-[#94A3B8] text-xs">
                            {item.result_confidence?.score
                              ? `(${(item.result_confidence.score * 100).toFixed(0)}%)`
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-4 py-4 text-xs text-[#94A3B8]"
                        dir="ltr"
                      >
                        {formatScores(item.result_scores)}
                      </td>
                      <td
                        className="px-4 py-4 text-xs text-[#64748B] max-w-[200px] truncate hover:whitespace-normal hover:break-words transition-all duration-300"
                        dir="ltr"
                      >
                        {formatTraits(item.result_traits)}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold">
                        {getFeedbackLabel(item.user_feedback)}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#94A3B8]">
                        {item.user_suggested_track || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
