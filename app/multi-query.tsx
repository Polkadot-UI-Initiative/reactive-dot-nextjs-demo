"use client";

import { useLazyLoadQuery } from "@reactive-dot/react";
import { Suspense } from "react";

export function MultiQuery() {
  return (
    <Suspense fallback={<div>Loading multi query...</div>}>
      <MultiQueryContent />
    </Suspense>
  );
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
