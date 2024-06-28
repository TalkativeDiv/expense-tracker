import { AddTransaction } from '@/components/add-transaction';
import { Balance } from '@/components/balance';
import { IncomeExpense } from '@/components/income-expense';
import { TransactionList } from '@/components/transaction-list';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="grid place-items-center my-8">
        <Button asChild variant="secondary">
          <SignInButton />
        </Button>
      </div>
    );
  }
  return (
    <main className='p-8 w-96 mx-auto my-8 flex justify-center items-center flex-col'>
      <div className='flex flex-col gap-4'>
        <div><h2 className='text-2xl font-semibold'>Welcome, {user.firstName}!</h2><br />
          <Balance /></div>
        <IncomeExpense />
        <AddTransaction />
        <TransactionList />
      </div>
    </main>
  );
}
