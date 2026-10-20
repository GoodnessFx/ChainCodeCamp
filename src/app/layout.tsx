import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ChainCodeCamp",
    template: "%s | ChainCodeCamp",
  },
  description: "Security first. Learn by doing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:border-2 focus:border-brand focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-zinc-900"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
