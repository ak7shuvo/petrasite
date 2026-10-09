import type { Metadata } from "next";
import { Navbar } from "@/features/nav/navbar";
import { Footer } from "@/features/footer/footer";
import { Container, Label } from "@/shared/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How PETRA Software Solutions handles the details you send through the website's demo request form.",
  alternates: { canonical: "/privacy" },
};

const updated = "8 October 2026";

/** Plain-language notice describing what the website actually does with inquiry data. Review with counsel before launch. */
export default function Privacy() {
  return (
    <>
      <Navbar home={false} />
      <main id="main" className="bg-ink pb-24 pt-32 max-md:pb-16 max-md:pt-24">
        <Container className="max-w-[820px]">
          <Label>Legal</Label>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.05em]">Privacy notice</h1>
          <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-cream-mute">Last updated {updated}</p>

          <div className="mt-10 space-y-8 font-sans text-[16px] leading-relaxed text-cream-dim [&_h2]:font-mono [&_h2]:text-[15px] [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.08em] [&_h2]:text-cream [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            <section>
              <h2>Who we are</h2>
              <p className="mt-3">
                This website is run by {site.legalName}, {site.country}. Contact: <a className="text-cream underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>, {site.phone}.
              </p>
            </section>
            <section>
              <h2>What we collect</h2>
              <p className="mt-3">Only what you type into the demo request form:</p>
              <ul>
                <li>Business type, products of interest, a description of your operation, and optional budget, timeline and call preference.</li>
                <li>Your name, optional company name, email address and phone number.</li>
              </ul>
              <p className="mt-3">The website does not use advertising or analytics cookies and does not ask you to create an account.</p>
            </section>
            <section>
              <h2>How we use it</h2>
              <p className="mt-3">
                To reply to your inquiry, arrange a demo and discuss a possible project. We do not sell your details or add you to a mailing list.
              </p>
            </section>
            <section>
              <h2>Where it goes</h2>
              <p className="mt-3">
                When you submit the form, your details are sent from our web server to the inbox or tool we use for inquiries. Our server logs record a reference
                number and delivery status, not your name, email or phone number. Your internet address is held briefly in memory to limit repeated submissions.
              </p>
            </section>
            <section>
              <h2>How long we keep it</h2>
              <p className="mt-3">For as long as needed to handle your inquiry and any project that follows. Ask us and we will delete it.</p>
            </section>
            <section>
              <h2>Your choices</h2>
              <p className="mt-3">
                You can ask to see, correct or delete the details you sent by writing to <a className="text-cream underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer home={false} />
    </>
  );
}
