"use client";

import { ChainProvider, ReactiveDotProvider } from "@reactive-dot/react";
import { config } from "./config";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactiveDotProvider config={config}>
      <ChainProvider chainId="polkadot">{children}</ChainProvider>
    </ReactiveDotProvider>
  );
}
