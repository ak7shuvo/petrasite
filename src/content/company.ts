/** Trust band directly after the hero. Factual positioning only. */
export const trust = [
  { icon: "layers", title: "Built for real operations", text: "Reservations, folios, orders, stock and dues: the daily work of front desks, outlets and distributors." },
  { icon: "flag", title: "Built in Bangladesh", text: "Designed, built and supported in Bangladesh. Prices and amounts in BDT (৳)." },
  { icon: "server", title: "Local-first", text: "PetraPMS runs over the property's local network, with data on its own server." },
  { icon: "hotel", title: "Hospitality-focused", text: "Hotels, resorts, restaurants, tour operators and destination organizations." },
  { icon: "life", title: "Direct support", text: "One team builds, deploys and supports the software." },
] as const;

/** Deployment model as designed for PetraPMS. Characteristics marked `planned` are not implemented yet. */
export const deployment = {
  site: { label: "Property / Office", items: ["Front desk PCs", "Outlet terminals", "Back office"] },
  server: { label: "Petra Server", items: ["On your premises", "Local database"] },
  apps: ["PMS", "POS", "DMS"] as const,
  traits: [
    { title: "Local network", text: "Terminals connect to the Petra server over the property LAN." },
    { title: "Fast local response", text: "Requests stay inside the building instead of crossing the internet to a remote data centre." },
    { title: "Centralised local data", text: "One database on the Petra server, stored on hardware you own." },
    { title: "Windows installer", text: "PetraPMS packaged as a Windows installer for on-site setup.", planned: true },
    { title: "Larger deployments", text: "PostgreSQL for multi-property or cloud-hosted installations.", planned: true },
  ],
};

export const implementation = [
  { n: "01", title: "Discover", line: "Understand the operation and requirements.", detail: "A call or site visit to map rooms, outlets, users and the tools you use today." },
  { n: "02", title: "Configure", line: "Configure Petra around the workflow.", detail: "Products, users, roles and settings prepared for your operation before go-live." },
  { n: "03", title: "Deploy", line: "Install and connect the system.", detail: "Installed on your server and terminals and connected over the local network." },
  { n: "04", title: "Support", line: "Training and post-deployment support.", detail: "Staff training at handover, then bug-fix support for three months after go-live." },
] as const;
