import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { HiOutlineLockClosed } from "react-icons/hi2";

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("يرجى إدخال كلمة المرور");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Query the admin_users table for a matching password
      const { data, error: dbError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("password", password)
        .single();

      if (dbError || !data) {
        setError("كلمة المرور غير صحيحة");
      } else {
        // Success
        onLoginSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الاتصال بقاعدة البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#101822] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1D83CC]/10 rounded-2xl flex items-center justify-center mb-4">
            <HiOutlineLockClosed className="w-8 h-8 text-[#1D83CC]" />
          </div>
          <h2 className="text-2xl font-bold text-white">لوحة تحكم الإدارة</h2>
          <p className="text-[#94A3B8] text-sm mt-2">
            يرجى إدخال كلمة المرور للمتابعة
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#101822] border border-[#1E293B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1D83CC] focus:ring-1 focus:ring-[#1D83CC] transition-colors text-center"
              dir="ltr"
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1D83CC] hover:bg-[#105bc5] text-white py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
