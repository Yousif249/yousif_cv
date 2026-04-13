// Site configuration
// موقع سيرة ذاتية - يوسف طارق

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "ar",
  title: "يوسف طارق | خبير إدارة عمليات وأنظمة ذكية",
  description: "سيرة ذاتية احترافية ليوسف طارق - مشرف عمليات متخصص في إدارة الأنظمة وحلول الأتمتة والبيانات",
};

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "YOUSIF~TARIQ",
  links: [
    { label: "الرئيسية", href: "#hero" },
    { label: "عني", href: "#about" },
    { label: "المسيرة المهنية", href: "#services" },
    { label: "القدرات التقنية", href: "#portfolio" },
    { label: "الخبرات العلمية", href: "#testimonials" },
  ],
  contactLabel: "تواصل معي",
  contactHref: "#cta",
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  name: "Yousif Tariq",
  roles: [
    "Operations Supervisor",
    "Systems Analytics Expert",
    "Python Developer",
    "Smart Solutions Specialist",
    "Data Integration Specialist",
    "Team Leader"
  ],
  backgroundImage: "/images/IMG_4936.jpeg",
};

// About section configuration
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
}

export const aboutConfig: AboutConfig = {
  label: "ملخص مهني احترافي",
  description: "مشرف عمليات ذو رؤية تقنية، أمتلك خبرة تتجاوز 4 سنوات في إدارة بيئات العمل المعقدة والأنظمة الذكية ضمن مشاريع كبرى مثل Jabal Omar تحت إشراف Easy Parking. أتميز بدمج الكفاءة الميدانية مع الأدوات التقنية الحديثة لرفع الإنتاجية بنسبة 25%. شغوف بأتمتة العمليات باستخدام البرمجة وتحليل البيانات لتقديم حلول تشغيلية مبتكرة ومستدامة.",
  experienceValue: "04+",
  experienceLabel: "سنوات من\nالتميز",
  stats: [
    { value: "40+", label: "إدارة كوادر بشرية" },
    { value: "25%", label: "تحسين أداء الأنظمة" },
    { value: "95%", label: "معدل الرضا التشغيلي" },
  ],
  images: [
    { src: "/images/vilkasss-developer-8764524_1920.jpg", alt: "تطوير العمليات" },
    { src: "/images/tylijura-ai-generated-9061295_1920.png", alt: "الأنظمة الذكية" },
    { src: "/images/geralt-monitor-1307227_1920.jpg", alt: "غرفة التحكم" },
    { src: "/images/xresch-analytics-3088958_1920.jpg", alt: "تحليل البيانات" },
  ],
};

// Services section configuration (Used for Professional Experience)
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: "المسيرة المهنية",
  heading: "محطات التطوير والإنجاز",
  services: [
    {
      iconName: "Monitor",
      title: "مشرف موقع في Easy Parking",
      description: "إدارة العمليات الميدانية في مشروع جبل عمر الاستراتيجي، مع التركيز على التقارير اللحظية والتنسيق الفني.",
      image: "/images/operation.jpg",
    },
    {
      iconName: "BarChart3",
      title: "أتمتة غرف التحكم والرقابة",
      description: "تطوير آليات المراقبة باستخدام Python لتقليل الأخطاء البشرية وتسريع الاستجابة للبلاغات بنسبة 25%.",
      image: "/images/geralt-monitor-1307227_1920.jpg",
    },
    {
      iconName: "Users",
      title: "قيادة فرق Valet الميدانية",
      description: "توجيه وإدارة أكثر من 40 موظفاً لضمان تجربة عميل استثنائية تتوافق مع المعايير الفاخرة للشركة.",
      image: "/images/pexels-apple-1854101_1920.jpg",
    },
    {
      iconName: "ShieldCheck",
      title: "إدارة معايير السلامة (OSHA)",
      description: "تطبيق بروتوكولات السلامة العالمية في جميع مرافق التشغيل لضمان صفر حوادث مهنية.",
      image: "/images/javier-miranda-MrWOCGKFVDg-unsplash.jpg",
    },
  ],
};

// Portfolio section configuration (Used for Technical Skills)
export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  image: string;
  featured?: boolean;
}

export interface PortfolioCTA {
  label: string;
  heading: string;
  linkText: string;
  linkHref: string;
}

export interface PortfolioConfig {
  label: string;
  heading: string;
  description: string;
  projects: ProjectItem[];
  cta: PortfolioCTA;
  viewAllLabel: string;
}

