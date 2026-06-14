import { ServiceItem, PricingPlan, PortfolioProject, Testimonial, ProcessStep } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "business",
    title: "Business Websites",
    description: "We build professional, trust-building websites for companies. Perfect for showcasing your services, sharing customer reviews, and getting fresh business inquiries every day.",
    iconName: "Briefcase",
    features: ["Google Search Ready (SEO)", "Contact Information Forms", "Clean Service lists", "Brand & Logo alignment"]
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    description: "A beautiful, premium way to showcase your creative work. Designed to look clean, elegant, and highly professional for architects, designers, and creators.",
    iconName: "Award",
    features: ["High-quality image grids", "Smooth visual touch effects", "Custom elegant fonts", "Social media profile links"]
  },
  {
    id: "political",
    title: "Political Websites",
    description: "Secure and easy-to-read campaign websites. Share your vision, connect directly with local voters, support registration, and post regular campaign updates.",
    iconName: "Vote",
    features: ["Supporter registration pages", "Campaign timelines & agendas", "Public document templates", "Superb mobile layout"]
  },
  {
    id: "school",
    title: "School Websites",
    description: "Clean and well-organized portals for schools, academies, and coaching institutes. Share notifications, calendars, and academic guides with parents and students.",
    iconName: "GraduationCap",
    features: ["Admissions & registration helper", "School events & notifications", "Downloadable syllabus files", "Easy principal message section"]
  },
  {
    id: "restaurant",
    title: "Restaurant Menu Websites",
    description: "Mouth-watering online menus with beautiful food photography. Let customers view your dishes on mobile and book tables or call you instantly.",
    iconName: "UtensilsCrossed",
    features: ["Gorgeous food photo columns", "Interactive food list menu", "Book-a-table inquiries", "One-click call-button"]
  },
  {
    id: "landing",
    title: "High-Converting Landing Pages",
    description: "Single-page promotional sites that keep visitors focused on one clear action. Perfect for active ad campaigns, product launches, or capturing leads.",
    iconName: "Zap",
    features: ["Clear and catchy headings", "Prominent sign-up buttons", "Direct WhatsApp link-out", "Focused benefit cards"]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Stores",
    description: "Responsive online storefronts designed to detail your physical or digital products. Includes clean shopping carts, checkout forms, and simple product views.",
    iconName: "ShoppingBag",
    features: ["Smooth cart recalculation", "Clean order lists & summaries", "Product slideshow blocks", "Easy catalog category filter"]
  },
  {
    id: "custom",
    title: "Bespoke Custom Websites",
    description: "Need something completely original? We write secure custom code bases to solve your unique business challenges and match your exact aesthetic vision.",
    iconName: "Cpu",
    features: ["Custom interactive modules", "Tailor-made state features", "High performance coding", "Direct WhatsApp updates access"]
  }
];

export const PRICING: PricingPlan[] = [
  {
    id: "plan-static",
    name: "Static Website",
    price: "₹5,500",
    popular: false,
    features: [
      "Modern Single-Page Layout",
      "Fast & responsive on all mobile devices",
      "Functional customer contact form",
      "Basic Google Search configuration (SEO)",
      "Free launcher support & guidance",
      "Fast delivery within 3-5 working days"
    ]
  },
  {
    id: "plan-pro",
    name: "Professional Website",
    price: "₹9,000",
    popular: true,
    features: [
      "Custom Multi-Page Design",
      "Beautiful, modern smooth animations",
      "Super-fast loading with zero lag",
      "Direct Click-to-WhatsApp button",
      "Advanced Google ranking setting",
      "Customer review showcase section"
    ]
  },
  {
    id: "plan-custom",
    name: "Custom Website",
    price: "₹17,999",
    popular: false,
    features: [
      "Custom code built entirely from scratch",
      "Bespoke layout and unique color palette",
      "Interactive customer inquiry panel",
      "Free logo and assets graphics bundle",
      "Priority WhatsApp support from founder",
      "Rigorous pre-launch device testing"
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
    metrics: "Loads instantly in 0.4 seconds"
  },
  {
    id: "portfolio-professional",
    title: "Aura Premium Ventures",
    category: "Professional Website",
    tech: ["React", "Motion", "Tailwind CSS", "Lucide Icons"],
    mockupUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-500 to-purple-600",
    metrics: "Engineered for high leads growth"
  },
  {
    id: "portfolio-custom",
    title: "Apex Gourmet Reserve",
    category: "Custom Website",
    tech: ["Fullstack React", "Tailwind CSS", "Motion API"],
    mockupUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-orange-600",
    metrics: "Includes live table booking simulation"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Malhotra",
    role: "Proprietor",
    company: "Malhotra Enterprises",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "WEBZSTUDIO built a premium portal for my logistics business. Our inquiries grew immediately. The website looks very international and quickly wins client trust.",
    stars: 5
  },
  {
    id: "test-2",
    name: "Ananya Sharma",
    role: "Director",
    company: "Saraswati Learning Institute",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Our new school website has made parent-teacher updates incredibly easy. Parents locate the admission forms right away, and the overall feedback has been awesome.",
    stars: 5
  },
  {
    id: "test-3",
    name: "Vikram Roy",
    role: "Owner",
    company: "Spice Bistro Lounge",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Customers love the digital menu layout on mobile. They can see food photos instantly, book a lunch table, or send a clean query in just a tap.",
    stars: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Simple Chat & Discovery",
    description: "We discuss your exact needs, products, and who your target buyers are."
  },
  {
    step: "02",
    title: "Clean Design Blueprint",
    description: "We map out an elegant mockup layout that is incredibly easy for everyone to read."
  },
  {
    step: "03",
    title: "High-Speed Development",
    description: "We program your custom pages using clean code principles so it loads instantly."
  },
  {
    step: "04",
    title: "Thorough Device Testing",
    description: "We carefully check the look and feel on iPhones, Androids, tablets, and laptops."
  },
  {
    step: "05",
    title: "Live Launch & Growth",
    description: "We launch your complete website and configure basic SEO so you are ready for customers."
  }
];
