import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Phone,
  Mail,
  Zap,
  Briefcase,
  Award,
  Vote,
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  Cpu,
  Star,
  Send,
  RefreshCw,
  X,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  Shield,
  Heart,
  User,
  Coffee,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import Header from "./components/Header";
import { SERVICES, PRICING, PORTFOLIO, TESTIMONIALS, PROCESS_STEPS } from "./data";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Custom contact form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    websiteType: "Professional Website",
    message: ""
  });
  
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Simulated browser preview states
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  // Restaurant preview specific states
  const [cart, setCart] = useState<Array<{ name: string; price: number; qty: number }>>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Professional corporate visualizer theme state
  const [proTheme, setProTheme] = useState<"cyan" | "emerald">("cyan");
  // Professional corporate state: expand custom FAQ indices
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Static personal portfolio sub-tab state
  const [personalTab, setPersonalTab] = useState<"about" | "showcase" | "contact">("about");
  const [staticContactFormSubmitted, setStaticContactFormSubmitted] = useState(false);

  // Top-centering transition callback
  const handleScrollTo = (elementId: string) => {
    setActiveSection(elementId);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  // Helper to trigger contact redirection with specific pre-selection from services or pricing
  const triggerInquiry = (serviceTitle: string, selectedPlanPrice?: string) => {
    setFormData(prev => ({
      ...prev,
      websiteType: serviceTitle,
      message: selectedPlanPrice 
        ? `Hi, I am interested in launching a website under the ${serviceTitle} scope (Target Budget: ${selectedPlanPrice}).`
        : `Hi, I want to inquire about custom solutions for ${serviceTitle}.`
    }));
    handleScrollTo("contact");
  };

  // Handle contact form submission and generate WhatsApp text link output
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Validations
    if (!formData.name.trim()) {
      setFormError("Kindly share your Full Name so our architect can register your identity.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setFormError("Please enter a valid Phone Number for direct coordination.");
      return;
    }
    if (!formData.businessName.trim()) {
      setFormError("Kindly include your Business or Organisation Name.");
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setFormError("Please provide a short vision / key goals description (minimum 10 characters).");
      return;
    }

    setIsSubmittingForm(true);
    
    // Simulate high-status agency validation queue
    setTimeout(() => {
      setIsSubmittingForm(false);
      setFormSuccess(true);
    }, 1200);
  };

  // Helper to map icon names to actual Lucide components
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    switch (name) {
      case "Briefcase": return <Briefcase className={className} />;
      case "Award": return <Award className={className} />;
      case "Vote": return <Vote className={className} />;
      case "GraduationCap": return <GraduationCap className={className} />;
      case "UtensilsCrossed": return <UtensilsCrossed className={className} />;
      case "Zap": return <Zap className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "ShoppingBag": return <ShoppingBag className={className} />;
      default: return <Briefcase className={className} />;
    }
  };

  // Clear states when closing preview modal
  const closePreviewModal = () => {
    setActivePreviewId(null);
    setCart([]);
    setTableNumber("");
    setReservationSuccess(false);
    setProTheme("cyan");
    setExpandedFaq(null);
    setPersonalTab("about");
    setStaticContactFormSubmitted(false);
  };

  // Dynamic restaurant menu catalog helper helper functions
  const restaurantItems = [
    { name: "Truffle Tortellini", price: 1450, desc: "Bespoke handmade pasta glazed in wild sage and direct truffle shavings." },
    { name: "Saffron Sea Bass", price: 2100, desc: "Pan-roasted wild catch accompanied by native saffron threads and local microgreens." },
    { name: "Pistachio Gelato Crunch", price: 850, desc: "Whipped organic cream infused with organic Sicilian roast pistachios." }
  ];

  const handleAddToCart = (item: { name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
  };

  const handleUpdateCartQty = (name: string, offset: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.name === name) {
          const nextQty = i.qty + offset;
          return nextQty > 0 ? { ...i, qty: nextQty } : null;
        }
        return i;
      }).filter(Boolean) as any;
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="bg-[#050816] min-h-screen text-white relative font-sans overflow-x-hidden selection:bg-[#00E5FF]/20">
      
      {/* Visual Ambient Blur Accents */}
      <div className="absolute top-[3%] right-[-10%] w-[550px] h-[550px] bg-[#00E5FF]/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[35%] left-[-15%] w-[450px] h-[450px] bg-[#7C3AED]/8 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[8%] right-[-8%] w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

      {/* Sticky Header component */}
      <Header onScrollTo={handleScrollTo} activeSection={activeSection} />

      {/* Primary Multi-Page transition panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full z-10"
        >

          {/* ========================================================== */}
          {/* 1. HOME VIEW */}
          {/* ========================================================== */}
          {activeSection === "home" && (
            <div className="pt-28 pb-16">
              
              {/* HERO SECTION */}
              <section id="hero-block" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Copy */}
                  <div className="lg:col-span-7 text-left space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00E5FF]/10 to-[#7C3AED]/10 border border-[#00E5FF]/20 px-4 py-2 rounded-full">
                      <span className="w-2.5 h-2.5 bg-[#00E5FF] rounded-full shadow-[0_0_12px_#00E5FF] animate-pulse"></span>
                      <span className="text-xs font-mono tracking-widest text-[#AAB4C8] uppercase font-bold">
                        Bespoke Web Design Agency
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight text-white mb-4">
                      Premium Websites <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]">
                        That Grow Your Business
                      </span>
                    </h1>

                    <p className="text-[#AAB4C8] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                      We design modern, responsive and conversion-focused websites that help businesses attract customers and build trust online. Crafted with pure focus on high conversions and sub-second loading states.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                      <button
                        id="hero-primary-cta"
                        onClick={() => handleScrollTo("contact")}
                        className="group relative bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black font-display font-black px-8 py-4 rounded-xl text-center tracking-wider hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2 text-xs"
                      >
                        <span>GET MY WEBSITE</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>

                      <button
                        id="hero-secondary-cta"
                        onClick={() => handleScrollTo("portfolio")}
                        className="bg-[#0B1220] hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold tracking-wider text-center transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2.5 text-xs hover:border-[#00E5FF]/40"
                      >
                        <span>VIEW PORTFOLIO</span>
                      </button>
                    </div>

                    {/* Quick Trust Strip */}
                    <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-xl sm:text-2xl font-bold font-display text-white">Flat Rate</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono tracking-wider uppercase">No hourly fees</p>
                      </div>
                      <div>
                        <span className="text-xl sm:text-2xl font-bold font-display text-white">Pure Handcode</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono tracking-wider uppercase">No clunky templates</p>
                      </div>
                      <div>
                        <span className="text-xl sm:text-2xl font-bold font-display text-pink-400">100% Secure</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono tracking-wider uppercase">Client-vetted code</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Ambient Mockup Visualizer */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative bg-[#111827] rounded-[24px] border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden group">
                      
                      {/* Geometric Tech Graphics overlay */}
                      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <svg width="120" height="120" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4" />
                          <circle cx="50" cy="50" r="25" fill="none" stroke="#7C3AED" strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="flex items-center space-x-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                        <span className="text-[10px] text-[#AAB4C8] font-mono pl-2">webzstudio_framework.ts</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-[#050816]/75 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                            <span className="text-xs font-semibold text-white">Target Keyword Growth</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-green-400">+180% Avg</span>
                        </div>

                        <div className="p-4 bg-[#050816]/75 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-[#7C3AED]" />
                            <span className="text-xs font-semibold text-white">Mobile Speed Response</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#00E5FF]">0.4 Seconds</span>
                        </div>

                        <div className="p-4 bg-[#050816]/75 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs font-semibold text-white">Satisfaction Rating</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-400">5.0 Star Elite</span>
                        </div>

                        {/* Customer trust badge */}
                        <div className="mt-4 pt-5 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="relative">
                              <div className="w-9 h-9 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] font-bold text-xs border border-[#00E5FF]/45">
                                LV
                              </div>
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111827] rounded-full"></span>
                            </div>
                            <div className="text-left">
                              <h4 className="text-xs font-bold text-white">Consulting Lead active</h4>
                              <p className="text-[10px] text-[#AAB4C8]">Online via Call &amp; WhatsApp</p>
                            </div>
                          </div>
                          <a
                            href="https://wa.me/9350898919"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all"
                          >
                            Chat 24/7
                          </a>
                        </div>
                      </div>

                    </div>
                    {/* Glow outline decoration */}
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-[26px] blur-md opacity-20 -z-10 group-hover:opacity-35 transition duration-500"></div>
                  </div>

                </div>
              </section>

              {/* WHY WE EXIST / BRAND CONFIDENCE STRIP */}
              <section className="bg-[#0B1220]/50 border-y border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="text-[#00E5FF] text-[10px] font-mono font-bold uppercase tracking-[0.25em]">
                      OUR BRAND PROMISE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black mt-2 text-white">
                      Websites Built Only For Conversions
                    </h2>
                    <p className="text-sm text-[#AAB4C8] mt-3">
                      We reject the cluttered templates average freelancers install. We build fully custom, fast loading screens styled to give your target audience a luxury experience.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 text-left space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">Aesthetic Sizing</h3>
                      <p className="text-xs text-[#AAB4C8] leading-relaxed">
                        Every button, heading, and image is framed perfectly inside clean gutters. Zero overlapping text, zero side scrolls, and zero horizontal layouts.
                      </p>
                    </div>

                    <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 text-left space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-[#7C3AED]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">Sub-Second Load Speed</h3>
                      <p className="text-xs text-[#AAB4C8] leading-relaxed">
                        Your customers won't wait. We delay image loading until the point of scroll, cache global scripts, and bundle raw lightweight modules.
                      </p>
                    </div>

                    <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 text-left space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">Direct Project Updates</h3>
                      <p className="text-xs text-[#AAB4C8] leading-relaxed">
                        Access a dedicated WhatsApp coordinates pipeline with Lakshay Verma to update text copy, request image adjustments, or inspect builds instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS SLIDER SECTION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-[#00E5FF] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                    REAL CLIENT STATEMENTS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                    What Active Partners Say About Us
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((test) => (
                    <div
                      key={test.id}
                      className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left relative"
                    >
                      <div>
                        <div className="flex space-x-1 mb-4">
                          {[...Array(test.stars)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-[#00E5FF] text-[#00E5FF]" />
                          ))}
                        </div>
                        <p className="text-xs text-[#AAB4C8] leading-relaxed italic mb-6">
                          "{test.quote}"
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                        <img
                          src={test.avatarUrl}
                          alt={test.name}
                          className="w-10 h-10 rounded-full border border-white/10 bg-white/5 object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{test.name}</h4>
                          <p className="text-[10px] text-[#AAB4C8]">{test.role}, {test.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROCESS STEP TIMELINE */}
              <section className="bg-[#0B1220]/50 border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <span className="text-[#00E5FF] text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
                    OUR PROJECT CYCLE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1 mb-12">
                    How We Deliver Your Complete Website
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {PROCESS_STEPS.map((step, idx) => (
                      <div key={idx} className="bg-[#111827] p-5 rounded-xl border border-white/5 text-left flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-3xl font-black text-[#00E5FF] font-mono">{step.step}</span>
                            <span className="text-[8px] font-mono bg-white/5 text-white/50 px-1.5 py-0.5 rounded border border-white/10 uppercase font-bold">Phase</span>
                          </div>
                          <h4 className="text-xs font-bold text-white tracking-wide">{step.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#AAB4C8] leading-relaxed">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* ========================================================== */}
          {/* 2. SERVICES VIEW */}
          {/* ========================================================== */}
          {activeSection === "services" && (
            <div className="pt-28 pb-16">
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header detail */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#00E5FF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                    CRAFTED WEB SPECTRUM
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-2 mb-4">
                    Exclusive Service Categories
                  </h2>
                  <p className="text-[#AAB4C8] text-sm sm:text-base">
                    Any digital solutions we implement is handcoded from scratch. We select high-contrast luxury slate aesthetics and lightweight script structures configured for real business growth.
                  </p>
                </div>

                {/* Grid Catalog */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      id={`srv-card-${srv.id}`}
                      className="group relative bg-[#111827] border border-white/5 hover:border-[#00E5FF]/45 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,229,255,0.06)] flex flex-col justify-between"
                    >
                      <div>
                        {/* Upper row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-[#050816] text-[#00E5FF] rounded-xl border border-white/5 group-hover:bg-[#00E5FF]/10 transition-colors">
                            {renderIcon(srv.iconName, "w-5 h-5")}
                          </div>
                          <span className="text-[8px] font-mono text-[#AAB4C8] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">Bespoke</span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-3">
                          {srv.title}
                        </h3>

                        <p className="text-xs text-[#AAB4C8] leading-relaxed mb-6">
                          {srv.description}
                        </p>

                        <div className="space-y-2 mb-6">
                          {srv.features.map((feat, fidx) => (
                            <div key={fidx} className="flex items-center space-x-2 text-[10px] text-[#AAB4C8]">
                              <Check className="w-3 h-3 text-[#00E5FF] shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => triggerInquiry(srv.title)}
                        className="w-full py-2.5 bg-white/5 hover:bg-gradient-to-r hover:from-[#00E5FF] hover:to-[#7C3AED] hover:text-black rounded-xl text-[10px] font-semibold text-white transition-all uppercase tracking-wider block text-center"
                      >
                        Inquire About This Service
                      </button>
                    </div>
                  ))}
                </div>

                {/* Additional Trust banner */}
                <div className="mt-12 bg-[#0B1220] p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Looking for custom API / Database integrations?</h4>
                      <p className="text-xs text-[#AAB4C8]">We architect custom shopping carts, scheduling tools, local search tags, and responsive lead sheets.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleScrollTo("contact")}
                    className="shrink-0 scale-95 hover:scale-100 bg-[#111827] text-white border border-white/10 hover:border-[#00E5FF]/40 text-xs px-6 py-3 rounded-xl transition-all uppercase font-semibold"
                  >
                    Discuss Tech Stack
                  </button>
                </div>

              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* 3. PRICING VIEW */}
          {/* ========================================================== */}
          {activeSection === "pricing" && (
            <div className="pt-28 pb-16">
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#00E5FF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                    FLAT BUDGET ASSURANCE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-2 mb-4">
                    Strict Scope Plans. No Monthly Subscriptions.
                  </h2>
                  <p className="text-[#AAB4C8] text-sm">
                    No hourly retainers. No clunky surprises. Choose the targeted implementation your business demands to secure high-ticket client trust, or contact us for a customized project quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pt-4">
                  {PRICING.map((plan) => (
                    <div
                      key={plan.id}
                      id={`pricing-card-${plan.id}`}
                      className={`relative bg-[#111827] rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 ${
                        plan.popular
                          ? "border-2 border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.1)] transform md:-translate-y-4"
                          : "border border-white/5 hover:border-white/15"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black font-display font-black text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-full select-none">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-mono text-[#AAB4C8] uppercase tracking-widest">{plan.name}</span>
                          <div className="flex items-baseline mt-2">
                            <span className="text-4xl font-display font-black text-white">{plan.price}</span>
                            <span className="text-[10px] font-mono text-[#AAB4C8] ml-2">/ complete project</span>
                          </div>
                        </div>

                        <hr className="border-white/5" />

                        <ul className="space-y-3.5">
                          {plan.features.map((feat, fidx) => (
                            <li key={fidx} className="flex items-start space-x-3 text-xs text-white/90 text-left">
                              <span className="w-4 h-4 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8 mt-8 border-t border-white/5">
                        <button
                          id={`choose-plan-btn-${plan.id}`}
                          onClick={() => triggerInquiry(plan.name, plan.price)}
                          className={`w-full py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black font-black hover:shadow-[0_4px_15px_rgba(0,229,255,0.3)] hover:scale-[1.01]"
                              : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                          }`}
                        >
                          Get Started
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Budget Trust note */}
                <div className="mt-12 bg-[#0B1220] p-5 rounded-xl border border-white/5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-left gap-4">
                  <span className="text-xs text-[#AAB4C8] font-mono leading-relaxed">
                    Have a custom voter mobilization project, custom menu flow, or large school directory? Talk directly to our lead software architect on WhatsApp to secure premium parameters.
                  </span>
                  <a
                    href="https://wa.me/9350898919"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center space-x-2 text-xs font-bold text-[#00E5FF] border-b border-[#00E5FF]/30 hover:border-[#00E5FF] pb-0.5 transition-all"
                  >
                    <span>Message on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* 4. PORTFOLIO VIEW */}
          {/* ========================================================== */}
          {activeSection === "portfolio" && (
            <div className="pt-28 pb-16">
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                  <div className="text-left">
                    <span className="text-[#00E5FF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                      Vetted Live Showcases
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
                      Our Portfolio Projects
                    </h2>
                  </div>
                  <p className="text-[#AAB4C8] text-xs sm:text-sm max-w-md text-left">
                    We showcase exactly three real, responsive layout structures. Click the live interactive preview button on any card to run the actual functional browser simulation simulator!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PORTFOLIO.map((proj) => (
                    <div
                      key={proj.id}
                      id={`portfolio-${proj.id}`}
                      className="group bg-[#111827] rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                        <div className={`absolute inset-0 bg-gradient-to-r ${proj.gradient} opacity-15 group-hover:opacity-30 transition-all z-0`}></div>
                        
                        <img
                          src={proj.mockupUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Category tag */}
                        <span className="absolute top-4 left-4 bg-[#050816]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-white uppercase tracking-wider z-20">
                          {proj.category}
                        </span>

                        {/* Outcomes */}
                        <div className="absolute bottom-4 left-4 z-20 text-left">
                          <span className="text-[8px] font-mono tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded border border-[#00E5FF]/20 uppercase">Vitals Metric</span>
                          <p className="text-sm font-bold text-white mt-1.5">{proj.metrics}</p>
                        </div>
                      </div>

                      <div className="p-6 text-left">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-3">
                          {proj.title}
                        </h3>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {proj.tech.map((tool, idx) => (
                            <span key={idx} className="text-[9px] font-mono bg-[#050816]/80 text-[#AAB4C8] border border-white/5 px-2 py-0.5 rounded">
                              {tool}
                            </span>
                          ))}
                        </div>

                        {/* Interactive Preview Action Button */}
                        <button
                          onClick={() => setActivePreviewId(proj.id)}
                          className="w-full py-3 bg-[#050816] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] border border-[#00E5FF]/30 transition-all text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                        >
                          <Zap className="w-3.5 h-3.5 animate-pulse" />
                          <span>Run Live Preview</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* 5. ABOUT VIEW */}
          {/* ========================================================== */}
          {activeSection === "about" && (
            <div className="pt-28 pb-16">
              
              {/* Agency Story Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-[#00E5FF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                      WHO WE ARE
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
                      Why WEBZSTUDIO Exists
                    </h2>
                    
                    <p className="text-sm text-[#AAB4C8] leading-relaxed">
                      Most businesses are struggling to connect with customers because average software freelancers install bloated, slow templates. These templates overlap, side-scroll, and load slow on mobile devices.
                    </p>

                    <p className="text-sm text-[#AAB4C8] leading-relaxed">
                      At WEBZSTUDIO, we engineer clean custom codebases styled with high-contrast luxury dark aesthetics. Outfitted with responsive sizing matrices, our layouts guarantees high-fidelity rendering across all formats. We exist to provide transparent flat project planning, custom technical support, and premium web design.
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="border-l-2 border-[#00E5FF] pl-4">
                        <span className="text-2xl font-bold font-display text-white">100%</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono">Bespoke Code</p>
                      </div>
                      <div className="border-l-2 border-[#7C3AED] pl-4">
                        <span className="text-2xl font-bold font-display text-white">Rewari</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono">Operations Base</p>
                      </div>
                      <div className="border-l-2 border-emerald-400 pl-4">
                        <span className="text-2xl font-bold font-display text-white">Global</span>
                        <p className="text-[10px] text-[#AAB4C8] font-mono">Clients Served</p>
                      </div>
                    </div>
                  </div>

                  {/* Narrative grid columns */}
                  <div className="lg:col-span-6 bg-[#111827] rounded-3xl border border-white/5 p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/5 rounded-full blur-2xl"></div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-5 h-5"/></div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Our Mission</h4>
                          <p className="text-xs text-[#AAB4C8] mt-1">To construct premium websites that secure client trust, eliminate slow latency, and translate cold digital visits into paying outcomes.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-5 h-5"/></div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Our Vision</h4>
                          <p className="text-xs text-[#AAB4C8] mt-1">To lead the custom web development ecosystem by providing transparent Flat Project Investment plans without monthly lock-ins.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-5 h-5"/></div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Our Values</h4>
                          <p className="text-xs text-[#AAB4C8] mt-1">Pixel precision, responsive validation constraints (tested on live iPhones and Androids), and permanent honest communication via WhatsApp.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LEAD ARCHITECT SPOTLIGHT */}
                <div className="bg-[#111827] rounded-3xl border border-white/5 p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00E5FF]/10 to-[#7C3AED]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Visual representative frame */}
                    <div className="lg:col-span-4 flex flex-col items-center text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#00E5FF] to-[#7C3AED] p-[3px] shadow-[0_0_30px_rgba(0,229,255,0.25)]">
                          <div className="w-full h-full bg-[#050816] rounded-[13px] flex items-center justify-center font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] select-none">
                            LV
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black text-[8px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md shadow-lg uppercase">
                          Lead Architect
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white tracking-wide">Lakshay Verma</h3>
                      <p className="text-[10px] text-[#AAB4C8] font-mono mt-0.5">SOFTWARE DEVELOPER &amp; FOUNDER</p>
                      <p className="text-[9px] text-[#D4AF37] font-mono mt-0.5 font-bold uppercase tracking-[0.1em]">Rewari, India</p>
                    </div>

                    {/* Story Copy */}
                    <div className="lg:col-span-8 space-y-4">
                      <h4 className="text-base sm:text-lg font-display font-bold text-white">
                        About The Lead Software Engineer
                      </h4>
                      <p className="text-xs text-[#AAB4C8] leading-relaxed">
                        Based in Rewari, Lakshay Verma is a professional website developer and certified software engineer specializing in luxury frontends, custom state management tools, and clean semantic structures. 
                      </p>
                      <p className="text-xs text-[#AAB4C8] leading-relaxed">
                        Lakshay is committed to raising the standard of web credibility. Under his strict lead, every project delivered by WEBZSTUDIO undergoes exhaustive responsive testing on various display resolutions, optimizing and caching images to run at under 0.4 seconds load speeds.
                      </p>

                      <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs font-mono text-[#00E5FF] block">Direct Hotline</span>
                          <span className="text-xs font-bold text-white">+91 93508 98919</span>
                        </div>
                        <div>
                          <span className="text-xs font-mono text-[#7C3AED] block">Lead Contact</span>
                          <span className="text-xs font-bold text-white">lavyzostore@gmail.com</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* 6. CONTACT VIEW */}
          {/* ========================================================== */}
          {activeSection === "contact" && (
            <div className="pt-28 pb-16">
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-stretch">
                  
                  {/* Info Sidebar */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[#00E5FF] text-xs font-mono font-bold tracking-[0.25em] uppercase">
                        CONNECT WITH US
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
                        Let's Build Your Website
                      </h2>
                      <p className="text-sm text-[#AAB4C8] leading-relaxed">
                        Have questions about layout styles, responsive timelines, or asset configurations? Share your details to request a free strategic review, or reach out directly to our Rewari office on WhatsApp below.
                      </p>

                      <div className="space-y-3 pt-4">
                        <div className="flex items-center space-x-3.5 p-4 bg-[#111827] rounded-xl border border-white/5">
                          <Phone className="w-5 h-5 text-[#00E5FF] shrink-0" />
                          <div>
                            <span className="text-[10px] text-[#AAB4C8] font-mono uppercase">Call or Chat</span>
                            <p className="text-xs font-bold text-white">+91 93508 98919</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3.5 p-4 bg-[#111827] rounded-xl border border-white/5">
                          <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-[#AAB4C8] font-mono uppercase">Direct Inbox</span>
                            <p className="text-xs font-bold text-white">lavyzostore@gmail.com</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3.5 p-4 bg-[#111827] rounded-xl border border-white/5">
                          <User className="w-5 h-5 text-amber-500 shrink-0" />
                          <div>
                            <span className="text-[10px] text-[#AAB4C8] font-mono uppercase">Local Office Lead</span>
                            <p className="text-xs font-bold text-white">Rewari, Haryana, India</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Fast Option */}
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="p-6 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-emerald-400">Prefer Instant Chat?</h4>
                          <p className="text-[11px] text-[#AAB4C8]">Submit your brief details directly to open direct WhatsApp conversation.</p>
                        </div>
                        <a
                          id="contact-whatsapp-primary"
                          href="https://wa.me/9350898919?text=Hi%20WEBZSTUDIO!%20Interested%20in%20launching%20a%20premium%20website%20scale.%20Let's%20discuss!"
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer uppercase tracking-wider"
                        >
                          Chat Now
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Form Terminal */}
                  <div className="lg:col-span-7 bg-[#111827] rounded-3xl border border-white/5 p-6 md:p-8 relative">
                    
                    {formSuccess ? (
                      <div className="space-y-6 text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white">Inquiry Registered Successfully!</h3>
                          <p className="text-xs text-[#AAB4C8] max-w-md mx-auto leading-relaxed">
                            Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your request for <span className="text-white font-semibold">{formData.websiteType}</span> on behalf of <span className="text-white font-semibold">{formData.businessName}</span> has been processed.
                          </p>
                        </div>

                        {/* Preserver parameters output */}
                        <div className="bg-[#050816] p-4 rounded-xl border border-white/5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                          <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider block">Generated Brief Credentials</span>
                          <div><span className="text-[#AAB4C8]">Phone ID:</span> <span className="text-white">{formData.phone}</span></div>
                          <div><span className="text-[#AAB4C8]">Website Scope:</span> <span className="text-white">{formData.websiteType}</span></div>
                          <div><span className="text-[#AAB4C8]">Goals:</span> <span className="text-white bg-white/5 px-1.5 py-0.5 rounded">{formData.message}</span></div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                          <a
                            id="whatsapp-proposal-action"
                            href={`https://wa.me/9350898919?text=Hi%20WEBZSTUDIO,%20I'm%20${encodeURIComponent(formData.name)}.%20I%20just%20filled%20out%20the%20design%20brief%20for%20my%20business%2520'${encodeURIComponent(formData.businessName)}'%20requesting%20a%20'${encodeURIComponent(formData.websiteType)}'.%20Goals:%20${encodeURIComponent(formData.message)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3.5 px-6 rounded-xl text-xs tracking-wider transition-all uppercase block text-center flex-1"
                          >
                            Send Brief to WhatsApp
                          </a>
                          
                          <button
                            onClick={() => {
                              setFormData({ name: "", phone: "", businessName: "", websiteType: "Professional Website", message: "" });
                              setFormSuccess(false);
                            }}
                            className="text-xs font-bold text-[#AAB4C8] bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl transition-colors shrink-0 uppercase tracking-wider"
                          >
                            New Inquiry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        
                        <div className="text-left mb-2">
                          <h3 className="text-lg font-bold text-white">Submit Brief Details</h3>
                          <p className="text-xs text-[#AAB4C8]">All fields are carefully validated. All details will remain confidential.</p>
                        </div>

                        {formError && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-[#AAB4C8] uppercase tracking-wider mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                              placeholder="e.g. Rajesh Malhotra"
                              className="w-full bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-[#AAB4C8] uppercase tracking-wider mb-1.5">
                              Phone / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                              placeholder="e.g. 9350898919"
                              className="w-full bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-[#AAB4C8] uppercase tracking-wider mb-1.5">
                              Business Name *
                            </label>
                            <input
                              type="text"
                              value={formData.businessName}
                              onChange={(e) => setFormData(p => ({ ...p, businessName: e.target.value }))}
                              placeholder="e.g. Malhotra Ventures"
                              className="w-full bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-[#AAB4C8] uppercase tracking-wider mb-1.5">
                              Website Type *
                            </label>
                            <select
                              value={formData.websiteType}
                              onChange={(e) => setFormData(p => ({ ...p, websiteType: e.target.value }))}
                              className="w-full bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none rounded-xl px-4 py-3 text-xs text-white cursor-pointer"
                            >
                              <option value="Professional Website">Professional Multiple-Page (₹9,000)</option>
                              <option value="Static Website">Static Business Site (₹5,500)</option>
                              <option value="Custom Website">Fully Custom App (₹17,999)</option>
                              <option value="Business Website">Business Website</option>
                              <option value="Portfolio Website">Portfolio Website</option>
                              <option value="Political Website">Political Website</option>
                              <option value="School Website">School Website</option>
                              <option value="Restaurant Website">Restaurant Website</option>
                              <option value="Landing Pages">Landing Pages</option>
                              <option value="E-commerce Websites">E-commerce Websites</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-[#AAB4C8] uppercase tracking-wider mb-1.5">
                            Short Vision / Key Goals (min 10 characters) *
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                            rows={3}
                            placeholder="e.g., We sell high-end agricultural pumps and want a clean dark search card so local framing agencies can call us on WhatsApp."
                            className="w-full bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingForm}
                          id="submit-form-button"
                          className="w-full py-4 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_4px_15px_rgba(0,229,255,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
                        >
                          {isSubmittingForm ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-black" />
                              <span>Validating Brief Parameters...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Design Inquiry</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                      </form>
                    )}

                  </div>

                </div>

              </section>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ========================================================== */}
      {/* 7. PORTFOLIO SIMULATION BROWSER MODALS */}
      {/* ========================================================== */}
      <AnimatePresence>
        {activePreviewId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#050816] border border-white/10 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              
              {/* Simulator Browser Top Bar */}
              <div className="bg-[#111827] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1.5 mr-2">
                    <button onClick={closePreviewModal} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-opacity-80 transition-all"></button>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div >
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div >
                  </div>
                  
                  {/* Simulated URL box */}
                  <div className="hidden sm:flex bg-[#050816] rounded-lg px-4 py-1.5 text-left border border-white/5 w-80 md:w-96 text-[10px] font-mono text-[#AAB4C8] items-center space-x-2 truncate">
                    <span className="text-emerald-500">https://</span>
                    <span>
                      {activePreviewId === "portfolio-static" && "horizon.webzstudio.agency/branding"}
                      {activePreviewId === "portfolio-professional" && "aura.webzstudio.agency/dashboard"}
                      {activePreviewId === "portfolio-custom" && "gourmet.webzstudio.agency/order-menu"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/20 font-bold">
                    Interactive Live Code
                  </span>
                  <button
                    onClick={closePreviewModal}
                    className="p-1 text-[#AAB4C8] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* SIMULATOR CORE CONTAINER */}
              <div className="flex-1 overflow-y-auto bg-[#050816]/95 relative p-4 sm:p-6 text-left">
                
                {/* -------------------------------------------------------- */}
                {/* CASE 1: STATIC WEBSITE SIMULATOR */}
                {/* -------------------------------------------------------- */}
                {activePreviewId === "portfolio-static" && (
                  <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                    
                    {/* Simulated Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="font-display font-black text-white text-sm tracking-widest uppercase">Horizon Brands</span>
                      <div className="flex space-x-4 text-[10px] font-mono">
                        <button
                          onClick={() => setPersonalTab("about")}
                          className={`uppercase tracking-wide font-bold transition-all ${personalTab === "about" ? "text-[#00E5FF]" : "text-[#AAB4C8]"}`}
                        >
                          Story
                        </button>
                        <button
                          onClick={() => setPersonalTab("showcase")}
                          className={`uppercase tracking-wide font-bold transition-all ${personalTab === "showcase" ? "text-[#00E5FF]" : "text-[#AAB4C8]"}`}
                        >
                          Work
                        </button>
                        <button
                          onClick={() => setPersonalTab("contact")}
                          className={`uppercase tracking-wide font-bold transition-all ${personalTab === "contact" ? "text-[#00E5FF]" : "text-[#AAB4C8]"}`}
                        >
                          Connect
                        </button>
                      </div>
                    </div>

                    {personalTab === "about" && (
                      <div className="space-y-4 py-4">
                        <span className="text-[10px] font-mono text-[#00E5FF] tracking-widest uppercase">ESTATE BRANDING EXPERTS</span>
                        <h2 className="text-2xl font-display font-black text-white">We Design Symmetrical Legacies Since 2018</h2>
                        <p className="text-xs text-[#AAB4C8] leading-relaxed">
                          Welcome to the Horizon simulation. This represents our single-screen high-contrast static branding tier (₹5,500 full scope). Ideal for speakers, local service dealers, and consultants who require a quick, beautiful identity page without sluggish backgrounds.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="p-3 bg-[#111827] rounded-xl border border-white/5">
                            <span className="text-lg font-bold text-white font-display">100%</span>
                            <p className="text-[9px] text-[#AAB4C8] uppercase font-mono">Custom Layout Gutters</p>
                          </div>
                          <div className="p-3 bg-[#111827] rounded-xl border border-white/5">
                            <span className="text-lg font-bold text-white font-display">0.4s</span>
                            <p className="text-[9px] text-[#AAB4C8] uppercase font-mono">Mobile load verified</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {personalTab === "showcase" && (
                      <div className="space-y-4 py-4">
                        <h2 className="text-xl font-display font-black text-white">Horizon Client Portfolios</h2>
                        <p className="text-xs text-[#AAB4C8]">Hovering is fully responsive. View scroll grids below.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="p-4 bg-[#111827] rounded-xl border border-white/5 space-y-1">
                            <span className="text-[9px] font-mono text-purple-400 font-bold uppercase">Apex Logistics</span>
                            <h4 className="text-xs font-bold text-white">National Transport Terminal</h4>
                          </div>
                          <div className="p-4 bg-[#111827] rounded-xl border border-white/5 space-y-1">
                            <span className="text-[9px] font-mono text-[#00E5FF] font-bold uppercase">Scholars</span>
                            <h4 className="text-xs font-bold text-white">Academy Information Class</h4>
                          </div>
                        </div>
                      </div>
                    )}

                    {personalTab === "contact" && (
                      <div className="space-y-4 py-4">
                        <h2 className="text-xl font-display font-black text-white">Connect Instantly</h2>
                        <p className="text-xs text-[#AAB4C8]">Fill this simulation form to test responsive validations.</p>
                        
                        {staticContactFormSubmitted ? (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-center text-emerald-400 font-bold">
                            Success! Simulated brief submitted safely. Close preview or toggle tabs to reset.
                          </div>
                        ) : (
                          <div className="space-y-3 bg-[#111827] p-5 rounded-xl border border-white/5">
                            <div>
                              <label className="text-[9px] uppercase font-mono tracking-wider text-[#AAB4C8] block mb-1">Your Email</label>
                              <input type="email" placeholder="example@gmail.com" className="w-full bg-[#050816] border border-white/10 rounded p-2 text-xs text-white" />
                            </div>
                            <button
                              onClick={() => setStaticContactFormSubmitted(true)}
                              className="w-full py-2 bg-[#00E5FF] text-black text-xs font-bold rounded uppercase tracking-wider hover:opacity-95"
                            >
                              Submit Mock Form
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* CASE 2: PROFESSIONAL WEBSITE SIMULATOR */}
                {/* -------------------------------------------------------- */}
                {activePreviewId === "portfolio-professional" && (
                  <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                    
                    {/* Upper row themed selector */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h3 className="font-bold text-white text-base">Aura Corporate Ventures</h3>
                        <p className="text-[10px] text-[#AAB4C8]">Simulated theme toggles match our Framer Motion transitions.</p>
                      </div>

                      {/* Theme toggle widget */}
                      <div className="flex items-center space-x-2 bg-[#111827] p-1.5 rounded-lg border border-white/10 text-[9px] font-mono">
                        <button
                          onClick={() => setProTheme("cyan")}
                          className={`px-2 py-1 rounded transition-colors ${proTheme === "cyan" ? "bg-[#00E5FF] text-black font-bold" : "text-[#AAB4C8]"}`}
                        >
                          Neon Cyan
                        </button>
                        <button
                          onClick={() => setProTheme("emerald")}
                          className={`px-2 py-1 rounded transition-colors ${proTheme === "emerald" ? "bg-emerald-500 text-black font-bold" : "text-[#AAB4C8]"}`}
                        >
                          Teal Emerald
                        </button>
                      </div>
                    </div>

                    {/* Main section based on chosen theme */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-4 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${proTheme === "cyan" ? "text-[#00E5FF]" : "text-emerald-400"}`}>
                          Core Vitals Operational
                        </span>
                        
                        <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                          Bespoke Digital Operations for Startups Globally
                        </h2>

                        <p className="text-xs text-[#AAB4C8] leading-relaxed">
                          This is our award-winning Professional Website tier (₹9,000 full scope). Built directly with customizable Framer Motion reveals, collapsible faq accordions, and WhatsApp hooks loaded natively.
                        </p>
                      </div>

                      {/* Simulated metrics layout */}
                      <div className="md:col-span-4 p-5 bg-[#111827] border border-white/5 rounded-2xl text-center space-y-2">
                        <span className="text-3xl font-black text-white">99.8%</span>
                        <p className="text-[9px] text-[#AAB4C8] font-mono uppercase">Lighthouse score vetted</p>
                        <div className={`h-1 w-full rounded-full bg-[#050816] overflow-hidden`}>
                          <div className={`h-full ${proTheme === "cyan" ? "bg-[#00E5FF]" : "bg-emerald-400"} w-[99.8%] transition-all duration-300`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible FAQ components */}
                    <div className="space-y-2 mt-4 text-left">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Interactive Accordions Test</h4>
                      
                      {[
                        { q: "Is the WhatsApp integration reliable?", a: "Yes. It utilizes standard protocol anchors to load files directly in under 0.2 seconds on any smartphone size." },
                        { q: "Is there an admin coordination fee?", a: "No. WEBZSTUDIO operates flat-pricing boundaries with absolute direct deliveries." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#111827] rounded-xl border border-white/5 overflow-hidden">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-white text-left focus:outline-none"
                          >
                            <span>{item.q}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedFaq === idx ? "rotate-180 text-[#00E5FF]" : ""}`} />
                          </button>
                          
                          {expandedFaq === idx && (
                            <div className="px-4 pb-3 pt-1 text-[11px] text-[#AAB4C8] leading-relaxed border-t border-white/5">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* CASE 3: CUSTOM WEBSITE SIMULATOR */}
                {/* -------------------------------------------------------- */}
                {activePreviewId === "portfolio-custom" && (
                  <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                    
                    {/* Simulating Gourmet Food Cart Platform */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h3 className="font-display font-black text-white text-base">Royale Gourmet Bistro</h3>
                        <p className="text-[10px] text-[#AAB4C8]">Add items to cart to compute live totals. (₹17,999+ Tier Custom scope)</p>
                      </div>

                      {/* Display live checkout count */}
                      <div className="flex items-center space-x-2 bg-[#111827] px-3 py-1.5 rounded-lg border border-[#00E5FF]/25 text-xs">
                        <ShoppingBag className="w-4 h-4 text-[#00E5FF] shrink-0" />
                        <span className="font-bold text-white">{cart.reduce((ac, im) => ac + im.qty, 0)} Items</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Dishes Catalogue */}
                      <div className="md:col-span-7 space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#AAB4C8] uppercase tracking-widest pl-1">Sensory Dinner Menu</h4>
                        
                        {restaurantItems.map((dish, dIdx) => (
                          <div key={dIdx} className="bg-[#111827] p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                            <div className="text-left space-y-1">
                              <h5 className="text-xs font-bold text-white">{dish.name}</h5>
                              <p className="text-[10px] text-[#AAB4C8] leading-tight">{dish.desc}</p>
                              <span className="text-xs font-mono font-extrabold text-[#00E5FF] block pt-1">₹{dish.price}</span>
                            </div>
                            <button
                              onClick={() => handleAddToCart(dish)}
                              className="shrink-0 scale-90 hover:scale-95 bg-[#050816] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-md text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-lg border border-[#00E5FF]/30 transition-all cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Checkout Sidebar Cart */}
                      <div className="md:col-span-5 bg-[#111827] p-5 rounded-xl border border-white/5 space-y-4 text-left">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Dynamic Cart Calculations</h4>
                        
                        {cart.length === 0 ? (
                          <p className="text-xs text-[#AAB4C8] italic py-4">No gourmet selections made. Click (+ Add) in menu catalog to populate calculations.</p>
                        ) : (
                          <div className="space-y-3">
                            <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                              {cart.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                                  <div className="truncate max-w-[120px] font-medium text-white">{item.name}</div>
                                  <div className="flex items-center space-x-2">
                                    <button onClick={() => handleUpdateCartQty(item.name, -1)} className="px-1.5 py-0.2 bg-[#050816] text-white rounded font-bold">-</button>
                                    <span className="text-[10px] font-mono text-white/90">{item.qty}</span>
                                    <button onClick={() => handleAddToCart({ name: item.name, price: item.price })} className="px-1.5 py-0.2 bg-[#050816] text-white rounded font-bold">+</button>
                                  </div>
                                  <div className="font-mono text-white font-semibold">₹{item.price * item.qty}</div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold text-white">
                              <span>Total Investment</span>
                              <span className="font-mono text-[#00E5FF]">₹{cartTotal}</span>
                            </div>
                          </div>
                        )}

                        <hr className="border-white/5" />

                        {/* Reservation Input simulation */}
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-mono tracking-wider text-[#AAB4C8] block">Simulation Table Number</label>
                          <input
                            type="text"
                            placeholder="e.g., Table 4"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-[#050816] border border-white/15 focus:border-[#00E5FF] focus:outline-none rounded p-2 text-xs text-white"
                          />
                        </div>

                        {reservationSuccess ? (
                          <p className="p-3 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-[10px] rounded font-bold text-center">
                            Success! simulated reservation committed to head table.
                          </p>
                        ) : (
                          <button
                            onClick={() => {
                              if (!tableNumber.trim()) return;
                              setReservationSuccess(true);
                            }}
                            className="w-full py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black font-black text-xs uppercase tracking-wider rounded-lg hover:opacity-95"
                          >
                            Submit Table Reservation
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* Close footer overlay link */}
              <div className="bg-[#111827] px-6 py-4 flex items-center justify-end border-t border-white/5">
                <button
                  onClick={closePreviewModal}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Return to Agency Showcases
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================== */}
      {/* 8. FOOTER */}
      {/* ========================================================== */}
      <footer className="relative bg-[#050816] border-t border-white/5 pt-16 pb-12 z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Logo and metadata Details */}
            <div className="md:col-span-5 space-y-6">
              
              <div className="flex items-center space-x-3 select-none">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] p-[1.5px]">
                  <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center p-1">
                    <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 25 L32 75 L48 42 L64 75 L84 25" stroke="url(#logoGradFoot)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="logoGradFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00E5FF" />
                          <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-display font-black tracking-widest text-white">
                    WEBZ<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]">STUDIO</span>
                  </span>
                  <span className="text-[7px] text-[#AAB4C8] font-bold font-mono uppercase tracking-widest">
                    Bespoke Monogram Web Agency
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#AAB4C8] leading-relaxed max-w-sm">
                WEBZSTUDIO is spearheaded by Lead Full-Stack Web Architect Lakshay Verma based in Rewari, India. We design and deliver custom, fast loading, responsive platforms engineered solely to attract customers and build trust online.
              </p>

              <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-green-400 bg-green-400/5 px-3 py-1 rounded-full border border-green-400/15">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span>SYSTEM PERFORMANCE: EXCELLENT (0.4s)</span>
              </div>

            </div>

            {/* Sub-routing quick links columns */}
            <div className="md:col-span-2 flex flex-col space-y-3">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">Direct Pages</span>
              <button onClick={() => handleScrollTo("home")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Home Hub</button>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Service Tiers</button>
              <button onClick={() => handleScrollTo("pricing")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Flat Project Plans</button>
              <button onClick={() => handleScrollTo("portfolio")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Client Showcase</button>
              <button onClick={() => handleScrollTo("about")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Our Story</button>
              <button onClick={() => handleScrollTo("contact")} className="text-left text-xs text-[#AAB4C8] hover:text-[#00E5FF] transition-colors cursor-pointer">Submit Contact Form</button>
            </div>

            {/* Quick catalog selections */}
            <div className="md:col-span-3 flex flex-col space-y-3">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">Target Services</span>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-white transition-colors">Business Corporate Platforms</button>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-white transition-colors">Restaurant Menu Reservoirs</button>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-white transition-colors">Custom Portals &amp; Directories</button>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-white transition-colors">Voter Campaign Portals</button>
              <button onClick={() => handleScrollTo("services")} className="text-left text-xs text-[#AAB4C8] hover:text-white transition-colors">Educational Board Directories</button>
            </div>

            {/* Direct hotline contact details */}
            <div className="md:col-span-2 flex flex-col space-y-3">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">Solution Helpline</span>
              <a href="https://wa.me/9350898919" target="_blank" rel="noreferrer" className="text-xs text-[#00E5FF] font-bold hover:underline tracking-wide block">
                +91 93508 98919
              </a>
              <p className="text-[10px] text-[#AAB4C8] leading-normal font-mono uppercase">
                Email: <br />
                <span className="text-white normal-case font-sans">lavyzostore@gmail.com</span>
              </p>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#AAB4C8] gap-4">
            <span>© 2026 WEBZSTUDIO. Crafted Pixel Perfect. All rights reserved.</span>
            
            <div className="flex space-x-4">
              <span className="hover:text-white transition-colors">Flat Rate Pricing</span>
              <span className="text-white/10">|</span>
              <span className="hover:text-white transition-colors">Rewari Office Base</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================== */}
      {/* 9. ALL-PAGE FLOATING WHATSAPP TRIGGER */}
      {/* ========================================================== */}
      <a
        id="floating-whatsapp-trigger"
        href="https://wa.me/9350898919?text=Hi%20WEBZSTUDIO!%20I%20am%20exploring%20your%20premium%20agency%20page%20and%20want%20to%20discuss%20a%20responsive%20website%20project."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:from-white hover:to-white text-black rounded-2xl shadow-[0_10px_25px_rgba(0,229,255,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
        title="Chat live with Lakshay Verma"
      >
        <MessageSquare className="w-5.5 h-5.5 fill-black" />
      </a>

      {/* Floating live response indicator badge on left corner */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center space-x-2 bg-[#111827]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-lg">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono text-white/90">
          Response Status: <span className="text-[#00E5FF] font-bold">100% ONLINE</span>
        </span>
      </div>

    </div>
  );
}
