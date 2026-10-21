export type PriceRow = { name: string; note?: string; single?: string; five?: string; ten?: string };
export type Jumpstart = { label: string; prices: { who?: string; price: string }[] };
export type PriceGroup = { id: string; label: string; intro?: string; jumpstart?: Jumpstart; rows: PriceRow[] };

const pp = "per person";

// Grouped by what people book; the instructor is a row inside each service.
export const PRICING: PriceGroup[] = [
  {
    id: "private",
    label: "Private 1:1",
    intro: "One-on-one sessions. Sook Fun and Ray also teach GYROTONIC®.",
    jumpstart: {
      label: "Jumpstart 1:1 · 5 sessions",
      prices: [
        { who: "With Sook Fun", price: "5,600,000" },
        { who: "With Ray", price: "4,005,000" },
        { who: "Pilates instructors", price: "3,445,000" },
      ],
    },
    rows: [
      { name: "With Sook Fun Chen", note: "Pilates & GYROTONIC®", single: "1,232,000", five: "5,880,000", ten: "11,200,000" },
      { name: "With Ray Subrata", note: "Pilates & GYROTONIC®", single: "897,000", five: "4,220,000", ten: "8,010,000" },
      { name: "Pilates · Master Instructor", single: "897,000", five: "4,220,000", ten: "8,010,000" },
      { name: "Pilates · Instructor", single: "785,000", five: "3,660,000", ten: "6,890,000" },
    ],
  },
  {
    id: "small-group",
    label: "Duet & small groups",
    intro: "Train with a partner or a group of up to four. Prices are per person.",
    rows: [
      { name: "Duet with Sook Fun Chen", note: pp, single: "666,000", five: "3,190,000", ten: "6,100,000" },
      { name: "Duet with Ray Subrata", note: pp, single: "526,000", five: "2,490,000", ten: "4,700,000" },
      { name: "Duet · Master Instructor", note: pp, single: "526,000", five: "2,490,000", ten: "4,700,000" },
      { name: "Duet · Instructor", note: pp, single: "470,000", five: "2,210,000", ten: "4,140,000" },
      { name: "Trio · Master Instructor", note: pp, single: "444,000", five: "2,126,000" },
      { name: "Trio · Instructor", note: pp, single: "407,000", five: "1,940,000" },
      { name: "Group of 4 · Master Instructor", note: pp, single: "417,000", five: "2,014,000" },
      { name: "Group of 4 · Instructor", note: pp, single: "389,000", five: "1,876,000" },
    ],
  },
  {
    id: "group",
    label: "Group Reformer",
    intro: "Injury-free, not pregnant, no osteoporosis",
    jumpstart: { label: "Jumpstart Group · 5 classes", prices: [{ price: "1,484,000" }] },
    rows: [{ name: "Group Reformer", single: "369,000", five: "1,680,000", ten: "2,968,000" }],
  },
  {
    id: "bodywork",
    label: "Rolfing® & bodywork",
    intro: "Hands-on work and mentoring with our senior practitioners.",
    rows: [
      { name: "Rolfing® Structural Integration", note: "with Sook Fun Chen", single: "1,568,000", five: "7,560,000", ten: "14,560,000" },
      { name: "Myofascia Release", note: "with Ray Subrata", single: "1,232,000", five: "5,880,000", ten: "11,200,000" },
      { name: "Mentoring", note: "with Sook Fun Chen · 60 minutes", single: "1,620,000" },
    ],
  },
  {
    id: "rental",
    label: "Rental & extras",
    intro: "Reformer rental is per Reformer, 55 minutes",
    rows: [
      { name: "Reformer Rental", single: "257,000", five: "1,120,000", ten: "2,016,000" },
      { name: "Toe Sox", note: "organic, imported grip socks", single: "380,000" },
      { name: "Grip socks", single: "105,000" },
      { name: "Non-grip socks", single: "15,000" },
    ],
  },
];

export const POLICIES = [
  {
    title: "Payment",
    items: ["Advance payment is required to secure your booking.", "All sessions are 55 minutes.", "Prepaid sessions are non-refundable.", "All packages expire in 12 months."],
  },
  {
    title: "22-hour cancellation",
    items: ["Cancelling or rescheduling with less than 22 hours' notice is charged the full fee, for all reasons including emergency and illness."],
  },
  {
    title: "Studio policy",
    items: ["Wear socks for all equipment sessions.", "Please be punctual. Missed time can't be made up.", "Group classes may be cancelled if minimum sign-up isn't met."],
  },
  {
    title: "Studio etiquette",
    items: [
      "Arrive early. Classes start on time.",
      "Phones on silent.",
      "Grip socks and fitted clothing that shows your posture.",
      "Tie long hair back. No zips, lotions or skin oils.",
      "No animals. Children wait in the lobby.",
    ],
  },
];
