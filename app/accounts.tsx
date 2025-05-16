"use client";
import { useAccounts, useLazyLoadQuery } from "@reactive-dot/react";
import { Suspense } from "react";

export function Accounts() {
  return (
    <Suspense fallback={<div>Loading accounts...</div>}>
      <AccountsContent />
    </Suspense>
  );
}

function AccountsContent() {
  const accounts = useAccounts();
  const [timestamp, totalIssuance, blockNumber] = useLazyLoadQuery((builder) =>
    builder
      .storage("Timestamp", "Now")
      .storage("Balances", "TotalIssuance", [])
      .storage("System", "Number", [])
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Your accounts:</h3>
      <ul>
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <li key={index}>
              <div>Address: {account.address}</div>
              {account.name && <div>Name: {account.name}</div>}
            </li>
          ))
        ) : (
          <li>No accounts found</li>
        )}
      </ul>
      <section className="mt-4 border-t pt-4">
        <div>Latest block number: {blockNumber.toString()}</div>
        <div>
          Latest block timestamp: {new Date(Number(timestamp)).toLocaleString()}
        </div>
        <div>Total issuance: {totalIssuance.toString()}</div>
      </section>
    </div>
  );
}
