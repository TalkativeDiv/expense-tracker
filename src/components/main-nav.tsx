import { checkUser } from "@/lib/checkUser";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Banknote } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
interface MainNavProps {
  items?: NavItem[];
}

export async function MainNav({ items }: MainNavProps) {
  const user = await checkUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 px-4 py-2">
          <Link href="/" className="flex items-center space-x-2">
            <Banknote className="h-6 w-6" />
            <span className="inline-block font-bold">Expense Tracker</span>
          </Link>
        </div>
        <div className="flex gap-2 align-center justify-center">
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
