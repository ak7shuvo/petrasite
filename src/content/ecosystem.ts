import type { PlannedModule, Relation } from "@/types/content";

/**
 * Data relationships between the products and the shared core.
 * PetraPMS, PetraPOS and PetraDMS run as separate applications today, so every link is "planned".
 * Switch a link to "available" only when the integration ships.
 */
export const relations: Relation[] = [
  { id: "guest-charges", from: "pos", to: "pms", label: "Guest charges", detail: "Outlet bills posted to the guest's room folio.", status: "planned" },
  { id: "inventory", from: "dms", to: "pos", label: "Inventory", detail: "Stock received through distribution available to outlets.", status: "planned" },
  { id: "ops-data", from: "pms", to: "core", label: "Operational data", detail: "Occupancy, arrivals and folios in the shared data core.", status: "planned" },
  { id: "sales", from: "pos", to: "core", label: "Sales · Payments", detail: "Outlet sales and payment totals in the shared data core.", status: "planned" },
  { id: "dues", from: "dms", to: "core", label: "Stock · Dues", detail: "Stock, dues and collections in the shared data core.", status: "planned" },
  { id: "reports", from: "core", to: "all", label: "Reports", detail: "One reporting view across rooms, outlets and distribution.", status: "planned" },
];

export const core = {
  name: "Petra Core",
  sub: "Shared data · sign-in · reports",
  role: "One data layer for the three products: shared customers and guests, one sign-in with roles, and reports across the business.",
  status: "planned" as const,
};

/** Modules from the Petra roadmap. None of these are built yet. */
export const plannedModules: PlannedModule[] = [
  { group: "Guest", name: "PetraBooking", role: "Direct booking engine" },
  { group: "Guest", name: "PetraTour", role: "Tours and packages" },
  { group: "Guest", name: "PetraCRM", role: "Guest relationships" },
  { group: "Operations", name: "PetraHouse", role: "Housekeeping and maintenance" },
  { group: "Operations", name: "PetraEvents", role: "Banquets and events" },
  { group: "Intelligence", name: "PetraChannel", role: "Channel connectivity" },
  { group: "Intelligence", name: "PetraRMS", role: "Revenue and pricing" },
  { group: "Intelligence", name: "PetraDMO", role: "Destination organization tools" },
];
