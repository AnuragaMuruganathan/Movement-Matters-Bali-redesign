// Videos are large (up to 140 MB) so they stream from the original host.
// Point this at a CDN when the WordPress site is retired.
export const MEDIA_BASE = "https://movementmatters-bali.com/wp-content/uploads";
export const LEGACY = "https://movementmatters-bali.com";

export const video = (path: string) => `${MEDIA_BASE}/${path}`;

export const VIDEOS = {
  promo: video("2024/06/WORKING-MAIN-July-2022-New-EDIT-7-New-VO-1.mp4"),
  testimonials: video("2021/11/Combined-Testimonials-min-2.mp4"),
  couple: video("2022/04/Couple-Testimonials-Final-High-Res-4-1-1.mp4"),
  groupPromo: video("2024/09/Main-Promo-Group-Class-Combined-High-Res-FINAL11.mp4"),
  gyrotonic: video("2021/12/Robert-Final-High-Res-1.mp4"),
  rolfing: video("2022/04/Rich-Testionial-Edit-4-FINAl-GRADED-1-1.mp4"),
  ttTestimonials: video("2025/03/9.-Combined-Testimonial-FINAL-V5_HIGH-RES111.mp4"),
  ttEducator: video("2022/02/Become-a-Pilates-Teacher-Movement-Educator.mp4"),
  ttProgram: video("2022/06/Body-Harmonics-Pilates-Comprehensive-Track-Program.mp4"),
  continuingEd: video("2022/06/Body-Harmonics-Continuing-Education.mp4"),
  ai3d: video("2023/03/Anatomy-in-3-Dimentions.mp4"),
  rental: video("2024/02/WhatsApp-Video-2024-02-23-at-06.41.12.mp4"),
};

export const CONTACT = {
  phoneDisplay: "+62 813 3935 9995",
  whatsapp: "https://wa.me/6281339359995",
  mindbody: "https://get.mndbdy.ly/V0d1cyRM7mb",
  emails: {
    general: "info@movementmatters-bali.com",
    groupClass: "groupclass@movementmatters-bali.com",
    teacherTraining: "teachertraining@movementmatters-bali.com",
  },
  address: ["No. 5, Banjar Nyuh Kuning", "Jl. Nyuh Bulan, MAS", "Ubud, Gianyar, Bali"],
  maps: "https://goo.gl/maps/nJ3G6o56tys",
  mapEmbed:
    "https://www.google.com/maps?q=Movement+Matters+Bali+Pilates&ll=-8.52689,115.25368&z=16&output=embed",
  socials: {
    instagram: "https://www.instagram.com/movementmattersbalipilates/",
    facebook: "https://www.facebook.com/MovementMattersBali",
    youtube: "https://www.youtube.com/@sookfunchen88",
  },
};

export const HOURS = {
  appointments: [
    ["Mon – Fri", "8:00am – 6:00pm"],
    ["Saturday", "8:00am – 3:00pm"],
    ["Sunday", "Closed"],
  ],
  frontDesk: [
    ["Mon – Fri", "8:00am – 5:30pm"],
    ["Saturday", "8:00am – 12:00pm"],
    ["Sunday", "Closed"],
  ],
} as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV: NavItem[] = [
  {
    label: "Instructors",
    href: "/sook-fun-chen",
    children: [
      { label: "Sook Fun Chen", href: "/sook-fun-chen" },
      { label: "Irene Widjaja", href: "/irene-widjaja" },
      { label: "Ratna Swastika", href: "/ratna-swastika" },
      { label: "Ray Subrata", href: "/ray-subrata" },
      { label: "Pei Khoek", href: "/pei-khoek" },
      { label: "Dewi", href: "/dewi" },
    ],
  },
  {
    label: "Pilates & Gyrotonic®",
    href: "/ubud-pilates",
    children: [
      { label: "Ubud Pilates", href: "/ubud-pilates" },
      { label: "Reformer Classes", href: "/ubud-pilates-reformer-classes" },
      { label: "Group Class Schedule", href: "/group-class-schedule" },
      { label: "GYROTONIC® Method", href: "/gyrotonic" },
      { label: "Reformer Rental", href: "/reformer-rental" },
    ],
  },
  { label: "Rolfing®", href: "/rolfing-structural-integration" },
  {
    label: "Teacher Training",
    href: "/pilates-teacher-training-bali",
    children: [
      { label: "Pilates Teacher Training", href: "/pilates-teacher-training-bali" },
      { label: "Continuing Education", href: "/continuing-education" },
      { label: "Anatomy in Three Dimensions™", href: "/anatomy-in-3-dimensions" },
      { label: "Move Well Series", href: "/move-well-series" },
    ],
  },
  { label: "Pricing", href: "/pricing-policies-list" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Move Better Blog", href: "/movebetterblog" },
  { label: "Media", href: "/media" },
  { label: "Hotels & Services", href: "/hotels-and-services" },
  { label: "Pricing & Policies", href: "/pricing-policies-list" },
];

// Pages that still live on the WordPress site.
export const legacy = (slug: string) => `${LEGACY}/${slug}/`;
