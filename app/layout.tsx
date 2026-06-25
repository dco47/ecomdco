import type { Metadata } from "next";
import { Sen, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";

const sen = Sen({
  variable: "--font-sen",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ecomDco",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${sen.variable} ${unbounded.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
