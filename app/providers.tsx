"use client";

// next.js with dynamic import with ssr disabled works
// https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr

import dynamic from "next/dynamic";

// Dynamically import client components with ssr disabled
const ClientProviders = dynamic(
  () => import("./client-providers").then((mod) => mod.ClientProviders),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}

// react.lazy loading does not work in this case as it still imports and evaluates
// the module on the server

// import { Suspense, lazy, type ReactNode } from "react";

// const ClientProviders = lazy(() =>
//   import("./client-providers").then((m) => ({ default: m.ClientProviders }))
// );

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <Suspense fallback={null}>
//       <ClientProviders>{children}</ClientProviders>
//     </Suspense>
//   );
// }
