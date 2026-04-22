import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_assessments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setAssessments(data || []);
    } catch (err) {
      console.error('Error fetching assessments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1D83CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getFeedbackLabel = (feedback) => {
    if (feedback === 'suitable') return <span className="text-green-400">مناسب</span>;
    if (feedback === 'not_sure') return <span className="text-orange-400">غير متأكد</span>;
    if (feedback === 'unsuitable') return <span className="text-red-400">غير مناسب</span>;
    return <span className="text-gray-500">-</span>;
  };

  const getPreAnswerLabel = (answers, key) => {
    if (!answers || !answers.answers) return '-';
    const val = answers.answers[key];
    if (key === 'pre1') return val === 'A' ? 'نعم' : val === 'B' ? 'لا' : '-';
    if (key === 'pre2') return val === 'A' ? 'جربته' : val === 'B' ? 'سمعت عنه' : '-';
    return '-';
  };

  return (
    <div className="min-h-screen bg-navy text-white p-8 overflow-y-auto" dir="rtl">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم التقييمات</h1>
          <button 
            onClick={() => window.location.href = '/'} 
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] rounded-xl transition-colors font-bold text-sm"
          >
            العودة للموقع
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-xl mb-6">
            خطأ في جلب البيانات: {error}. يرجى التأكد من إعدادات Supabase وجدول user_assessments.
          </div>
        )}

        <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right whitespace-nowrap">
              <thead className="bg-[#1E293B] text-[#94A3B8]">
                <tr>
                  <th className="px-4 py-4 font-semibold text-sm">التاريخ والوقت</th>
                  <th className="px-4 py-4 font-semibold text-sm">البريد الإلكتروني</th>
                  <th className="px-4 py-4 font-semibold text-sm">محدد تراك؟</th>
                  <th className="px-4 py-4 font-semibold text-sm">بناءً على؟</th>
                  <th className="px-4 py-4 font-semibold text-sm">المسار المرشح</th>
                  <th className="px-4 py-4 font-semibold text-sm">تقييم النتيجة</th>
                  <th className="px-4 py-4 font-semibold text-sm">المسار المقترح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {assessments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-[#94A3B8]">
                      لا توجد بيانات حالياً
                    </td>
                  </tr>
                ) : (
                  assessments.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1E293B]/30 transition-colors">
                      <td className="px-4 py-4 text-sm" dir="ltr">
                        {new Date(item.created_at).toLocaleString('en-GB')}
                      </td>
                      <td className="px-4 py-4 font-medium text-white" dir="ltr">
                        {item.email}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-[#60A5FA]">
                        {getPreAnswerLabel(item.answers, 'pre1')}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#94A3B8]">
                        {getPreAnswerLabel(item.answers, 'pre2')}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-3 py-1 bg-[#1D83CC]/20 text-[#60A5FA] rounded-full text-sm font-semibold">
                          {item.result_track || 'N/A'} 
                          {item.result_confidence && ` (${(item.result_confidence.score * 100).toFixed(0)}%)`}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold">
                        {getFeedbackLabel(item.user_feedback)}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#94A3B8]">
                        {item.user_suggested_track || '-'}
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
