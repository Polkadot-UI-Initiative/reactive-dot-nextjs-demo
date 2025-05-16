"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import client components with ssr disabled
const ClientProviders = dynamic(
  () => import("./client-providers").then((mod) => mod.ClientProviders),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Only show client components after mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <ClientProviders>{children}</ClientProviders> : null;
}
