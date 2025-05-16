"use client";

import {
  useConnectedWallets,
  useWallets,
  useWalletConnector,
  useWalletDisconnector,
} from "@reactive-dot/react";
import { Suspense } from "react";
// import { useReactiveConfig } from "./client-provider";

export function Wallets() {
  return <WalletsContent />;
}

// This component only renders when the config is ready
function WalletsContent() {
  const wallets = useWallets();
  const connectedWallets = useConnectedWallets();

  const [, connectWallet] = useWalletConnector();
  const [, disconnectWallet] = useWalletDisconnector();

  return (
    <Suspense fallback={<div>Loading wallets...</div>}>
      <section>
        <header>
          <h3 className="text-xl font-bold">Wallet connection</h3>
        </header>
        <article>
          <h4 className="text-base font-bold">Available Wallets</h4>
          <ul>
            {wallets.map((wallet) => (
              <li
                key={wallet.id}
                className="flex justify-between items-center gap-2 mb-2"
              >
                <div>{wallet.name}</div>
                <div>
                  {connectedWallets.includes(wallet) ? (
                    <button
                      className="bg-red-500 text-white text-sm px-2 py-1 rounded-md"
                      onClick={() => disconnectWallet(wallet)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white text-sm px-2 py-1 rounded-md"
                      onClick={() => connectWallet(wallet)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </Suspense>
  );
}
