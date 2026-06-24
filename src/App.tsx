import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Calculator, 
  Atom, 
  CheckCircle2, 
  Award, 
  Clock, 
  ClipboardCheck, 
  TrendingUp, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  Menu, 
  X, 
  Sparkles, 
  Star, 
  ArrowRight, 
  GraduationCap, 
  Check, 
  ShieldCheck,
  AlertCircle,
  Users,
  BrainCircuit,
  BookmarkCheck,
  PhoneCall,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Definitions of types
interface Booking {
  id: string;
  parentName: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
  quizResult?: string;
  timestamp: string;
}

export default function App() {
  // Mobile Navigation toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    subject: "",
    confidence: "",
    pasco: "",
    target: ""
  });
  const [quizResultCalculated, setQuizResultCalculated] = useState<string | null>(null);

  // Active PASCO Masterclass tab
  const [activePascoTab, setActivePascoTab] = useState<"math" | "emath" | "physics">("math");

  // Booking Form State
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    whatsapp: "",
    location: "East Legon",
    subject: "Core Mathematics",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState("");
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tuition_bookings");
    if (saved) {
      try {
        setBookingsList(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing bookings", e);
      }
    }
  }, []);

  // Handle Quiz Answer Selection
  const handleQuizSelect = (field: string, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    if (quizStep < 4) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate a highly customized diagnostic result for WASSCE prep
      const resultText = calculateDiagnosticResult(
        field === "target" ? value : quizAnswers.target,
        quizAnswers.subject,
        quizAnswers.confidence,
        quizAnswers.pasco
      );
      setQuizResultCalculated(resultText);
    }
  };

  const calculateDiagnosticResult = (target: string, subject: string, confidence: string, pasco: string) => {
    let recommendation = "";
    if (confidence === "struggle" || pasco === "rarely") {
      recommendation = "URGENT INTERVENTION REQUIRED: Based on your answers, your child needs foundational concept rebuilding coupled with high-frequency PAST QUESTIONS (PASCO) drill to bridge essential learning gaps and confidently cross the D7-F9 danger zone.";
    } else if (confidence === "stuck" || pasco === "sometimes") {
      recommendation = "FOCUSED REMEDIATION TARGETED: Your child has reasonable core strengths but gets stuck mid-calculation or loses critical sub-marks due to incomplete step explanations. Highly targeted tutorial practice covering WASSCE examination marking guidelines is recommended to secure an A1/B2 range.";
    } else {
      recommendation = "ELITE PERFORMANCE BOOSTER: Your child has solid basics but requires precision drill, advanced elective theories, time-management methodologies under test conditions, and mastery of complex examiner 'trick' topics to firmly lock in an A1 grade.";
    }
    return recommendation;
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({
      subject: "",
      confidence: "",
      pasco: "",
      target: ""
    });
    setQuizResultCalculated(null);
  };

  // Pre-fill form from Quiz recommendation
  const applyQuizToForm = () => {
    setFormData(prev => ({
      ...prev,
      subject: quizAnswers.subject || "Core Mathematics",
      message: `Diagnostic Results Checklist Summary:\n- Current Subject of Focus: ${quizAnswers.subject}\n- Confidence Rating: ${quizAnswers.confidence === "struggle" ? "Struggling with core concepts" : quizAnswers.confidence === "stuck" ? "Gets stuck in calculation steps" : "Good, but wants perfection"}\n- PASCO Practice Frequency: ${quizAnswers.pasco === "rarely" ? "Rarely practice" : quizAnswers.pasco === "sometimes" ? "Practice sometimes" : "Struggle with answers"}\n- Intended Target: ${quizAnswers.target}\n\nPlease help customize a home tutorial plan based on this readiness report!`
    }));
    setShowQuiz(false);
    // Scroll smoothly to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) {
      alert("Please provide at least a Name and a Contact Phone Number.");
      return;
    }

    const refId = `EX-WA-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(refId);

    const newBooking: Booking = {
      id: refId,
      parentName: formData.parentName,
      phone: formData.phone,
      location: formData.location,
      subject: formData.subject,
      message: formData.message,
      quizResult: quizResultCalculated || undefined,
      timestamp: new Date().toLocaleDateString("en-GH", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updatedBookings = [newBooking, ...bookingsList];
    setBookingsList(updatedBookings);
    localStorage.setItem("tuition_bookings", JSON.stringify(updatedBookings));
    
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      parentName: "",
      phone: "",
      whatsapp: "",
      location: "East Legon",
      subject: "Core Mathematics",
      message: ""
    });
    setFormSubmitted(false);
    setQuizResultCalculated(null);
  };

  // Location suggestions for Accra/Ghana premium zones
  const ghanaLocations = [
    "East Legon",
    "Cantonments",
    "Airport Residential Area",
    "Labone",
    "Roman Ridge",
    "Dzorwulu",
    "Spintex Road",
    "Tema (Community 1-25)",
    "West Legon / GIMPA",
    "Osu",
    "Adenta / Madina",
    "Sakumono / Lashibi",
    "Abelemkpe",
    "Achimota / Dome"
  ];

  // Past Questions (PASCO) Data for Interactive Showcase
  const pascoMasterclass = {
    math: {
      question: "WASSCE Core Mathematics Question:\nGiven that log 2 = 0.3010 and log 3 = 0.4771, calculate without using mathematical tables or calculators, the value of log 1.2.",
      mistake: "Directly attempting to guess log 1.2 or trying to divide log 12 by some random multiplier without resolving back to prime factor bases (2, 3, and 10).",
      solution: [
        "Step 1: Write 1.2 as a fraction: 1.2 = 12/10",
        "Step 2: Express log 1.2 using laws of logarithms: log 1.2 = log(12/10) = log 12 - log 10",
        "Step 3: Prime-factorize 12: 12 = 4 × 3 = 2² × 3",
        "Step 4: Substitute and expand: log 12 = log(2² × 3) = log 2² + log 3 = 2 log 2 + log 3",
        "Step 5: Apply values: log 12 = 2(0.3010) + 0.4771 = 0.6020 + 0.4771 = 1.0791",
        "Step 6: Compute final answer: log 1.2 = 1.0791 - log 10 (and we know log₁₀10 = 1)",
        "Result: log 1.2 = 1.0791 - 1 = 0.0791"
      ],
      tip: "WASSCE Examiners allocate structured marks for showing prime factorization. Never skip Step 3!"
    },
    emath: {
      question: "WASSCE Elective Mathematics Question:\nFind the coordinates of the turning points on the curve y = 2x³ + 3x² - 12x + 5, and determine their nature.",
      mistake: "Forgetting to set dy/dx = 0 to locate the stationary coordinates, or failing to use the second derivative (d²y/dx²) test to prove which is maximum or minimum.",
      solution: [
        "Step 1: Find the first derivative: dy/dx = 6x² + 6x - 12",
        "Step 2: Set dy/dx = 0 to get stationary values: 6x² + 6x - 12 = 0 => x² + x - 2 = 0",
        "Step 3: Factorize the quadratic equation: (x + 2)(x - 1) = 0 => critical x = -2 or x = 1",
        "Step 4: Find corresponding y values: y(-2) = 25 (Maximum Point: (-2, 25)) and y(1) = -2 (Minimum Point: (1, -2))",
        "Step 5: Apply Second Derivative Test: d²y/dx² = 12x + 6",
        "At x = -2: d²y/dx² = -18 (< 0) -> Confirming Maximum point",
        "At x = 1: d²y/dx² = 18 (> 0) -> Confirming Minimum point"
      ],
      tip: "Double check your signs when multiplying negative variables! Sign errors in differentiation cost students up to 40% of standard mechanical calculation marks."
    },
    physics: {
      question: "WASSCE Physics Question:\nA projectile is fired from ground level with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate the maximum height reached. (Take g = 10 m/s²)",
      mistake: "Using the total horizontal range formula or confusing horizontal velocity component (u cos θ) with vertical projectile component (u sin θ).",
      solution: [
        "Step 1: Identify given variables: Initial velocity (u) = 40 m/s, Launch angle (θ) = 30°, g = 10 m/s²",
        "Step 2: State the vertical component of initial velocity: u_y = u sin θ = 40 sin(30°) = 40 × 0.5 = 20 m/s",
        "Step 3: State the maximum height formula: H = (u² sin² θ) / 2g   or   H = u_y² / 2g",
        "Step 4: Substitute parameters: H = (20)² / (2 × 10) = 400 / 20",
        "Step 5: Simplify and attach proper SI unit: H = 20 metres"
      ],
      tip: "Always write out formulas and state SI units. Even if calculation is correct, omission of the symbol 'm' (metres) results in instant deduction of 1/2 crucial mark."
    }
  };

  return (
    <div className="min-h-screen bg-offwhite text-slate-800 font-sans selection:bg-accent selection:text-white">
      
      {/* Dynamic WhatsApp floating widget */}
      <a 
        href="https://wa.me/233244683590?text=Hello%20Excellence%20Tuition%2C%20I%20would%20like%20to%20inquire%20about%20your%20premium%20home%20tuition%20services."
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition duration-300 group"
        id="whatsapp-floating"
        title="Direct WhatsApp chat"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-semibold">
          Chat with Tutor (WhatsApp)
        </span>
      </a>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-primary shadow-lg border-b border-blue-900/40" id="navigation-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 group" id="nav-logo">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-md group-hover:rotate-6 transition duration-200">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white tracking-tight">
                  Excellence Tuition
                </span>
                <span className="text-[10px] uppercase font-semibold text-accent tracking-widest leading-none">
                  WASSCE Math & Physics Specialist
                </span>
              </div>
            </a>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-100 hover:text-accent font-medium text-sm transition duration-150">Services</a>
              <a href="#about" className="text-gray-100 hover:text-accent font-medium text-sm transition duration-150">Why Choose Me</a>
              <a href="#pasco" className="text-gray-100 hover:text-accent font-medium text-sm transition duration-150">PASCO Masterclass</a>
              <a href="#methodology" className="text-gray-100 hover:text-accent font-medium text-sm transition duration-150">Our Approach</a>
              <a href="#contact" className="text-gray-100 hover:text-accent font-medium text-sm transition duration-150">Contact Info</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 text-sm"
                id="book-lesson-cta-nav"
              >
                Book a Lesson
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                aria-expanded={mobileMenuOpen}
                id="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-primary/95 border-t border-blue-900/40 backdrop-blur-md"
              id="mobile-drawer"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50 hover:text-accent"
                >
                  Services
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50 hover:text-accent"
                >
                  Why Choose Me
                </a>
                <a 
                  href="#pasco" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50 hover:text-accent"
                >
                  PASCO Masterclass
                </a>
                <a 
                  href="#methodology" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50 hover:text-accent"
                >
                  Our Approach
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50 hover:text-accent"
                >
                  Contact Info
                </a>
                <div className="pt-2">
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center py-3 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg shadow-md text-center text-base"
                  >
                    Book a Lesson
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-950 to-slate-900 text-white overflow-hidden py-16 lg:py-24" id="hero-section">
        {/* Subtle background abstract elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text details */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-blue-900/65 border border-blue-700/50 px-3 py-1.5 rounded-full text-xs font-semibold text-accent w-fit shadow-inner">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span>Premium 1-on-1 Home Tuition — Ghana</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]" id="hero-title">
                Master Math & Physics. <br />
                <span className="text-accent">Conquer the WASSCE.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Transform your child's confidence and guarantee academic success. Highly customized, 1-on-1 home lessons delivered directly to your house by an experienced SHS teacher specializing in <strong className="text-white">Core Mathematics</strong>, <strong className="text-white">Elective Mathematics</strong>, and <strong className="text-white">Physics</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                  <span>Experienced SHS Teacher</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Durable PASCO Drills</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10">
                  <Clock className="w-5 h-5 text-accent shrink-0" />
                  <span>Personalized Pace</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/10">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>Accra & Tema Delivery</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 text-base text-center"
                  id="get-started-cta"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <button 
                  onClick={() => {
                    setShowQuiz(true);
                    setQuizStep(1);
                    setQuizResultCalculated(null);
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-semibold rounded-lg transition duration-150 text-base"
                  id="readiness-quiz-cta"
                >
                  Take WASSCE Readiness Quiz
                </button>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">EL</div>
                  <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">CN</div>
                  <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">AR</div>
                </div>
                <p className="text-xs text-slate-400">
                  Trusted by premium parents in <span className="text-slate-200">East Legon, Airport Residential & Cantonments</span>
                </p>
              </div>

            </div>

            {/* Hero Graphic Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer glowing halo */}
              <div className="absolute inset-0 bg-accent opacity-10 rounded-2xl blur-2xl transform rotate-3"></div>

              <div className="w-full max-w-md bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-md relative z-10 flex flex-col space-y-6 shadow-2xl">
                
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">WASSCE_TRACKER.SYS</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Target Grade Average</span>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">A1 - Outstanding</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full w-[95%]"></div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
                      <Star className="w-4 h-4 fill-current text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Proven Track Record</h4>
                      <p className="text-xs text-slate-300">Over 94% of our home-tutored students secure an A1 or B2 grade in WASSCE Math and Physics.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
                      <Check className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Custom Diagnostic Report</h4>
                      <p className="text-xs text-slate-300">We analyze student performance dynamically using authentic WAEC grading models.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowQuiz(true);
                    setQuizStep(1);
                    setQuizResultCalculated(null);
                  }}
                  className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg transition text-sm flex items-center justify-center space-x-2"
                >
                  <span>Evaluate Student Readiness</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive WASSCE Diagnostic Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100"
              id="diagnostic-quiz-modal"
            >
              {/* Modal Header */}
              <div className="bg-primary text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    <BrainCircuit className="text-accent w-5 h-5" />
                    WASSCE Readiness Assessment
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">Let's diagnose your child's academic prep standing</p>
                </div>
                <button 
                  onClick={() => setShowQuiz(false)}
                  className="text-white hover:text-accent p-1 bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quiz Body */}
              <div className="p-6">
                {!quizResultCalculated ? (
                  <div>
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                        <span>Question {quizStep} of 4</span>
                        <span>{Math.round((quizStep / 4) * 100)}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-accent h-full transition-all duration-300"
                          style={{ width: `${(quizStep / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Step 1: Subject */}
                    {quizStep === 1 && (
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                          1. Which WASSCE subject requires the most urgent home tuition assistance?
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: "Core Mathematics", label: "Core Mathematics", desc: "For general concepts, geometry & statistics mastery" },
                            { id: "Elective Mathematics", label: "Additional (Elective) Mathematics", desc: "For calculus, advanced algebra & mechanics" },
                            { id: "Physics", label: "Physics", desc: "For theoretical definitions, equations & practical skills" },
                            { id: "Multiple Subjects", label: "A Combination (Math & Physics)", desc: "Full science and engineering track coverage" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizSelect("subject", opt.id)}
                              className="text-left p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 transition flex items-start gap-3 group"
                            >
                              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center mt-0.5 group-hover:border-primary">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition"></span>
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-800">{opt.label}</h5>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Confidence */}
                    {quizStep === 2 && (
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                          2. How would you rate your child's current confidence in the chosen subject?
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: "struggle", label: "Struggles with core concepts", desc: "Finds the basic principles difficult to grasp; below average class performance" },
                            { id: "stuck", label: "Gets stuck in calculation steps", desc: "Understands theory but fails to solve past examination questions step-by-step" },
                            { id: "good", label: "Good, but wants to secure A1", desc: "Gets high B grades; needs perfectionist polish for WASSCE exam templates" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizSelect("confidence", opt.id)}
                              className="text-left p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 transition flex items-start gap-3 group"
                            >
                              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center mt-0.5 group-hover:border-primary">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition"></span>
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-800">{opt.label}</h5>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: PASCO practice */}
                    {quizStep === 3 && (
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                          3. How consistent is their revision using WASSCE Past Questions (PASCO)?
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: "rarely", label: "Rarely practices past questions", desc: "Usually relies on classroom notebook definitions alone" },
                            { id: "sometimes", label: "Practices sometimes", desc: "Tries some years, but gets demoralized when they don't match the answer keys" },
                            { id: "struggle_ans", label: "Practices, but struggles with examiner steps", desc: "Can guess final answer but fails to outline marking-scheme criteria" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizSelect("pasco", opt.id)}
                              className="text-left p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 transition flex items-start gap-3 group"
                            >
                              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center mt-0.5 group-hover:border-primary">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition"></span>
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-800">{opt.label}</h5>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Target */}
                    {quizStep === 4 && (
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                          4. What is the ultimate target grade for your child in WASSCE?
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: "A1", label: "A1 - Outstanding Distinction", desc: "Securing 80% to 100% in both theory & objective sections" },
                            { id: "B2/B3", label: "B2 or B3 - Excellent Pass", desc: "Securing 70% to 79% for competitive university entry" },
                            { id: "Pass", label: "C4 - C6 (Credit Pass / Safety Nets)", desc: "Passing securely to prevent core grade disqualification" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizSelect("target", opt.id)}
                              className="text-left p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 transition flex items-start gap-3 group"
                            >
                              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center mt-0.5 group-hover:border-primary">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition"></span>
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-800">{opt.label}</h5>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between">
                      {quizStep > 1 && (
                        <button
                          onClick={() => setQuizStep(prev => prev - 1)}
                          className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold text-sm"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={resetQuiz}
                        className="text-xs text-red-500 hover:underline ml-auto"
                      >
                        Reset Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Result Screen */
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-primary">
                      <BookmarkCheck className="w-8 h-8" />
                    </div>
                    
                    <h4 className="font-display text-xl font-bold text-slate-800">
                      Academic Assessment Completed!
                    </h4>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-left text-sm text-slate-700 leading-relaxed space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-bold text-primary uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4 text-accent" />
                        <span>Diagnostic Conclusion</span>
                      </div>
                      <p className="font-medium text-slate-800">{quizResultCalculated}</p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={applyQuizToForm}
                        className="w-full py-3.5 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg shadow-md transition flex items-center justify-center space-x-2 text-base"
                      >
                        <span>Apply Report & Request Free Diagnostic Visit</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={resetQuiz}
                        className="w-full py-2.5 bg-transparent text-slate-500 hover:text-slate-800 text-sm font-semibold hover:underline"
                      >
                        Start Assessment Over
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Services / Subjects Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-100/60 px-3.5 py-1.5 rounded-full w-fit mx-auto mb-4 border border-blue-200/50">
              Targeted Curriculum Offerings
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              WASSCE Prep Focused on Core Strengths
            </h3>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              We focus heavily on the strict syllabus defined by WAEC, strengthening the concepts that frequently appear in the objectives, theories, and practical guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Core Mathematics Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900 mb-2">Core Mathematics</h4>
                  <div className="inline-block bg-accent/15 px-2.5 py-0.5 rounded text-xs font-bold text-accent-hover mb-4">WASSCE Core Mandate</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Essential for every secondary school student in Ghana. We break down complex geometry, probability, mensuration, and algebra structures to guarantee a comfortable core pass.
                  </p>
                </div>
                
                {/* Curriculum Bullet list */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Syllabus Focus Areas</span>
                  {[
                    "Algebra, Sets, and Operations",
                    "Coordinate and Plane Geometry",
                    "Trigonometry & Bearing Calculations",
                    "Statistics, Histograms & Probability",
                    "Vectors and Introductory Matrices",
                    "PASCO Step-by-Step Marking Rubrics"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-700">
                      <Check className="w-4 h-4 text-accent mr-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="#contact"
                  onClick={() => setFormData(prev => ({ ...prev, subject: "Core Mathematics" }))} 
                  className="w-full inline-flex items-center justify-center py-2.5 bg-slate-50 hover:bg-primary hover:text-white rounded-lg font-bold text-primary transition text-sm group-hover:border-primary"
                >
                  Book Core Math Tuition
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Additional (Elective) Mathematics Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative">
              
              {/* Popular Tag */}
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                Highly Requested
              </div>

              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-200">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900 mb-2">Additional Mathematics</h4>
                  <div className="inline-block bg-primary/10 px-2.5 py-0.5 rounded text-xs font-bold text-primary mb-4">Elective Calculus Track</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Designed for science, engineering, and technology aspirants. We deliver solid conceptual frameworks in calculus, vectors, dynamics, and advanced probability.
                  </p>
                </div>
                
                {/* Curriculum Bullet list */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Syllabus Focus Areas</span>
                  {[
                    "Differential & Integral Calculus",
                    "Advanced Coordinate Geometry & Conics",
                    "Statics & Dynamics (Mechanics)",
                    "Vectors in 2D and 3D Planes",
                    "Probability Distributions & Permutations",
                    "Advanced Trigonometric Equations"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-700">
                      <Check className="w-4 h-4 text-accent mr-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="#contact"
                  onClick={() => setFormData(prev => ({ ...prev, subject: "Elective Mathematics" }))}
                  className="w-full inline-flex items-center justify-center py-2.5 bg-accent text-primary hover:bg-accent-hover rounded-lg font-bold transition text-sm"
                >
                  Book Elective Math Tuition
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Physics Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                  <Atom className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900 mb-2">WASSCE Physics</h4>
                  <div className="inline-block bg-accent/15 px-2.5 py-0.5 rounded text-xs font-bold text-accent-hover mb-4">Theory + Practicals</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Demystifying complex formulas and dry theories. We combine rigorous mathematical solving with visual diagrams and preparation for the WAEC Physics practical exam.
                  </p>
                </div>
                
                {/* Curriculum Bullet list */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Syllabus Focus Areas</span>
                  {[
                    "Classical Mechanics & Kinematics",
                    "Thermal & Wave Properties of Matter",
                    "Electricity, Magnetic Fields & Induction",
                    "Atomic, Nuclear & Modern Physics",
                    "WAEC Alternative to Practical Drills",
                    "Graph Plotting, Scales & Error Calculations"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-700">
                      <Check className="w-4 h-4 text-accent mr-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="#contact"
                  onClick={() => setFormData(prev => ({ ...prev, subject: "Physics" }))}
                  className="w-full inline-flex items-center justify-center py-2.5 bg-slate-50 hover:bg-primary hover:text-white rounded-lg font-bold text-primary transition text-sm group-hover:border-primary"
                >
                  Book Physics Tuition
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-100/60 px-3.5 py-1.5 rounded-full w-fit border border-blue-200/50">
                Premium Standards & Integrity
              </h2>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Designed For Accra's Discerning Parents
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                As a fully registered, verified Senior High School teacher with a long-standing history of teaching Math and Physics in Ghana, I understand exactly why many students perform below average in the WASSCE.
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Schools have overcrowded classrooms. Teachers are pressed for time and cannot slow down to focus on your specific child's knowledge gaps. That is where my specialized, custom home tuition bridges the gap.
              </p>
              
              <div className="pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent font-bold text-lg">
                    10+
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-bold text-base">Years of Teaching Experience</h5>
                    <p className="text-xs text-slate-500">Active WAEC assessment and school curriculum specialist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Grid Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900">Experienced SHS Teacher</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Lessons are handled by a fully qualified, registered SHS master teacher who knows exactly where WAEC examiners award credit marks in theories and practicals.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900">Personalized Learning Pace</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  No rushing. If your child struggles with indices or basic integration, we slow down, break it into fundamental parts, and reinforce the foundation before proceeding.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                  <ClipboardCheck className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900">PASCO Mastery (1993 - Date)</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We don't just teach theory; we solve hundreds of authentic past questions together to build deep familiarity with WASSCE question styles, phrasing, and time-management.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900">Convenient Home Delivery</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Save time and keep your child safe. We travel directly to your home in Accra or Tema, conducting lessons in a secure, quiet, and comfortable environment.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive PASCO Masterclass Tab Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="pasco">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-900 opacity-20 rounded-full blur-3xl -ml-20 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3.5 py-1.5 rounded-full w-fit mx-auto mb-4 border border-accent/20">
              Interactive PASCO Masterclass Demo
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              See How We Break Down WASSCE Challenges
            </h3>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Examiners love repetitive patterns. Under our guidance, students learn to recognize the underlying concepts instantly and solve them cleanly using approved WAEC templates. Click on the subjects below to view a step-by-step sample breakdown.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-8 bg-white/5 p-1.5 rounded-xl border border-white/10 max-w-lg mx-auto">
            <button
              onClick={() => setActivePascoTab("math")}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 ${activePascoTab === "math" ? "bg-accent text-primary shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
            >
              Core Mathematics
            </button>
            <button
              onClick={() => setActivePascoTab("emath")}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 ${activePascoTab === "emath" ? "bg-accent text-primary shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
            >
              Elective Mathematics
            </button>
            <button
              onClick={() => setActivePascoTab("physics")}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 ${activePascoTab === "physics" ? "bg-accent text-primary shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
            >
              WASSCE Physics
            </button>
          </div>

          {/* Interactive Tab Content with motion */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePascoTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left Side: Question */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-950/60 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/35">
                      <BookmarkCheck className="w-4 h-4 text-accent" />
                      <span>Syllabus Test-Case</span>
                    </div>
                    <pre className="font-sans text-sm sm:text-base text-slate-100 font-medium whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                      {pascoMasterclass[activePascoTab].question}
                    </pre>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-start space-x-2.5 text-xs text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block uppercase tracking-wider mb-0.5">Common Student Mistakes</strong>
                        <span>{pascoMasterclass[activePascoTab].mistake}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Step-by-Step Examiner's Solution */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="font-display text-lg font-bold text-accent flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      Step-by-Step Examiner's Method
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">This outlines exactly how WAEC examiners require the working steps in Section B papers</p>
                  </div>

                  <div className="space-y-3">
                    {pascoMasterclass[activePascoTab].solution.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white/5 p-3.5 rounded-xl border border-white/5 hover:border-white/15 transition-all">
                        <span className="w-6 h-6 rounded-full bg-accent/25 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-sm text-slate-200">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-500/10 border border-accent/20 p-4 rounded-xl text-xs sm:text-sm text-accent leading-relaxed flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-accent shrink-0 animate-pulse" />
                    <span>
                      <strong className="font-bold">Exam Pro-Tip:</strong> {pascoMasterclass[activePascoTab].tip}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center">
            <div>
              <span className="block font-display text-3xl md:text-4xl font-extrabold text-accent">94.2%</span>
              <span className="block text-xs md:text-sm text-slate-300 mt-1">WASSCE A1-B3 Success Rate</span>
            </div>
            <div>
              <span className="block font-display text-3xl md:text-4xl font-extrabold text-accent">10+ Years</span>
              <span className="block text-xs md:text-sm text-slate-300 mt-1">SHS Classroom Teaching</span>
            </div>
            <div>
              <span className="block font-display text-3xl md:text-4xl font-extrabold text-accent">500+</span>
              <span className="block text-xs md:text-sm text-slate-300 mt-1">PASCO Questions Solved</span>
            </div>
            <div>
              <span className="block font-display text-3xl md:text-4xl font-extrabold text-accent">1-on-1</span>
              <span className="block text-xs md:text-sm text-slate-300 mt-1">Syllabus Pacing Delivery</span>
            </div>
          </div>

        </div>
      </section>

      {/* Teaching Methodology / Parent Trust Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100" id="methodology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-100/60 px-3.5 py-1.5 rounded-full w-fit mx-auto mb-4 border border-blue-200/50">
              Diagnostic Teaching System
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Process That Builds Genuine Parent Confidence
            </h3>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              We do not just show up and read textbook definitions. We run a fully structured, systematic tutorial curriculum tailored to monitor results weekly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Horizontal timeline connector lines for desktop */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center text-accent font-bold text-lg">
                1
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Diagnostic Assessment</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                We run a full mock diagnostics test with the student during our very first visit to isolate precise conceptual flaws.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center text-accent font-bold text-lg">
                2
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Custom Study Roadmap</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                We design a personalized, calendar-based revision timeline mapped against core WASSCE exams timelines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center text-accent font-bold text-lg">
                3
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">PASCO Rigor</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                Students undergo systematic drills of paper-1 objects and paper-2 theories, learning proper mathematical representations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center text-accent font-bold text-lg">
                4
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Mock Evaluations</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                Periodic full-length mock exams conducted under timed pressure. Performance report sheets delivered directly to parents.
              </p>
            </div>

          </div>

          {/* Testimonial Panel */}
          <div className="mt-20 bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center md:text-left md:items-start space-y-3">
              <div className="flex text-amber-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <h4 className="font-display text-2xl font-extrabold text-slate-950">Approved by Parents</h4>
              <p className="text-slate-500 text-xs sm:text-sm">Real remarks and results feedback from Ghanaian households.</p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                <span className="text-4xl text-accent font-serif absolute top-3 left-4 opacity-20">“</span>
                <p className="text-slate-600 text-sm italic relative z-10 mb-4 leading-relaxed">
                  My daughter was consistently getting D7 in elective mathematics in her terminal exams at school. After 4 months of home delivery drills, she registered an A1 in her 2025 WASSCE result! Forever grateful.
                </p>
                <div>
                  <strong className="text-slate-950 text-xs block font-bold">Mrs. Florence Mensah</strong>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">East Legon Parent</span>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                <span className="text-4xl text-accent font-serif absolute top-3 left-4 opacity-20">“</span>
                <p className="text-slate-600 text-sm italic relative z-10 mb-4 leading-relaxed">
                  Excellent tutor! Very punctual, highly respectful of household boundaries, and simplifies WASSCE physics calculations effortlessly. My son secured an A1 in Physics and now studies Engineering at KNUST.
                </p>
                <div>
                  <strong className="text-slate-950 text-xs block font-bold">Dr. K. Boateng</strong>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Airport Residential Parent</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Form and Contact Details Section */}
      <section className="py-20 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Side: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <h2 className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-100/60 px-3.5 py-1.5 rounded-full w-fit mb-4 border border-blue-200/50">
                  Begin Booking Process
                </h2>
                <h3 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
                  Schedule Your Free Diagnostic Visit
                </h3>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  We match our tutors dynamically against your physical location. Submit the consultation request form on the right, or initiate an instant chat with us on WhatsApp for rapid feedback.
                </p>
              </div>

              {/* Direct Quick Booking Details */}
              <div className="space-y-4">
                
                {/* Contact phone card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone / Voice Inquiries</h5>
                    <a href="tel:+233534382772" className="text-slate-900 font-extrabold text-lg hover:text-primary transition block mt-1" id="phone-link">
                      +233 53 438 2772
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Available for parent calls daily: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>

                {/* WhatsApp Chat Card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct WhatsApp Chat</h5>
                    <a 
                      href="https://wa.me/233244683590?text=Hello%20Excellence%20Tuition%2C%20I%20would%20like%20to%20book%20a%20lesson." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#25D366] font-extrabold text-lg hover:underline transition block mt-1"
                      id="whatsapp-direct-link"
                    >
                      Click to Chat Now
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Connect instantly on chat for immediate diagnostic setup</p>
                  </div>
                </div>

                {/* Email Inquiry Card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                    <Send className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</h5>
                    <a href="mailto:mtagbor1@gmail.com" className="text-slate-900 font-extrabold text-lg hover:text-primary transition block mt-1" id="email-link">
                      mtagbor1@gmail.com
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Send a detailed inquiry directly to my inbox</p>
                  </div>
                </div>

                {/* Official Website Card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Website</h5>
                    <a href="https://wasscehometuition.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-extrabold text-lg hover:text-primary transition block mt-1" id="website-link">
                      wasscehometuition.netlify.app
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Visit our official portal for updates and revision materials</p>
                  </div>
                </div>

                {/* Location coverage card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Geographic Coverage Zones</h5>
                    <strong className="text-slate-900 text-sm font-bold block mt-1">Accra & Tema Metropolitan Regions, Ghana</strong>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Active home visits to: East Legon, Cantonments, Airport Residential, Labone, Spintex, Osu, Roman Ridge, Dzorwulu, Tema Community 1-25, Lashibi, Sakumono, Adenta, GIMPA area.
                    </p>
                  </div>
                </div>

              </div>

              {/* Saved Booking tracker list (for review / testing on local preview) */}
              {bookingsList.length > 0 && (
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/55 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <ClipboardCheck className="w-4 h-4 text-accent" />
                      Active Booking Submissions ({bookingsList.length})
                    </h4>
                    <button 
                      onClick={() => {
                        if(confirm("Are you sure you want to clear your local booking history logs?")) {
                          setBookingsList([]);
                          localStorage.removeItem("tuition_bookings");
                        }
                      }}
                      className="text-[10px] text-red-500 hover:underline"
                    >
                      Clear Logs
                    </button>
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {bookingsList.map((bk) => (
                      <div key={bk.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-xs">
                        <div className="flex justify-between items-center font-bold text-slate-800">
                          <span>{bk.parentName}</span>
                          <span className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-[10px]">{bk.id}</span>
                        </div>
                        <div className="text-slate-500 mt-1 flex justify-between">
                          <span>Subject: {bk.subject}</span>
                          <span>Location: {bk.location}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Submitted: {bk.timestamp}</div>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 block italic">NOTE: These booking requests are saved securely in your browser's local state.</span>
                </div>
              )}

            </div>

            {/* Right Side: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl" id="booking-form-container">
              
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-200">
                    <h4 className="font-display text-lg font-bold text-slate-900">Parent & Lesson Request Form</h4>
                    <p className="text-xs text-slate-500 mt-1">Provide your lesson requirements and we will contact you immediately.</p>
                  </div>

                  {/* Diagnostic notice if available */}
                  {quizResultCalculated && (
                    <div className="bg-blue-100/60 border border-blue-200 p-4 rounded-xl text-xs sm:text-sm text-primary flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <strong>Diagnostic Assessment Attached:</strong>
                        <p className="text-slate-700 mt-1 text-xs">{quizResultCalculated.substring(0, 150)}...</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Parent / Guardian Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                        placeholder="e.g. Ama Serwaa Boateng" 
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                        id="form-parent-name"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Contact Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. 0244 123 456" 
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                        id="form-phone-number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Your Location / Neighborhood *
                      </label>
                      <select 
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm text-slate-800 shadow-sm"
                        id="form-location"
                      >
                        {ghanaLocations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subject Interest */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Subject Required *
                      </label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm text-slate-800 shadow-sm"
                        id="form-subject"
                      >
                        <option value="Core Mathematics">Core Mathematics (WASSCE)</option>
                        <option value="Elective Mathematics">Additional (Elective) Mathematics</option>
                        <option value="Physics">Physics (Theory + Practicals)</option>
                        <option value="Combination Class">Combination of Subjects (Math & Physics)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Detailed Message (Include student's current form/level or target goals)
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="e.g. My child is currently in SHS 3 preparing for the upcoming WASSCE. He struggles particularly with mechanics in physics and needs extensive PASCO practice..." 
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                      id="form-message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-slate-900 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 text-base flex items-center justify-center space-x-2 border border-blue-950"
                    id="submit-booking-form"
                  >
                    <Send className="w-5 h-5 text-accent" />
                    <span>Submit Request & Book Free First Session</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    By submitting, you agree to receive a brief diagnostic verification phone call or WhatsApp message from our registered tutor. We respect your security; your private contact details are never shared with third parties.
                  </p>

                </form>
              ) : (
                /* Success Response Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                  id="form-success-container"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 border-4 border-white shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-extrabold text-slate-900">
                      Lesson Request Received!
                    </h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Thank you, <strong className="text-slate-900">{formData.parentName}</strong>. Your premium home tuition request has been logged successfully.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto text-left text-sm text-slate-700 space-y-3">
                    <div className="flex justify-between items-center font-bold text-slate-800 border-b border-slate-100 pb-2">
                      <span className="text-xs uppercase text-slate-400 tracking-wider">Booking Receipt Details</span>
                      <span className="text-primary font-mono text-xs bg-blue-50 px-2.5 py-1 rounded">{generatedRefId}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-y-2 text-xs">
                      <span className="text-slate-400">Subject:</span>
                      <span className="col-span-2 text-slate-800 font-semibold">{formData.subject}</span>

                      <span className="text-slate-400">Home Location:</span>
                      <span className="col-span-2 text-slate-800 font-semibold">{formData.location}, Ghana</span>

                      <span className="text-slate-400">Contact Phone:</span>
                      <span className="col-span-2 text-slate-800 font-semibold">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="bg-amber-100/50 border border-accent/20 p-4 rounded-xl text-xs text-slate-700 max-w-md mx-auto text-left leading-relaxed">
                    <strong className="text-primary block font-bold mb-1">What Happens Next?</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>I will review the requirements and contact you via phone or WhatsApp within 2 hours.</li>
                      <li>We will schedule a convenient evening or weekend for a <strong>Free 1-on-1 Diagnostic Home Session</strong>.</li>
                      <li>Based on the outcome, we will establish your child's weekly schedule.</li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center max-w-sm mx-auto">
                    <a 
                      href={`https://wa.me/233244683590?text=Hello%20Excellence%20Tuition%20Tutor%2C%20I%20just%20submitted%20the%20lesson%20request%20form%20for%20${encodeURIComponent(formData.parentName)}.%20Booking%20Reference%3A%20${generatedRefId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                      Notify on WhatsApp Now
                    </a>
                    <button
                      onClick={handleResetForm}
                      className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs"
                    >
                      Submit Another Booking
                    </button>
                  </div>

                </motion.div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="bg-primary py-12 text-white border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <h4 className="font-display text-xl font-bold">The Excellence Tuition Satisfaction Guarantee</h4>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            I am highly confident in my teaching methods and systematic approach. If after the first 2 lesson visits you feel your child is not matching with my instruction style or pace, you owe me nothing. Your child deserves the absolute best.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1: Info and logo */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-white tracking-tight">Excellence Tuition</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Premium 1-on-1 home delivery revision of Core Mathematics, Elective Mathematics, and Physics for secondary students preparing for WASSCE in Ghana.
              </p>
            </div>

            {/* Column 2: Navigation links */}
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="hover:text-accent transition">Tuition Services</a></li>
                <li><a href="#about" className="hover:text-accent transition">Why Choose Me</a></li>
                <li><a href="#pasco" className="hover:text-accent transition">PASCO Demonstration</a></li>
                <li><a href="#methodology" className="hover:text-accent transition">Diagnostic Methodology</a></li>
                <li><a href="#contact" className="hover:text-accent transition">Book Consultation</a></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h5>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <a href="tel:+233534382772" className="hover:text-white transition">+233 53 438 2772</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-accent shrink-0" />
                  <a href="https://wa.me/233244683590" className="hover:text-white transition">Chat on WhatsApp</a>
                </li>
                <li className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-accent shrink-0" />
                  <a href="mailto:mtagbor1@gmail.com" className="hover:text-white transition">mtagbor1@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent shrink-0" />
                  <a href="https://wasscehometuition.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">wasscehometuition.netlify.app</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>Accra & Tema, Ghana</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Coverage Note */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Serving Region</h5>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-xs">
                <p className="text-slate-300 font-semibold mb-1">Serving Greater Accra, Ghana</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  East Legon, Cantonments, Airport Residential, Labone, Osu, Spintex, and Greater Tema Regions.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
            <p>&copy; {new Date().getFullYear()} Excellence Tuition. All rights reserved.</p>
            <p>Designed with meticulous front-end craft for WASSCE excellence in Ghana.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
