// Site configuration
// موقع سيرة ذاتية بتصميم Kali Linux

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "ar",
  title: "يوسف طارق | خبير أمن سيبراني",
  description: "سيرة ذاتية احترافية لخبير أمن سيبراني متخصص في اختبار الاختراق والتحليل الجنائي الرقمي",
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
    { label: "من أنا", href: "#about" },
    { label: "الخدمات", href: "#services" },
    { label: "المشاريع", href: "#portfolio" },
    { label: "الشهادات", href: "#testimonials" },
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
  name: "YOUSIF~TARIQ",
  roles: [
    "Ethical Hacker",
    "Penetration Tester",
    "Security Analyst",
    "Forensics Expert",
    "Red Team Operator",
    "Bug Bounty Hunter"
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
  label: "نبذة عني",
  description: "أنا يوسف طارق، خبير أمن سيبراني مع أكثر من 8 سنوات من الخبرة في مجال اختبار الاختراق والأمن السيبراني. أمتلك شغفاً كبيراً بعالم الأمن المعلوماتي وأسعى دائماً لاكتشاف الثغرات الأمنية وحماية الأنظمة من التهديدات الإلكترونية. عملت مع العديد من الشركات والمؤسسات الكبرى لتحسين أمنها السيبراني وتأمين بنيتها التحتية.",
  experienceValue: "08+",
  experienceLabel: "سنوات\nخبرة",
  stats: [
    { value: "150+", label: "ثغرة مكتشفة" },
    { value: "80+", label: "عميل محمي" },
    { value: "25+", label: "شهادة دولية" },
  ],
  images: [
    { src: "/images/about-1.jpg", alt: "أمن سيبراني" },
    { src: "/images/about-2.jpg", alt: "اختبار اختراق" },
    { src: "/images/about-3.jpg", alt: "تحليل تهديدات" },
    { src: "/images/about-4.jpg", alt: "استجابة للحوادث" },
  ],
};

// Services section configuration
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
  label: "الخدمات",
  heading: "ما أقدمه من خدمات أمنية",
  services: [
    {
      iconName: "Terminal",
      title: "اختبار الاختراق",
      description: "إجراء اختبارات اختراق شاملة للشبكات والتطبيقات واكتشاف الثغرات الأمنية قبل المخترقين.",
      image: "/images/service-1.jpg",
    },
    {
      iconName: "Shield",
      title: "تقييم الأمن السيبراني",
      description: "تقييم شامل لأمن البنية التحتية التقنية وتقديم توصيات لتحسين الأمان.",
      image: "/images/service-2.jpg",
    },
    {
      iconName: "Search",
      title: "التحليل الجنائي الرقمي",
      description: "تحليل الأدلة الرقمية واستعادة البيانات المفقودة والتحقيق في الحوادث الأمنية.",
      image: "/images/service-3.jpg",
    },
    {
      iconName: "Code",
      title: "مراجعة الشيفرة البرمجية",
      description: "فحص دقيق للشيفرة البرمجية لاكتشاف الثغرات الأمنية وضمان جودة الكود.",
      image: "/images/service-4.jpg",
    },
  ],
};

// Portfolio section configuration
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
  label: "المشاريع",
  heading: "أعمالي وأبحاثي الأمنية",
  description: "مجموعة من المشاريع والأبحاث التي قمت بها في مجال الأمن السيبراني واختبار الاختراق.",
  projects: [
    {
      title: "فحص ثغرات بنك رقمي",
      category: "اختبار اختراق",
      year: "2024",
      image: "/images/portfolio-1.jpg",
      featured: true,
    },
    {
      title: "استجابة حادث اختراق",
      category: "التحليل الجنائي",
      year: "2024",
      image: "/images/portfolio-2.jpg",
    },
    {
      title: "تأمين شبكة مؤسسة حكومية",
      category: "تقييم أمني",
      year: "2023",
      image: "/images/portfolio-3.jpg",
    },
    {
      title: "اكتشاف ثغرة Zero-Day",
      category: "بحث أمني",
      year: "2023",
      image: "/images/portfolio-4.jpg",
    },
    {
      title: "تدريب فريق Red Team",
      category: "تدريب",
      year: "2023",
      image: "/images/portfolio-5.jpg",
    },
  ],
  cta: {
    label: "هل لديك مشروع؟",
    heading: "دعنا نعمل معاً",
    linkText: "ابدأ مشروعك الآن",
    linkHref: "#cta",
  },
  viewAllLabel: "عرض جميع المشاريع",
};

