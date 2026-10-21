import type { MetadataRoute } from "next";
import { INSTRUCTORS } from "@/content/instructors";

const ROUTES = [
  "",
  "/ubud-pilates",
  "/ubud-pilates-reformer-classes",
  "/group-class-schedule",
  "/gyrotonic",
  "/reformer-rental",
  "/rolfing-structural-integration",
  "/pilates-teacher-training-bali",
  "/continuing-education",
  "/anatomy-in-3-dimensions",
  "/move-well-series",
  "/pricing-policies-list",
  "/contact",
  "/hotels-and-services",
  "/media",
  "/movebetterblog",
  ...INSTRUCTORS.map((i) => `/${i.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `https://movementmatters-bali.com${r}` }));
}
