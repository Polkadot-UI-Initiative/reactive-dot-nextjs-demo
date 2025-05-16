"use client";

import dynamic from "next/dynamic";

// Dynamically import client components with ssr disabled
const ClientProviders = dynamic(
  () => import("./client-providers").then((mod) => mod.ClientProviders),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
