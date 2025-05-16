"use client";

// `dot` is the name we gave to `npx papi add`
import { dot } from "@polkadot-api/descriptors";
import { defineConfig } from "@reactive-dot/core";
import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";

const lightClientProvider = createLightClientProvider();

export const config = defineConfig({
  chains: {
    // "polkadot" here can be any unique string value
    polkadot: {
      descriptor: dot,
      provider: lightClientProvider.addRelayChain({ id: "polkadot" }),
    },
  },
  wallets: [new InjectedWalletProvider()],
});
