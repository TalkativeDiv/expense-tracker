import { AddTransaction } from "@/components/add-transaction";
import { Balance } from "@/components/balance";
import { IncomeExpense } from "@/components/income-expense";
import { TransactionList } from "@/components/transaction-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignIn, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      //   <Button asChild variant="secondary">
      //   <SignInButton />
      // </Button>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Track your finances
            <br className="hidden sm:inline" />
            <span className="inline-block bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              without forgetting
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Finally a free an open source finance tracker that{" "}
            <span className="font-bold">you can host yourself</span>, no strings
            attached.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <SignInButton />
          </Button>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/TalkativeDiv/t3gallery"
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
      </section>
    );
  }
  return (
    <main className="p-8 w-96 mx-auto my-8 flex justify-center items-center flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {user.firstName}!</h2>
          <br />
          <Balance />
        </div>
        <IncomeExpense />
        <AddTransaction />
        <TransactionList />
      </div>
    </main>
  );
}
