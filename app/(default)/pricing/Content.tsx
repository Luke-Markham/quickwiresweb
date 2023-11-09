"use client";

import PricingTables from "@/components/pricing-tables";
import Faqs from "@/components/faqs";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";

export default function Content() {
  const router = useRouter();
  const { user } = useGlobalContext();

  if (user?.pro) {
    router.push("account");
  }

  return (
    <>
      <PricingTables />
      {/* <Faqs />
      <Testimonials />
      <Cta /> */}
    </>
  );
}
