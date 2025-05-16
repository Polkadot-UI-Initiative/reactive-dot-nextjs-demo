"use client";

import { useAccounts, useLazyLoadQuery } from "@reactive-dot/react";
import { Suspense, useEffect, useState } from "react";

export function MyComponent() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <MyComponentContent />
    </Suspense>
  );
}

// This component only runs on the client after initialization
function MyComponentContent() {
  const accounts = useAccounts();
  const [timestamp, totalIssuance] = useLazyLoadQuery((builder) =>
    builder.storage("Timestamp", "Now").storage("Balances", "TotalIssuance", [])
  );

  return (
    <div>
      <h3 className="text-2xl font-bold">Your accounts:</h3>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            <div>Address: {account.address}</div>
            {account.name && <div>Name: {account.name}</div>}
          </li>
        ))}
      </ul>
      <section>
        <div>
          Latest block timestamp: {new Date(Number(timestamp)).toLocaleString()}
        </div>
        <div>Total issuance: {totalIssuance.toString()}</div>
      </section>
    </div>
  );
}

export function MultiQuery() {
  return (
    <Suspense fallback={<div>Loading multi query...</div>}>
      <MultiQueryWrapper />
    </Suspense>
  );
}

function MultiQueryWrapper() {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to detect client-side rendering
  useEffect(() => {
    // After hydration, allow a moment for the config to initialize
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render until after initial client-side load
  if (!isClient) {
    return <div>Initializing query...</div>;
  }

  // Only render the actual implementation on the client
  return <MultiQueryContent />;
}

// This component only runs on the client after initialization
function MultiQueryContent() {
  const [expectedBlockTime, epochDuration, proposalCount] = useLazyLoadQuery(
    (builder) =>
      builder
        .constant("Babe", "ExpectedBlockTime")
        .constant("Babe", "EpochDuration")
        .storage("Treasury", "ProposalCount", [])
  );

  return (
    <dl className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md">
      <dt>Expected block time</dt>
      <dd>{expectedBlockTime}</dd>

      <dt>Epoch duration</dt>
      <dd>{epochDuration}</dd>

      <dt>Proposal count</dt>
      <dd>{proposalCount}</dd>
    </dl>
  );
}
