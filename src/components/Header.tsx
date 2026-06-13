import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Zap } from "lucide-react";

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onScrollTo(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050816]/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Custom Redesigned Luxury WZ Monogram Logo */}
          <button
            id="logo-button"
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center overflow-hidden p-1.5">
                {/* Custom Vector WZ Monogram */}
                <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* W segment */}
                  <path d="M12 25 L32 75 L48 42 L64 75 L84 25" stroke="url(#logoGrad)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Z overlapping slice */}
                  <path d="M42 22 L86 22 L45 74 L89 74" stroke="url(#logoGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]"></span>
              </span>
            </div>
            
            <div className="flex flex-col select-none">
              <span className="text-xl font-display font-black tracking-widest text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                WEBZ<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]">STUDIO</span>
              </span>
              <span className="text-[7.5px] text-[#AAB4C8] font-semibold font-mono tracking-widest uppercase flex items-center">
                <span>MONOGRAM DESIGN</span>
                <span className="mx-1 h-1 w-1 rounded-full bg-[#7C3AED]"></span>
                <span className="text-white/80">PREMIUM CUSTOM AGENCY</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-[#00E5FF] bg-white/5 font-bold"
                    : "text-[#AAB4C8] hover:text-white hover:bg-white/3"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              id="cta-nav-button"
              onClick={() => handleNavClick("contact")}
              className="relative px-6 py-2.5 rounded-xl text-[11px] font-display font-bold uppercase tracking-wider text-white overflow-hidden group cursor-pointer transition-all duration-300 ring-1 ring-[#00E5FF]/40 hover:ring-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] transition-transform duration-350 group-hover:scale-105"></span>
              <span className="relative flex items-center justify-center space-x-1.5 text-black font-extrabold">
                <Zap className="w-3.5 h-3.5 text-black" />
                <span>Get Started Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Actions Button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#AAB4C8] hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <div
        id="mobile-menu-drawer"
        className={`fixed inset-y-0 right-0 w-80 max-w-full bg-[#050816]/98 border-l border-white/5 shadow-2xl z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 justify-between">
          <div className="flex flex-col space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#AAB4C8] uppercase px-3">
              NAVIGATION MENU
            </span>
            <hr className="border-white/5 mb-2" />
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-[#00E5FF] bg-white/5 font-extrabold"
                      : "text-[#AAB4C8] hover:text-white hover:bg-white/3"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Drawer Footer CTA Actions */}
          <div className="flex flex-col space-y-4">
            <button
              id="mobile-drawer-ai-cta"
              onClick={() => handleNavClick("contact")}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-xl text-xs font-black uppercase tracking-wider text-black active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
            
            <div className="text-center font-mono">
              <span className="text-[9px] text-[#AAB4C8] uppercase tracking-widest">
                9350898919 • lavyzostore@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
