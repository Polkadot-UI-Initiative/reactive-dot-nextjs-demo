"use client";

import { ChainProvider } from "@reactive-dot/react";
import { ReactiveDotProvider } from "@reactive-dot/react";
import { config } from "./config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactiveDotProvider config={config}>
      <ChainProvider chainId="polkadot">{children}</ChainProvider>
    </ReactiveDotProvider>
  );
}
