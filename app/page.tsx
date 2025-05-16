import Image from "next/image";
import { Wallets } from "./wallets";
import { MultiQuery } from "./multi-query";
import { Accounts } from "./accounts";
import Link from "next/link";
export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto mt-10 px-4">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />{" "}
          <Link href="https://reactive-dot.com" className="underline">
            + reactive dot
          </Link>
        </div>
        <Wallets />
        <Accounts />
        <MultiQuery />
      </main>
    </div>
  );
}
