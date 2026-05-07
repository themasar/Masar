import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgetPassword from "../components/ForgetPassword";
import { robotImage } from "../assets/Images";

const LoginPage = () => {
  const [active, setActive] = useState("login");

  const titles = {
    login: { h1: "مرحباً بعودتك !", p: "سجل دخولك للمتابعة إلى حسابك" },
    register: { h1: "مرحباً بك !", p: "أنشئ حسابك الآن للاستفادة من خدماتنا" },
    forgot: {
      h1: "إعادة تعيين كلمة المرور",
      p: "أدخل بريدك وسنرسل لك رابط الاستعادة",
    },
  };

  return (
    <div className="min-h-screen bg-[url(/images/loginBackground.jpg)] bg-cover bg-center relative">
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#020D15]/75" />

      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating robot */}
        <img
          src={robotImage}
          alt=""
          className="animate-float absolute w-[300px] left-40 z-10 hidden xl:block select-none"
          style={{ filter: "drop-shadow(0 20px 60px rgba(0,150,255,0.35))" }}
          draggable={false}
        />

        {/* CARD */}
        <div
          className="relative p-6 w-full max-w-[750px] mx-4"
          style={{
            backgroundColor: "rgba(13, 25, 34, 0.6)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            boxShadow: `
              0 0 0 1.5px rgba(255, 255, 255, 0.6),
              0 0 55px 25px rgba(255, 255, 255, 0.2),
              0 8px 50px rgba(0, 0, 0, 0.5)
            `,
            border: "1px solid #ffffff",
          }}
        >
          <div className="max-w-[500px] mx-auto w-full">
            {/* LOGO */}
            <img
              src="/images/logo.png"
              alt="logo"
              className="absolute top-0 right-0 w-20"
            />

            <h1 className="text-[#AFDDFF] mt-10 text-center font-bold text-2xl">
              {titles[active].h1}
            </h1>
            <p className="text-center text-sm opacity-60 pt-2">
              {titles[active].p}
            </p>

            {/* TOGGLE BUTTONS */}
            {active !== "forgot" && (
              <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm mt-4">
                <button
                  onClick={() => setActive("login")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active === "login"
                      ? "bg-[#AFDDFFBD] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => setActive("register")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active === "register"
                      ? "bg-[#AFDDFFBD] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  إنشاء حساب
                </button>
              </div>
            )}

            {/* FORM */}
            <div className="overflow-y-auto flex-1 min-h-0 scrollbar-none mt-1">
              {active === "login" && (
                <LoginForm onForgot={() => setActive("forgot")} />
              )}
              {active === "register" && <RegisterForm />}
              {active === "forgot" && (
                <ForgetPassword onBack={() => setActive("login")} />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
