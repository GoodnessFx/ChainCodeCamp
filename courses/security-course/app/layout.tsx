import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "ChainCodeCamp — Smart Contract Security Education",
    template: "%s | ChainCodeCamp",
  },
  description:
    "Free, structured smart contract security curriculum. EVM internals, Solidity, Yul assembly, auditing, and bug bounties — built for African and self-taught devs.",
  openGraph: {
    siteName: "ChainCodeCamp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
