"use client";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import { useEffect, useState } from "react";
import { checkout } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { quickWireGoProOnSignUp } from "@/app/helpers/helpers";

export default function PricingTables() {
  const [annual, setAnnual] = useState<boolean>(true);
  const [isGoingPro, setIsGoingPro] = useState(false);
  const { user } = useGlobalContext();

  const router = useRouter();

  const handleCheckout = () => {
    setIsGoingPro(true);
    if (!user) {
      quickWireGoProOnSignUp(annual === true ? "year" : "month");
      router.push("/signup");
    } else {
      checkout(user.uid, annual === true ? "year" : "month");
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Unlock the Full Potential of Your Projects with PRO
            </h1>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              We keep it simple. One plan, no hassle.
            </p>
          </div>

          {/* Pricing tables */}
          <div>
            {/* Pricing toggle */}
            <div
              className="flex justify-center mb-16"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="inline-flex items-center">
                <div className="text-gray-500 font-medium mr-3">
                  Billed Monthly
                </div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    name="pricing-toggle"
                    id="pricing-toggle"
                    className="sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                  />
                  <label className="bg-gray-600" htmlFor="pricing-toggle">
                    <span className="bg-gray-200" aria-hidden="true"></span>
                    <span className="sr-only">Enable to see yearly prices</span>
                  </label>
                </div>
                <div className="text-gray-500 font-medium ml-3">
                  Billed Annually
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-center lg:max-w-none">
              {/* Pricing table 1 */}
              <div
                className="relative flex flex-col h-full p-6 bg-gray-800"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-blue-600 mb-1">Free</div>
                  {/* <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      $
                    </span>
                    <span className="h2">{annual ? "49" : "55"}</span>
                    <span className="font-medium text-gray-400">/mo</span>
                  </div> */}
                  <div className="text-gray-400">
                    The basics. Give it a go and see what you can create
                  </div>
                </div>
                <div className="font-medium mb-3">Features include:</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Full free FontAwesome Regular free icon library with 150+
                      icons
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      8 pre-designed components to kickstart your design.
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Basic Color Palette: White, Black, and Red.</span>
                  </li>
                </ul>
                <div className="border border-gray-700 p-3 mt-6">
                  <a
                    className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full"
                    href="#0"
                  >
                    Try Free (link to canva here)
                  </a>
                </div>
              </div>

              {/* Pricing table 2 */}
              <div
                className="relative flex flex-col h-full p-6 bg-gray-800"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="absolute top-0 right-0 mr-6 -mt-4">
                  <div className="inline-flex text-sm font-semibold py-1 px-3 mt-px text-green-600 bg-green-200 rounded-full">
                    Most Popular
                  </div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-blue-600 mb-1">Pro</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      $
                    </span>
                    <span className="h2">{annual ? "49.99" : "4.99"}</span>
                    <span className="font-medium text-gray-400">/mo</span>
                    {annual ? (
                      <span className="ml-2 text-green-600">Save $9.98</span>
                    ) : null}
                  </div>
                  <div className="text-gray-400">
                    For the Discerning Designer Who Wants It All
                  </div>
                </div>
                <div className="font-medium mb-3">Features Include:</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Full free FontAwesome Regular, Solid & Brand free icon
                      library with 2000+ icons
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      12 pre-designed components for advanced designs.
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Full color control, utilize the entire hex color spectrum
                      for your designs.
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Apply custom CSS for unique designs.</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Get your questions answered with priority email support.
                    </span>
                  </li>
                </ul>
                <div className="border border-gray-700 p-3 mt-6">
                  <button
                    className={`btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full hover:cursor-${
                      isGoingPro ? "wait" : "pointer"
                    } cursor-${isGoingPro ? "wait" : "pointer"} `}
                    onClick={handleCheckout}
                  >
                    {isGoingPro ? "Going Pro..." : "Go Pro"}
                  </button>
                </div>
              </div>

              {/* Pricing table 3 */}
              {/* <div
                className="relative flex flex-col h-full p-6 bg-gray-800"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-blue-600 mb-1">Advanced</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      $
                    </span>
                    <span className="h2">{annual ? "129" : "135"}</span>
                    <span className="font-medium text-gray-400">/mo</span>
                  </div>
                  <div className="text-gray-400">
                    Better insights for growing businesses that want more
                    customers.
                  </div>
                </div>
                <div className="font-medium mb-3">
                  All features of Essential plus:
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>200 placeholder text commonly</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Excepteur sint occaecat cupidatat</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Officia deserunt mollit anim</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Voluptate velit esse cillum</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Placeholder text commonly used</span>
                  </li>
                </ul>
                <div className="border border-gray-700 p-3 mt-6">
                  <a
                    className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full"
                    href="#0"
                  >
                    Start free trial
                  </a>
                </div>
              </div> */}
            </div>

            {/* Bottom infobox */}
            {/* <div className="flex flex-col lg:flex-row justify-between items-center mt-12 lg:mt-6 lg:py-8 lg:border-t lg:border-b lg:border-gray-800">
              <div className="font-medium text-lg text-center lg:text-left mb-4 lg:mb-0">
                Expecting more than 1000 Active End Users?
              </div>
              <div>
                <a
                  className="btn-sm text-white bg-blue-600 hover:bg-blue-700"
                  href="#0"
                >
                  Contact us
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