// Testimonials section configuration
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
  label: "الشهادات",
  heading: "ما يقوله العملاء",
  testimonials: [
    {
      quote: "يوسف من أفضل الخبراء الأمنيين الذين عملنا معهم. اكتشف ثغرات خطيرة كانت قد تكلفنا مليونيات الدولارات.",
      author: "أحمد السالم",
      role: "مدير تقنية المعلومات",
      company: "بنك الأمان الرقمي",
      image: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      quote: "احترافية عالية ودقة في العمل. ساعدنا في تأمين بنيتنا التحتية بشكل شامل وفعال.",
      author: "خالد العتيبي",
      role: "الرئيس التنفيذي",
      company: "شركة التقنية المتقدمة",
      image: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      quote: "تدريبه لفريق الأمن لدينا كان استثنائياً. الفريق أصبح أكثر كفاءة في اكتشاف والاستجابة للتهديدات.",
      author: "فهد المطيري",
      role: "مدير الأمن السيبراني",
      company: "وزارة الاتصالات",
      image: "/images/testimonial-3.jpg",
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
  tags: ["Penetration Tester", "Security Analyst", "Ethical Hacker"],
  heading: "لنؤمن أنظمتك معاً",
  description: "هل تبحث عن خبير أمن سيبراني لحماية أعمالك؟ أنا هنا لمساعدتك في تأمين بنيتك التحتية وحماية بياناتك من التهديدات الإلكترونية.",
  buttonText: "ابدأ الآن",
  buttonHref: "mailto:contact@yousiftariq.com",
  email: "contact@yousiftariq.com",
  backgroundImage: "/images/cta-bg.jpg",
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
  description: "خبير أمن سيبراني متخصص في اختبار الاختراق والتحليل الجنائي الرقمي. أساعد الشركات على حماية أصولها الرقمية.",
  columns: [
    {
      title: "الروابط السريعة",
      links: [
        { label: "الرئيسية", href: "#hero" },
        { label: "من أنا", href: "#about" },
        { label: "الخدمات", href: "#services" },
        { label: "المشاريع", href: "#portfolio" },
      ],
    },
    {
      title: "الخدمات",
      links: [
        { label: "اختبار الاختراق", href: "#services" },
        { label: "تقييم الأمن", href: "#services" },
        { label: "التحليل الجنائي", href: "#services" },
        { label: "مراجعة الشيفرة", href: "#services" },
      ],
    },
    {
      title: "الشهادات",
      links: [
        { label: "OSCP", href: "#" },
        { label: "CEH", href: "#" },
        { label: "CISSP", href: "#" },
        { label: "GPEN", href: "#" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Github", href: "https://github.com", label: "GitHub" },
    { iconName: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { iconName: "Twitter", href: "https://twitter.com", label: "Twitter" },
    { iconName: "Terminal", href: "https://hackthebox.com", label: "Hack The Box" },
  ],
  newsletterHeading: "النشرة الأمنية",
  newsletterDescription: "اشترك للحصول على أحدث الثغرات والنصائح الأمنية",
  newsletterButtonText: "اشتراك",
  newsletterPlaceholder: "بريدك الإلكتروني",
  copyright: "© 2024 YOUSIF TARIQ. جميع الحقوق محفوظة.",
  credit: "صُنع بـ ♥ بواسطة يوسف طارق",
};
