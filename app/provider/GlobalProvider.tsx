"use client";
import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import { createUser, firebaseConfig, getUser } from "../firebase";
import { getAuth } from "firebase/auth";
import PageIllustration from "@/components/page-illustration";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { app } from "../firebase";

type GlobalContext = {
  user: any | null;
};

interface GlobalContextProps {
  globalContext: GlobalContext;
  setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>;
}

const defaultGlobalContext = {
  user: null,
};

export const GlobalContext = createContext<GlobalContextProps>({
  globalContext: defaultGlobalContext,
  setGlobalContext: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalContext, setGlobalContext] =
    useState<GlobalContext>(defaultGlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    app;
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setGlobalContext({ user: null });
      } else {
        console.log("here1");
        const authUser = {
          name: user.displayName ? user.displayName : user.email!,
          email: user.email!,
          uid: user.uid!,
          photoUrl: user.photoURL,
        };
        let dbUser = await getUser(authUser);
        console.log({ dbUser });
        if (!dbUser) {
          console.log("creating...");
          const userToCreate = { ...authUser };
          const createdUser = await createUser(userToCreate);
          if (!createdUser) {
            dbUser = null;
          } else {
            dbUser = userToCreate;
          }
        }
        setGlobalContext({ user: dbUser });
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <PageIllustration />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image src={Logo} width={256} height={256} alt={"QuickWires Logo"} />
        </div>
      </>
    );
  }

  return (
    <GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
      {children}
    </GlobalContext.Provider>
  );
};
