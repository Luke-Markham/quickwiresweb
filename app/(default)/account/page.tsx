"use client";
import metadata from "./metadata";
import { useState } from "react";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import { useRouter } from "next/navigation";

import ProSection from "./components/ProSection";
import ConnectInstructions from "./components/ConnectInstructions";
import ConfirmDelete from "./components/ConfirmDelete";
import AccountDetails from "./components/AccountDetails";

export default function Account() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!user) {
    router.push("/home");
    return null;
  }

  const paddingTop = !user.pro ? "24" : "40";

  return (
    <>
      {!user.pro && <ProSection />}
      <section>
        <div
          className={`max-w-6xl mx-auto px-4 sm:px-6 md:pb-16 pb-10 pt-24 md:pt-${paddingTop}`}
        >
          <div className="max-w-3xl pb-12">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Account
            </h1>
          </div>

          <div className="grid gap-16">
            {user.pro && user.canvaUser && !confirmDelete && (
              <ConnectInstructions />
            )}

            {confirmDelete ? (
              <ConfirmDelete setConfirmDelete={setConfirmDelete} />
            ) : (
              <AccountDetails setConfirmDelete={setConfirmDelete} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
