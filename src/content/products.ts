import type { Product } from "@/types/content";

const s = (id: string, label: string, alt: string) => ({ id, label, src: `/products/${id}.webp`, alt });

/**
 * Product facts. Every capability listed here must exist in the product or prototype today;
 * anything else carries `planned: true` and is labelled on the site.
 * Change `status` to "available" when a product is released.
 */
export const products: Product[] = [
  {
    code: "PMS",
    name: "PetraPMS",
    full: "Property Management System",
    category: "Hotel property management system",
    tagline: "Rooms · Guests · Billing",
    status: "preview",
    statusNote: "Pre-release · demo on request",
    problem:
      "Reservations, room status and guest bills live in one system, so the front desk is not reconciling registers, spreadsheets and paper folios at checkout.",
    description:
      "Hotel and resort operations software for reservations, guest records, room inventory, housekeeping status, billing, check-in and check-out.",
    features: [
      { icon: "calendar", title: "Reservations & front desk" },
      { icon: "bed", title: "Room inventory & status" },
      { icon: "receipt", title: "Guest folios & billing" },
      { icon: "sparkles", title: "Housekeeping status" },
      { icon: "network", title: "Runs on the hotel LAN" },
    ],
    workflow: ["Reservation", "Room assignment", "Check-in", "Guest folio", "Checkout", "Settlement"],
    device: "laptop",
    screenSource: "illustrative",
    screens: [
      s("pms-dashboard", "Dashboard", "PetraPMS dashboard showing occupancy, arrivals, departures and room status"),
      s("pms-rooms", "Rooms", "PetraPMS room grid with room status"),
      s("pms-billing", "Billing", "PetraPMS guest folio with charges, deposit and balance"),
    ],
  },
  {
    code: "POS",
    name: "PetraPOS",
    full: "Point of Sale System",
    category: "Restaurant and hospitality POS",
    tagline: "Orders · Kitchen · Payments",
    status: "preview",
    statusNote: "Interface preview · demo on request",
    problem:
      "Orders, kitchen tickets and payments run as one flow, so an outlet closes the day with sales and stock figures it can reconcile.",
    description:
      "Point of sale for restaurants, cafés and room service: order handling, kitchen tickets, billing, stock control and sales reporting.",
    features: [
      { icon: "utensils", title: "Table & counter orders" },
      { icon: "flame", title: "Kitchen tickets" },
      { icon: "wallet", title: "Billing & payments" },
      { icon: "boxes", title: "Stock control" },
      { icon: "chart", title: "Sales reports" },
      { icon: "bed", title: "Room charge to PetraPMS", planned: true },
    ],
    workflow: ["Order", "Kitchen / fulfilment", "Payment", "Inventory", "Reports"],
    device: "tablet",
    screenSource: "illustrative",
    screens: [
      s("pos-terminal", "Terminal", "PetraPOS order terminal with menu and table ticket"),
      s("pos-analytics", "Analytics", "PetraPOS sales analytics with hourly sales and payment mix"),
      s("pos-kitchen", "Kitchen", "PetraPOS kitchen display with order tickets"),
    ],
  },
  {
    code: "DMS",
    name: "PetraDMS",
    full: "Distribution Management System",
    category: "Distribution management system",
    tagline: "Purchase · Stock · Dues",
    status: "preview",
    statusNote: "Prototype · demo on request",
    problem:
      "Purchases, stock, sales, customer dues and collections share one ledger, so a distributor always knows what is on the shelf and who still owes money.",
    description:
      "Distribution operations from one desk: sales and invoicing, purchasing, multi-unit stock, customer and supplier ledgers, expenses and daily-to-monthly reports.",
    features: [
      { icon: "receipt", title: "Invoicing with due tracking" },
      { icon: "boxes", title: "Big box · small box · piece stock" },
      { icon: "users", title: "Customer & supplier ledgers" },
      { icon: "chart", title: "Daily to monthly reports" },
      { icon: "calc", title: "Compact mode with calculator" },
    ],
    workflow: ["Purchase", "Stock", "Sales", "Due", "Collection", "Profit"],
    device: "laptop",
    screenSource: "prototype",
    screens: [
      s("dms-dashboard", "Dashboard", "PetraDMS dashboard with sales, collection, dues, stock and recent invoices"),
      s("dms-inventory", "Inventory", "PetraDMS inventory screen with stock levels and movements"),
      s("dms-reports", "Reports", "PetraDMS profit and margin report"),
      s("dms-compact", "Compact mode", "PetraDMS compact mode with built-in calculator and quick actions"),
    ],
  },
];

export const productByCode = Object.fromEntries(products.map((p) => [p.code, p])) as Record<string, Product>;

export const screenLabel: Record<Product["screenSource"], { tag: string; note: (name: string) => string }> = {
  illustrative: { tag: "Product preview", note: () => "Interface shown for demonstration · sample data" },
  prototype: { tag: "Product preview", note: (n) => `Captured from the ${n} interface prototype · sample data` },
  live: { tag: "Live product", note: (n) => `Captured from ${n}` },
};
