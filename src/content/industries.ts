import type { ProductCode } from "@/types/content";

export type Industry = {
  name: string;
  icon: "hotel" | "palm" | "utensils" | "compass" | "landmark";
  line: string;
  /** Petra products that fit this industry today (preview or available). */
  products: ProductCode[];
  /** Roadmap module for this industry, shown as PLANNED. */
  planned?: string;
};

export const industries: Industry[] = [
  { name: "Hotels", icon: "hotel", line: "Front desk, rooms and billing, with POS for the restaurant.", products: ["PMS", "POS"] },
  { name: "Resorts", icon: "palm", line: "Rooms plus several food and beverage outlets.", products: ["PMS", "POS"] },
  { name: "Restaurants", icon: "utensils", line: "Tables, kitchen tickets and payments.", products: ["POS"] },
  { name: "Tour Operators", icon: "compass", line: "Supplier and partner ledgers with dues.", products: ["DMS"], planned: "PetraTour" },
  { name: "DMOs", icon: "landmark", line: "Tools for destination organizations.", products: [], planned: "PetraDMO" },
];
