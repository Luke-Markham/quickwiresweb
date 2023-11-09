import { checkout } from "@/app/firebase";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import Link from "next/link";
import { useState } from "react";

const ProSection: React.FC = ({}) => {
  const { user } = useGlobalContext();
  const [annual, setAnnual] = useState<boolean>(true);
  const [isGoingPro, setIsGoingPro] = useState(false);

  const handleCheckout = () => {
    setIsGoingPro(true);
    checkout(user.uid, annual === true ? "year" : "month");
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto sm:px-6 relative">
        <div className="pt-48">
          <div
            className="max-w-3xl mx-auto text-center pb-12 md:pb-16"
            data-aos-id-cta
          >
            <h2
              className="h2 mb-4"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-cta]"
            >
              Ready to create better mockups?
            </h2>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-cta]"
            >
              Elevate your designs to the next level Go Pro for complete
              customization and control.
            </p>
            <div
              className="flex justify-center mb-8"
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
            <div className="inline-flex items-baseline mb-8">
              <span className="text-2xl md:text-3xl font-medium text-gray-400">
                $
              </span>
              <span className="h2">{annual ? "49.99" : "4.99"}</span>
              <span className="font-medium text-gray-400">/mo</span>
              {annual ? (
                <span className="ml-2 text-green-600">Save $9.98</span>
              ) : null}
            </div>

            <div
              className="flex justify-center mb-8"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="[data-aos-id-cta]"
            >
              <button
                className={`btn text-white font-bold bg-blue-600 hover:bg-blue-700 px-12 hover:cursor-${
                  isGoingPro ? "wait" : "pointer"
                } cursor-${isGoingPro ? "wait" : "pointer"} `}
                onClick={handleCheckout}
              >
                {isGoingPro ? "Going Pro..." : "Go Pro"}
              </button>
            </div>

            <div className="text-gray-400 text-center mt-6">
              Unsure sure why to go Pro?
              <Link
                href="/pricing"
                className="text-blue-600 hover:text-gray-200  ml-3 transition duration-150 ease-in-out"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProSection;
