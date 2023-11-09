"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import { getAuth } from "firebase/auth";
import UserIcon from "./userIcon";

export default function Header() {
  const { user } = useGlobalContext();
  const auth = getAuth();

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="QuickWires">
              <Image
                src={Logo}
                width={75}
                height={75}
                alt={"QuickWires Logo"}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/home"
                  className="font-medium text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              {!user || !user.pro ? (
                <li>
                  <Link
                    href="/pricing"
                    className="font-medium text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Pricing
                  </Link>
                </li>
              ) : null}
              {user ? (
                <>
                  <li>
                    <button
                      onClick={(e) => {
                        auth.signOut();
                      }}
                      className="font-medium text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Sign out
                    </button>
                  </li>
                  <li className="px-4 py-3 flex items-center transition duration-150 ease-in-ou">
                    <Link href="/account">
                      <UserIcon />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signin"
                      className="font-medium text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
