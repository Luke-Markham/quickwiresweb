import "./css/style.css";
import {
  Inter,
  Architects_Daughter,
  Gloria_Hallelujah,
} from "next/font/google";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { firebaseConfig } from "./firebase";
import { GlobalProvider } from "./provider/GlobalProvider";

const architects_daughter = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  display: "swap",
});

const inter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "QuickWires",
  description:
    "QuickWires for Canva - Effortlessly create mockups and wireframes directly within Canva. Streamline your design process without the hassle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ${architects_daughter.variable} */}

      <body
        className={`${architects_daughter.variable} ${inter.variable}  font-inter antialiased bg-gray-900 text-slate-50 tracking-tight`}
      >
        <GlobalProvider>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            {children}
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
