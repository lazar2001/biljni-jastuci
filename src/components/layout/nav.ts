import { hasRealReviews, nav } from "@/content/site";

/** Navigation without links to sections that are hidden (e.g. reviews before real ones exist). */
export const navItems = nav.filter((item) => !("requiresReviews" in item) || hasRealReviews);
