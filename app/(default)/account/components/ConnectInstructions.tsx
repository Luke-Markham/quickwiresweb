import { useState } from "react";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import InstructionImage1 from "@/public/images/install-instructions1.png";
import InstructionImage2 from "@/public/images/install-instructions2.png";
import Image from "next/image";

const ConnectInstructions = () => {
  const { user } = useGlobalContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.uid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex flex-col" data-aos="fade-up">
      <h2 className="h3">You still need to connect to Canva</h2>
      <p className="text-lg text-gray-400  max-w-2xl">
        Copy your code below, go to QuickWires in Canva, click "Learn More"
        under "Upgrade To QuickWires Pro", and enter your code to connect your
        account.
      </p>
      <div className="mt-8 max-w-sm relative">
        <div className="flex justify-between">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="userCode"
          >
            Canva Code
          </label>
          <span className="text-green-500 self-end">
            {copied ? "Copied!" : ""}
          </span>
        </div>

        <input
          id="userCode"
          type="text"
          className="form-input w-full text-gray-300 pr-10"
          disabled
          value={user.uid}
        />
        <button
          onClick={handleCopy}
          className="absolute right-3 bottom-1 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            viewBox="0 0 448 512"
          >
            <path
              fill="#9BA9B4"
              d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-8 mt-8">
        <Image
          className="max-w-full md:max-w-none h-auto"
          src={InstructionImage1}
          width={350}
          height={500}
          alt="Install instructions 1"
        />

        {/* <Image
          className="max-w-full md:max-w-none h-auto"
          src={InstructionImage2}
          width={350}
          height={500}
          alt="Install instructions 2"
        /> */}
      </div>
    </div>
  );
};

export default ConnectInstructions;