export const portfolioConfig: PortfolioConfig = {
  label: "القدرات التقنية",
  heading: "الأدوات والمهارات الرقمية",
  description: "تسخير التكنولوجيا لخدمة العمليات الميدانية وتحويل البيانات الخام إلى رؤى تشغيلية قابلة للتنفيذ.",
  projects: [
    {
      title: "Python Automation",
      category: "الأتمتة والسكربتات",
      year: "Expert",
      image: "/images/ptra-laptop-3214756_1920.png",
      featured: true,
    },
    {
      title: "Analytics & Power BI",
      category: "تحليل البيانات التشغيلية",
      year: "Advanced",
      image: "/images/xresch-analytics-3088958_1920.jpg",
    },
    {
      title: "Systems Networking",
      category: "بنية تحتية وأنظمة",
      year: "Skilled",
      image: "/images/javier-miranda-MrWOCGKFVDg-unsplash.jpg",
    },
    {
      title: "Control Systems",
      category: "إدارة غرف التحكم",
      year: "Professional",
      image: "/images/geralt-monitor-1307227_1920.jpg",
    },
    {
      title: "Security & Safety",
      category: "أمن العمليات والسلامة",
      year: "Certified",
      image: "/images/apexdigitalagency-website-8305451_1920.jpg",
    },
  ],
  cta: {
    label: "رؤية مستقبلية",
    heading: "نحول التحديات إلى فرص رقمية",
    linkText: "استكشف المهارات",
    linkHref: "#cta",
  },
  viewAllLabel: "عرض كافة القدرات",
};

// Testimonials section configuration (Used for Academic & Certifications)
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

export interface TestimonialsConfig {
  label: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  label: "التعليم والشهادات",
  heading: "أساس أكاديمي وتخصصي",
  testimonials: [
    {
      quote: "درست علوم الحاسب لمدة 3 سنوات، مما منحني قاعدة قوية في هندسة البرمجيات والمنطق البرمجي.",
      author: "Bachelor of Computer Science",
      role: "التعليم الأكاديمي",
      company: "3 Years Completed",
      image: "/images/vilkasss-developer-8764524_1920.jpg",
      rating: 5,
    },
    {
      quote: "حاصل على اعتمادات في أساسيات الأمن السيبراني ولغات البرمجة (Python) لإثراء الحلول التقنية.",
      author: "Technical Certifications",
      role: "الشهادات التقنية",
      company: "Tech Certs",
      image: "/images/apexdigitalagency-website-8305451_1920.jpg",
      rating: 5,
    },
    {
      quote: "شهادة OSHA العالمية لضمان أعلى معايير السلامة المهنية وصحة بيئة العمل.",
      author: "OSHA Safety",
      role: "الصحة والسلامة المهنية",
      company: "International Standard",
      image: "/images/javier-miranda-MrWOCGKFVDg-unsplash.jpg",
      rating: 5,
    },
  ],
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

export const ctaConfig: CTAConfig = {
  tags: ["Operations", "Strategic Planning", "Data Science", "Makkah"],
  heading: "هل أنت جاهز للتحول الرقمي؟",
  description: "أنا هنا للمساعدة في قيادة فريقك وتحسين عملياتك التشغيلية باستخدام أحدث التقنيات الذكية. دعنا نتحدث عن رؤيتك القادمة.",
  buttonText: "ابدأ التواصل الآن",
  buttonHref: "mailto:yousif.tariq@zohomail.com",
  email: "yousif.tariq@zohomail.com",
  backgroundImage: "/images/Background.jpg",
};

// Footer section configuration
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterConfig {
  logo: string;
  description: string;
  columns: FooterLinkColumn[];
  socialLinks: SocialLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: "YOUSIF~TARIQ",
  description: "متخصص في سد الفجوة بين العمليات الميدانية والحلول التقنية الذكية. خبرة في القيادة، الأتمتة، وتحليل البيانات.",
  columns: [
    {
      title: "الروابط السريعة",
      links: [
        { label: "الرئيسية", href: "#hero" },
        { label: "عني", href: "#about" },
        { label: "المسيرة", href: "#services" },
        { label: "التقنية", href: "#portfolio" },
      ],
    },
    {
      title: "الموقع الجغرافي",
      links: [
        { label: "مكة المكرمة", href: "#" },
        { label: "المملكة العربية السعودية", href: "#" },
      ],
    },
    {
      title: "قنوات التواصل",
      links: [
        { label: "+966510026302", href: "tel:+966510026302" },
        { label: "yousif.tariq@zohomail.com", href: "mailto:yousif.tariq@zohomail.com" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Linkedin", href: "https://linkedin.com/in/yousif-abdullah", label: "LinkedIn" },
    { iconName: "Github", href: "https://github.com", label: "GitHub" },
    { iconName: "Mail", href: "mailto:yousif.tariq@zohomail.com", label: "Email" },
    { iconName: "Phone", href: "tel:+966510026302", label: "Phone" },
  ],
  newsletterHeading: "النشرة التقنية",
  newsletterDescription: "اشترك للحصول على أحدث الرؤى في أتمتة العمليات والأنظمة.",
  newsletterButtonText: "اشتراك",
  newsletterPlaceholder: "بريدك الإلكتروني",
  copyright: "© 2024 يوسف طارق. جميع الحقوق محفوظة.",
  credit: "صُنع بـ ♥ بواسطة يوسف طارق",
};
