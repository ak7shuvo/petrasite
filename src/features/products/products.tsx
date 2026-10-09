import { Section } from "@/shared/section";
import { StatusLegend } from "@/shared/status";
import { products } from "@/content/products";
import { ProductShowcase } from "./product-showcase";

export function Products() {
  return (
    <Section
      id="products"
      index="02"
      eyebrow="Our products"
      title="One product for each part of the operation."
      lede="PetraPMS runs the property, PetraPOS runs the outlets and PetraDMS runs distribution. Each one works on its own and is designed to connect to the others."
    >
      <StatusLegend className="-mt-6 mb-8 max-md:-mt-2 max-md:mb-6" />
      <div className="flex flex-col gap-6 sm:gap-8">
        {products.map((p, i) => (
          <ProductShowcase key={p.code} product={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
