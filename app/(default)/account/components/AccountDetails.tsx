import { openStripePortal } from "@/app/firebase";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import { useState } from "react";

const AccountDetails = ({ setConfirmDelete }: any) => {
  const { user } = useGlobalContext();
  const [isGrabbingSubscription, setIsGrabbingSubscription] = useState(false);

  const handleManageSubscription = () => {
    setIsGrabbingSubscription(true);
    openStripePortal();
  };

  return (
    <div data-aos="fade-up">
      <ul className="flex flex-col gap-8">
        <li>
          <h4 className="text-xl font-medium mb-2">
            Welcome {user.name !== user.email && user.name}
          </h4>
          <p className="text-lg text-gray-400">
            <span>Email: </span>
            {user.email}
          </p>
        </li>
        {user.pro ? (
          <li>
            <button
              className="btn 
      bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 text-white"
              onClick={handleManageSubscription}
              disabled={isGrabbingSubscription}
            >
              {isGrabbingSubscription ? "Just a sec..." : "Manage Subscription"}
            </button>
          </li>
        ) : null}
        <li>
          <button
            className="btn 
    border-red-600 text-red-600 hover:bg-red-700 hover:border-red-700 hover:text-white"
            onClick={() => setConfirmDelete(true)}
            disabled={isGrabbingSubscription}
          >
            Delete Account
          </button>
        </li>
      </ul>{" "}
    </div>
  );
};

export default AccountDetails;
