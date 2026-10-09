export type ProductCode = "PMS" | "POS" | "DMS";

/**
 * Release status shown on the site. Keep these honest:
 * - available: released and sold today
 * - preview:   working software or interface that can be demoed, not generally released
 * - planned:   on the roadmap, not built yet
 */
export type Status = "available" | "preview" | "planned";

export type Screen = { id: string; label: string; src: string; alt: string };

export type Product = {
  code: ProductCode;
  name: string; // PetraPMS
  full: string; // Property Management System
  /** Search-friendly category used in headings and metadata. */
  category: string;
  tagline: string; // very short, for chips
  status: Status;
  /** One line under the status chip, e.g. "Demo on request". */
  statusNote: string;
  problem: string;
  description: string;
  features: { icon: string; title: string; planned?: boolean }[];
  workflow: string[];
  screens: Screen[];
  device: "laptop" | "tablet";
  /** How the screenshots were made. Drives the label under the device frame. */
  screenSource: "illustrative" | "prototype" | "live";
};

export type Relation = {
  id: string;
  from: string;
  to: string;
  label: string;
  detail: string;
  status: Status;
};

export type PlannedModule = { name: string; role: string; group: string };
