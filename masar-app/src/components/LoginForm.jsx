import { useState } from "react";

const LoginForm = ({ onForgot }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col gap-4 w-full" dir="rtl">
      {/* Email */}
      <div className="flex flex-col gap-3 mt-3">
        <label className="text-white/80 text-sm font-medium">
          البريد الإلكتروني
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg
              width="15"
              height="15"
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
            className="w-full px-4 py-2.5 pl-10 rounded-xl text-white placeholder-white/30 outline-none transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              fontSize: "14px",
              direction: "ltr",
              textAlign: "left",
            }}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid rgba(255,255,255,0.6)";
              e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1.5px solid rgba(255,255,255,0.2)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-white/80 text-sm font-medium">كلمة المرور</label>
        <div className="relative">
          {/* Lock icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>

          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-10 py-2.5 rounded-xl text-white outline-none transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              fontSize: "14px",
              direction: "ltr",
              textAlign: "left",
            }}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid rgba(255,255,255,0.6)";
              e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1.5px solid rgba(255,255,255,0.2)";
              e.target.style.boxShadow = "none";
            }}
          />

          {/* Eye toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember me & Forgot password */}
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
          onClick={onForgot}
        >
          نسيت كلمة المرور؟
        </button>
        <label className="flex items-center gap-2 text-white/60 cursor-pointer select-none">
          <span>تذكرني</span>
          <input
            type="checkbox"
            className="accent-[#004D86] w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-xl font-bold text-base mt-1 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer bg-[#AFDDFFBD] text-black"
        style={{
          boxShadow:
            "0 4px 20px rgba(0,77,134,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        تسجيل الدخول
      </button>
    </form>
  );
};

export default LoginForm;
