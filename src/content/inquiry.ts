/** Options for the demo inquiry. Shared by the form and the API so both accept the same values. */
export const businessTypes = ["Hotel", "Resort", "Restaurant or café", "Tour operator", "DMO / destination organization", "Something else"] as const;
export const interests = ["PetraPMS", "PetraPOS", "PetraDMS", "The full ecosystem", "Not sure yet"] as const;
export const budgets = ["Under ৳ 1 lakh", "৳ 1–3 lakh", "৳ 3–5 lakh", "৳ 5–10 lakh", "Above ৳ 10 lakh", "Not sure yet"] as const;
export const timelines = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible"] as const;
export const slots = ["Morning (10am–1pm)", "Afternoon (2pm–5pm)", "Evening (6pm–8pm)"] as const;
export const inquirySteps = ["Business", "Products", "Setup", "Call", "Contact"] as const;

export const limits = { requirements: 4000, name: 120, company: 160, email: 200, phone: 40 } as const;
