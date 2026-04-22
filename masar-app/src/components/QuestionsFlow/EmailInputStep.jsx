import { useState } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

const EmailInputStep = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    setError('');
    onNext(email);
  };

  return (
    <div className="w-full flex flex-col h-full min-h-[400px] justify-center items-center">
      <div className="w-full max-w-md bg-[#0B1120] border border-[#1E293B] rounded-3xl p-8 shadow-2xl">
        <h2 className="text-white font-bold text-center mb-4 text-2xl">
          أهلاً بك في مسار!
        </h2>
        <p className="text-center text-[#94A3B8] mb-8 leading-relaxed">
          يرجى إدخال بريدك الإلكتروني للبدء في تقييم مهاراتك وبناء مسارك المهني المخصص.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="w-full bg-[#101822] border border-[#1E293B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1D83CC] focus:ring-1 focus:ring-[#1D83CC] transition-colors"
              dir="ltr"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#1D83CC] text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-[#105bc5] hover:shadow-[0_0_15px_rgba(20,110,236,0.3)]"
          >
            <span>البدء</span>
            <HiOutlineChevronLeft className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailInputStep;
