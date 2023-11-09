"use client";

import { handleGoogleSignUp } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Content() {
  const auth = getAuth();
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailPasswordSignIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
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
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {isLoading ? null : <h1 className="h1">Welcome back</h1>}
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            {isLoading ? (
              <p className="text-xl text-center">Signing in...</p>
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
                        Sign in with Google
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
                    Or, sign in with your email
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
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        // placeholder="you@yourcompany.com"
                        value={email}
                        required
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
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        // placeholder="Password (at least 10 characters)"
                        value={password}
                        required
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
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        {/* <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">
                        Keep me signed in
                      </span>
                    </label> */}
                        <Link
                          href="/reset-password"
                          className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEmailPasswordSignIn();
                        }}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
