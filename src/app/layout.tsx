import type { Metadata } from "next";
import "./globals.css";
import Html from "./components/Html";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop App from linnkhantthu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Html>{children}</Html>;
}
