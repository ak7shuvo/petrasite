import { Navbar } from "@/features/nav/navbar";
import { Hero } from "@/features/hero/hero";
import { Trust } from "@/features/trust/trust";
import { Overview } from "@/features/overview/overview";
import { Products } from "@/features/products/products";
import { Ecosystem } from "@/features/ecosystem/ecosystem";
import { Deployment } from "@/features/deployment/deployment";
import { Industries } from "@/features/industries/industries";
import { Why } from "@/features/why/why";
import { Process } from "@/features/process/process";
import { Contact } from "@/features/contact/contact";
import { Footer } from "@/features/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Trust />
        <Overview />
        <Products />
        <Ecosystem />
        <Deployment />
        <Industries />
        <Why />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
