"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

const SEEN_KEY = "ccc_splash_seen";
const SPLASH_MS = 2400;

/**
 * "/" is the splash gate: first visit in a session shows the animated splash
 * and then lands on /landing. Repeat visits in the same session go straight
 * to /landing. Skip button jumps ahead immediately.
 */
export default function SplashGate() {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const goRef = useRef(() => {
    sessionStorage.setItem(SEEN_KEY, "1");
    router.replace("/landing");
  });

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      setShow(false);
      router.replace("/landing");
      return;
    }
    const t = setTimeout(() => goRef.current(), SPLASH_MS);
    return () => clearTimeout(t);
  }, [router]);

  if (!show) return null;
  return <SplashScreen onSkip={() => goRef.current()} />;
}
