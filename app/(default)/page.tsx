export const metadata = {
  title: "QuickWires | Home",
  description: "Drag and drop mockups, right in Canva",
};

import Hero from "@/components/hero";
import Features from "@/components/features";
import Newsletter from "@/components/newsletter";
import Zigzag from "@/components/zigzag";
import Testimonials from "@/components/testimonials";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Zigzag />
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
      {/* <Banner /> */}
    </>
  );
}
