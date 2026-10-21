import type { StaticImageData } from "next/image";
import { IMG } from "./media";

export type Instructor = {
  slug: string;
  name: string;
  role: string;
  image: StaticImageData;
  languages: string[];
  since?: string;
  credentials: string[];
  quote: string;
  bio: string[];
  testimonial: { text: string; by: string };
};

export const INSTRUCTORS: Instructor[] = [
  {
    slug: "sook-fun-chen",
    name: "Sook Fun Chen",
    role: "Founder · Teacher Trainer",
    image: IMG.portraits.sook,
    languages: ["English", "Mandarin", "Cantonese", "Bahasa Malaysia"],
    since: "25 years",
    credentials: [
      "Body Harmonics® Education Partner & Teacher Trainer",
      "Balanced Body® Master Instructor, Anatomy in 3 Dimensions",
      "PMA Conference Presenter, Shanghai 2026",
      "Certified Rolfer™",
      "RAD Classical Ballet Teaching Diploma",
      "STOTT PILATES® Advanced Instructor",
      "GYROTONIC® Level 2, JSB, Archway & GYROTONER®",
      "Body Harmonics Post-Rehab & Biomechanics Specialist",
      "CHEK Holistic Lifestyle Coach Level 3",
      "Rossiter Stretching Practitioner Level 2",
    ],
    quote:
      "Being fit is to have the right amount of relaxation, strength, mobility, and optimal alignment and movement pattern.",
    bio: [
      "A former professional dancer from Singapore, Sook Fun moved to Bali in 2012 and founded the island's first fully equipped Pilates, GYROTONIC® and Rolfing® studio.",
      "Certified in Pilates in 2001, GYROTONIC® in 2007 and Rolfing® in 2012, she works alongside doctors and physical therapists on pain management and injury rehab.",
    ],
    testimonial: {
      text: "Your kindness, expertise, patience, but most of all great sense of humor were greatly appreciated. I have learned so much about my body in only a few sessions.",
      by: "Tuline",
    },
  },
  {
    slug: "irene-widjaja",
    name: "Irene Widjaja",
    role: "Senior Instructor",
    image: IMG.portraits.irene,
    languages: ["English", "Bahasa Indonesia"],
    since: "Teaching since 2014",
    credentials: [
      "Pilates Academy International Certified Instructor",
      "Balanced Body® Comprehensive Pilates Instructor",
      "Pre & Postnatal Pilates Specialist™",
      "Rossiter Stretching Practitioner Level 2",
      "Les Mills Body Balance Advanced",
      "200-Hour Flow Yoga",
      "Anatomy in 3 Dimensions",
      "Fascial Fitness Training",
    ],
    quote: "Being fit is a way of life, mind and body in sync with harmony and feeling comfortable in our own body.",
    bio: [
      "Irene joined from Jakarta in 2019 and quickly became known as cheerful, precise and caring.",
      "She specialises in spinal conditions, post-rehab, stroke recovery, osteoporosis and pre/postnatal care.",
    ],
    testimonial: {
      text: "Irene really knows her stuff and taught me a lot about my technique.",
      by: "Michael",
    },
  },
  {
    slug: "ratna-swastika",
    name: "Ratna Swastika",
    role: "Instructor",
    image: IMG.portraits.ratna,
    languages: ["English", "Bahasa Indonesia"],
    since: "With us since 2023",
    credentials: [
      "Body Harmonics® Comprehensive Pilates Instructor",
      "Anatomy in 3 Dimensions",
      "Cervical Spine Mechanics & Protocols",
      "Power & Balance for Hip and Knee",
      "Postural Analysis Foundations",
      "Simplifying the Shoulder Complex",
    ],
    quote: "Make your body a place you want to live in.",
    bio: [
      "Ratna left a corporate career to teach Pilates, focusing on alignment, posture and thoughtful progressions.",
      "Originally from Jakarta, she moved to Bali in 2020 and joined the team in 2023.",
    ],
    testimonial: {
      text: "I noticed the effect almost immediately. It became easier to keep my back straight, and I always leave with lightness in my body.",
      by: "Tetyana",
    },
  },
  {
    slug: "ray-subrata",
    name: "Ray Subrata",
    role: "Master Instructor",
    image: IMG.portraits.ray,
    languages: ["English", "Bahasa Indonesia"],
    since: "Teaching since 2010",
    credentials: [
      "Polestar Pilates Comprehensive Graduate",
      "Polestar Pilates Teacher Trainer / Mentor",
      "GYROTONIC® Level 1 Instructor",
      "TRX SMSTC Master Trainer",
      "Myofascial Release Practitioner",
      "IFPA Personal Trainer",
      "Anatomy Trains Myofascial Training",
    ],
    quote: "Being fit is when the mind and body are at ease, with good energy to enjoy life.",
    bio: [
      "The first Polestar graduate and mentor from Jakarta, Ray has taught in clinical and luxury wellness settings including COMO Uma Canggu and COMO Cocoa Island.",
      "His sessions blend Pilates, manual myofascial release and meditative awareness.",
    ],
    testimonial: {
      text: "Ray tailors each session to what your body needs that day. I always leave stronger, more mobile and better connected. Truly transformative.",
      by: "Ina",
    },
  },
  {
    slug: "pei-khoek",
    name: "Pei Khoek",
    role: "Master Instructor",
    image: IMG.portraits.pei,
    languages: ["English", "Mandarin", "Cantonese", "Hokkien", "Bahasa Malaysia"],
    since: "Teaching since 2013",
    credentials: [
      "PHI Pilates (USA) Master Trainer",
      "STOTT PILATES® Level 1 & 2",
      "Scolio-Pilates Modules 1 & 2",
      "STOTT Injuries & Special Populations",
      "RSM Dynamic Myofascia Release & Trigger Point",
      "ITEC (UK) Healthy Eating Coach",
    ],
    quote: "Being fit is the ultimate form of self-love that enables one to enjoy life to its fullest.",
    bio: [
      "From Penang, Pei turned to Pilates after a running injury and now works with scoliosis, spinal pathologies, Parkinson's and seniors.",
      "Her oldest client is 92 and still going strong.",
    ],
    testimonial: {
      text: "Her instructions were clear and she is so knowledgeable. One of the best instructors out there.",
      by: "Sabrina L.",
    },
  },
  {
    slug: "dewi",
    name: "Dewi",
    role: "Studio Manager",
    image: IMG.portraits.dewi,
    languages: ["English", "Bahasa Indonesia"],
    credentials: [
      "Diploma in Tourism Services, Elizabeth International",
      "Host, The Samaya Ubud",
      "Receptionist, Ubud Dedari Villas",
      "Concierge, Luxe Villas Bali",
    ],
    quote: "Every client request, taken care of.",
    bio: [
      "Our super star studio manager, with years in Bali's finest hospitality.",
      "Friendly, helpful and cheerful, and happiest at the beach.",
    ],
    testimonial: { text: "Dewi is delightful, she remembers everything! And her smiles made my day.", by: "Amanda" },
  },
];

export const getInstructor = (slug: string) => INSTRUCTORS.find((i) => i.slug === slug)!;
