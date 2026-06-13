import { ServiceItem, PricingPlan, PortfolioProject, Testimonial, ProcessStep } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "business",
    title: "Business Websites",
    description: "High-performance corporate platforms crafted to establish industry authority, showcase premium services, and generate leads.",
    iconName: "Briefcase",
    features: ["Custom SEO Foundations", "Lead Intake Pipelines", "Service Catalog Directories", "Corporate Branding Alignment"]
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    description: "High-fidelity visual presentations for architects, designers, artists, and creators demanding premium aesthetic presence.",
    iconName: "Award",
    features: ["Cinematic Image Galleries", "Dynamic Interaction Touches", "Bespoke Typography Pairings", "Social Integration Hubs"]
  },
  {
    id: "political",
    title: "Political Websites",
    description: "Highly secure voter mobilization portals built to rally supporter movements, showcase community manifestos, and drive registrations.",
    iconName: "Vote",
    features: ["Supporter Sign-up Terminals", "Campaign Schedule Timelines", "Policy Document Highlights", "Optimized Mobile Readability"]
  },
  {
    id: "school",
    title: "School Websites",
    description: "Highly structured educational portals to organize academic courses, share parent-teacher guidelines, and facilitate admissions.",
    iconName: "GraduationCap",
    features: ["Online Admissions Guides", "Integrated Event Calendars", "Structured Document Repositories", "W3C Accessibility Compliant"]
  },
  {
    id: "restaurant",
    title: "Restaurant Websites",
    description: "Succulent visual menu guides coupled with table booking reservations, local map routes, and secure ordering callouts.",
    iconName: "UtensilsCrossed",
    features: ["Sensory Gourmet Photo Blocks", "Bespoke Menu Item Lists", "Table Reservation Inquiries", "Instant Contact Redirects"]
  },
  {
    id: "landing",
    title: "Landing Pages",
    description: "Laser-focused marketing pages built specifically to scale campaigns, focus buyer attention, and maximize high conversion ratios.",
    iconName: "Zap",
    features: ["Pristine Content Hierarchy", "High-Visibility Form Triggers", "Sub-Second Asset Loading", "Dynamic Action Sections"]
  },
  {
    id: "ecommerce",
    title: "E-commerce Websites",
    description: "High-converting digital storefronts tailored to exhibit physical or digital goods with cart triggers and localized checkouts.",
    iconName: "ShoppingBag",
    features: ["Modern Cart Experience", "Pragmatic Order Summaries", "Dynamic Product Sliders", "Smooth Catalog Filtering"]
  },
  {
    id: "custom",
    title: "Custom Websites",
    description: "Taylor-made state architectures engineered from the ground up to solve complex enterprise goals and fully custom layouts.",
    iconName: "Cpu",
    features: ["Exclusive Custom Features", "Dedicated State Storage", "Highly Scalable Codebases", "Optimized Fluid User Flow"]
  }
];

export const PRICING: PricingPlan[] = [
  {
    id: "plan-static",
    name: "Static Website",
    price: "₹5,500",
    popular: false,
    features: [
      "Modern Premium Dark UI Layout",
      "Sleek Single-Page Responsive Flow",
      "Sub-Second Touch Experience",
      "Fully Functional Contact Form",
      "Core SEO Metadata Configured",
      "Completed Delivery Within 3-5 Days"
    ]
  },
  {
    id: "plan-pro",
    name: "Professional Website",
    price: "₹9,000",
    popular: true,
    features: [
      "Custom Multi-Page Creative Architecture",
      "Advanced Layout Animations (Framer Motion)",
      "High-Conversion Mobile Layouts",
      "Direct Click-to-WhatsApp Integration",
      "Enhanced Google Rank Optimization",
      "Elite Interactive Review Carousel"
    ]
  },
  {
    id: "plan-custom",
    name: "Custom Website",
    price: "₹17,999",
    popular: false,
    features: [
      "Independently Engineered Custom Codebase",
      "End-to-End Bespoke System Design",
      "Dedicated Client Inquiry Storage",
      "High-Status Logo & Asset Graphics Bundle",
      "Priority WhatsApp & Email Support",
      "Full Launch Verification Suite"
    ]
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "portfolio-static",
    title: "Elite Horizon Branding",
    category: "Static Website",
    tech: ["React 18", "Vite", "Tailwind CSS"],
    mockupUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    gradient: "from-cyan-500 to-blue-600",
    metrics: "Sub-0.4s Fast Load Achieved"
  },
  {
    id: "portfolio-professional",
    title: "Aura Premium Ventures",
    category: "Professional Website",
    tech: ["React", "Motion", "Tailwind CSS", "Lucide Icons"],
    mockupUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-500 to-purple-600",
    metrics: "180% Higher Inbound Actions"
  },
  {
    id: "portfolio-custom",
    title: "Apex Gourmet Reserve",
    category: "Custom Website",
    tech: ["Fullstack React", "Tailwind CSS", "Motion API"],
    mockupUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-orange-600",
    metrics: "Interactive Live Reservation Complete"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Malhotra",
    role: "Proprietor",
    company: "Malhotra Enterprises",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "WEBZSTUDIO designed a premium website for my logistics firm. Leads increased within two weeks. The design looks very high-end and matches what international clients look for.",
    stars: 5
  },
  {
    id: "test-2",
    name: "Ananya Sharma",
    role: "Director",
    company: "Saraswati Learning Institute",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Our new clean school website has made parent-teacher communication extremely easy. Admissions guides are easy to locate, and feedback has been fantastic.",
    stars: 5
  },
  {
    id: "test-3",
    name: "Vikram Roy",
    role: "Owner",
    company: "Spice Bistro Lounge",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Customer feedback about our website menu layout is stellar. People easily view dishes on their mobile phones and directly book tables or call us.",
    stars: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Discovery",
    description: "We understand your targeted customer demographic, essential services, and conversion goals."
  },
  {
    step: "02",
    title: "Premium UI Planning",
    description: "We map out high-fidelity dark themes and elegant typographic hierarchies designed to establish trusts."
  },
  {
    step: "03",
    title: "Pixel-Perfect Development",
    description: "Our certified development architect writes clean, compliant React and Tailwind code with smooth scroll reveals."
  },
  {
    step: "04",
    title: "Fidelity Testing",
    description: "We verify the layout across iPhone, Android, tablets, and large screens to eliminate sizing overlaps."
  },
  {
    step: "05",
    title: "Conversion Delivery",
    description: "We launch your complete responsive platform with optimized metadata, ready to attract high-value inquiries."
  }
];
