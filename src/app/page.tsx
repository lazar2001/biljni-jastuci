import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Ingredients } from "@/components/sections/Ingredients";
import { Scents } from "@/components/sections/Scents";
import { Sizes } from "@/components/sections/Sizes";
import { Gallery } from "@/components/sections/Gallery";
import { OrderSection } from "@/components/sections/OrderSection";
import { Delivery } from "@/components/sections/Delivery";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/layout/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <About />
      <Benefits />
      <Ingredients />
      <Scents />
      <Sizes />
      <Gallery />
      <OrderSection />
      <Delivery />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
