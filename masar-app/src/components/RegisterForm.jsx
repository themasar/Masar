import { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="flex flex-col gap-2 w-full pb-1" dir="rtl">
      {/* NAME */}
      <div className="flex gap-3 mt-2">
        {/* FIRST NAME */}
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="firstName" className="text-white text-xs">
            الاسم الأول
          </label>
          <input
            id="firstName"
            className="w-full px-3 py-1.5 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all placeholder-white/25 focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
          />
        </div>

        {/* LAST NAME */}
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="lastName" className="text-white text-xs">
            الاسم الأخير
          </label>
          <input
            id="lastName"
            className="w-full px-3 py-1.5 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all placeholder-white/25 focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-1.5">
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
            className="w-full px-3 py-2 pl-9 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all placeholder-white/25 focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
            style={{ direction: "ltr", textAlign: "left" }}
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-white text-xs">كلمة المرور</label>
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
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-10 py-2 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
            style={{ direction: "ltr" }}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/65 transition-colors"
          >
            {showPassword ? (
              <svg
                width="14"
                height="14"
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
                width="14"
                height="14"
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

      {/* CONFIRM PASSWORD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-white text-xs">تأكيد كلمة المرور</label>
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
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-10 py-2 rounded-xl text-white text-sm bg-white/5 border border-white/15 outline-none transition-all focus:border-white/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
            style={{ direction: "ltr" }}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/65 transition-colors"
          >
            {showConfirmPassword ? (
              <svg
                width="14"
                height="14"
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
                width="14"
                height="14"
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

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-xl font-bold text-sm mt-1 transition-all hover:brightness-110 active:scale-[0.98] bg-[#AFDDFFBD] text-black"
        style={{
          boxShadow:
            "0 4px 20px rgba(0,77,134,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        إنشاء حساب
      </button>
    </form>
  );
};

export default RegisterForm;
