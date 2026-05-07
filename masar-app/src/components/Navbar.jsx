import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "التراكات المتاحة", href: "#tracks" },
    { label: "عن مسار", href: "#about" },
    { label: "لماذا مسار", href: "#why" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#010C1D]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      style={{ height: "80px" }}
    >
      {/* Navbar top border when not scrolled */}
      {!scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#007EFC]/26" />
      )}

      <div className="max-w-[1123px] mx-auto px-0 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-auto h-16 md:h-24 object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-light hover:text-white transition-colors duration-300 text-[15px] font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 border border-white/10 py-1.5 px-2 rounded-xl bg-navy-light/30 backdrop-blur-sm">
          <Link
            // to="/login"
            className="text-white hover:text-primary transition-colors text-[14px] font-medium px-4"
          >
            تسجيل الدخول
          </Link>
          <Link
            // to="/login"
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-[14px] font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(20,110,236,0.3)]"
          >
            انشاء حساب
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white text-3xl p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 absolute w-full ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-[#010C1D]/95 backdrop-blur-md border border-t-0 border-white/10 px-6 py-6 space-y-2 mx-4 rounded-b-2xl shadow-xl mt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-gray-light hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 text-base font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center text-white py-3 rounded-lg text-base font-medium hover:bg-white/5 transition-all"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-primary text-white py-3 rounded-lg text-base font-semibold transition-all shadow-lg"
            >
              انشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
