"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import { useRouter } from "next/navigation";
import { checkout, handleGoogleSignUp } from "@/app/firebase";
import { quickWireGoProOnSignUp } from "@/app/helpers/helpers";

export default function Content() {
  const auth = getAuth();
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailPasswordSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const result = quickWireGoProOnSignUp();
        if (result?.goPro) {
          checkout(user.uid, result.timing);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        setError({
          isError: true,
          message: errorMessage
            .replace("Firebase:", "")
            .replace("auth/", "")
            .trim(),
        });
      });
  };

  if (user) {
    router.push("/account");
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {isLoading ? null : <h1 className="h1">Design. Drag. Done.</h1>}
          </div>
          <div className="max-w-sm mx-auto">
            {isLoading ? (
              <p className="text-xl text-center">Creating...</p>
            ) : (
              <>
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleGoogleSignUp();
                        }}
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Sign up with Google
                        <div className="ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">
                    Or, register with your email
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email<span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError({ isError: false, message: "" });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError({ isError: false, message: "" });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    {error.isError ? (
                      <p className="text-medium text-red-600 px-3">
                        {error.message}
                      </p>
                    ) : null}
                  </div>
                  {/* <div className="text-sm text-gray-500 text-center">
                I agree to be contacted by Open PRO about this offer as per the
                Open PRO{" "}
                <Link
                  href="#"
                  className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                >
                  Privacy Policy
                </Link>
                .
              </div> */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEmailPasswordSignUp();
                        }}
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Sign up with Email
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Already using QuickWires?
                  <Link
                    href="/signin"
                    className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out ml-2"
                  >
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
