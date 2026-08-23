"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function ShellLayout({ children, showFooter = true }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  // Persist sidebar state
  useEffect(() => {
    const stored = localStorage.getItem("sidebar_collapsed");
    if (stored !== null) setCollapsed(stored === "true");
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar_collapsed", String(!prev));
      return !prev;
    });
  };

  const sidebarWidth = collapsed ? 72 : 280;

  return (
    <div className="min-h-screen bg-paper">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <Header collapsed={collapsed} onToggle={toggle} />

      {/* Main content — offset by sidebar and header */}
      <main
        className="transition-[margin-left] duration-300 pt-16 min-h-screen"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>

      {showFooter && (
        <div
          className="transition-[margin-left] duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <Footer />
        </div>
      )}
    </div>
  );
}
