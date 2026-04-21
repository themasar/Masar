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
        <div className="w-16 h-16 border-4 border-[#146EEC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم التقييمات</h1>
          <button 
            onClick={() => window.location.hash = ''} 
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] rounded-xl transition-colors"
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
            <table className="w-full text-right">
              <thead className="bg-[#1E293B] text-[#94A3B8]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-sm">التاريخ والوقت</th>
                  <th className="px-6 py-4 font-semibold text-sm">البريد الإلكتروني</th>
                  <th className="px-6 py-4 font-semibold text-sm">المسار المرشح</th>
                  <th className="px-6 py-4 font-semibold text-sm">مستوى الثقة</th>
                  <th className="px-6 py-4 font-semibold text-sm">النتائج الأولية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {assessments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-[#94A3B8]">
                      لا توجد بيانات حالياً
                    </td>
                  </tr>
                ) : (
                  assessments.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1E293B]/30 transition-colors">
                      <td className="px-6 py-4 text-sm" dir="ltr">
                        {new Date(item.created_at).toLocaleString('en-GB')}
                      </td>
                      <td className="px-6 py-4 font-medium text-white" dir="ltr">
                        {item.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-[#146EEC]/20 text-[#60A5FA] rounded-full text-sm font-semibold">
                          {item.result_track || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">
                        {item.result_confidence ? (
                          <span>{item.result_confidence.label} ({(item.result_confidence.score * 100).toFixed(0)}%)</span>
                        ) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#64748B] max-w-xs truncate" dir="ltr">
                        {item.answers ? JSON.stringify(item.answers.answers) : 'No answers'}
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
