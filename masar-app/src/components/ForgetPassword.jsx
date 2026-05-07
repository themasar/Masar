import { useState } from "react";

const ForgetPassword = ({ onBack }) => {
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 py-10 text-center"
        dir="rtl"
      >
        <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-white font-bold text-base">تم الإرسال!</p>
        <p className="text-white text-xs leading-5">
          راجع بريدك الإلكتروني
          <br />
          وافتح رابط استعادة كلمة المرور
        </p>
        <button
          onClick={onBack}
          className="text-blue-400 hover:text-blue-300 text-xs transition-colors mt-1"
        >
          ← رجوع لتسجيل الدخول
        </button>
      </div>
    );

  return (
    <form
      className="flex flex-col gap-3 w-full py-6"
      dir="rtl"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {/* ICON */}
      <div className="flex justify-center mb-1">
        <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.8"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polyline points="2,4 12,13 22,4" />
          </svg>
        </div>
      </div>

      {/* TEXT */}
      <div className="text-center mb-1">
        <p className="text-white/50 text-xs leading-5">
          أدخل بريدك الإلكتروني وهنبعتلك
          <br />
          رابط لاستعادة كلمة المرور
        </p>
      </div>

      {/* INPUT */}
      <div className="flex flex-col gap-1">
        <label className="text-white text-xs">البريد الإلكتروني</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </span>
          <input
            type="email"
            placeholder="example@email.com"
            required
            className="w-full px-3 py-1.5 pl-9 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all placeholder-white/25 focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
            style={{ direction: "ltr", textAlign: "left" }}
          />
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full py-2 rounded-xl font-bold text-sm transition-all hover:brightness-110 active:scale-[0.98] bg-[#AFDDFFBD] text-black"
        style={{
          boxShadow:
            "0 4px 20px rgba(0,77,134,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        إرسال رابط الاستعادة
      </button>

      {/* BACK */}
      <button
        type="button"
        onClick={onBack}
        className="text-white/40 hover:text-white/70 text-xs text-center transition-colors"
      >
        ← رجوع لتسجيل الدخول
      </button>
    </form>
  );
};

export default ForgetPassword;
