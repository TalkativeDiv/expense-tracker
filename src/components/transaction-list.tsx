import getTransactions from '@/app/actions/get-transactions'
import { Transaction } from '@prisma/client'
import React from 'react'

import { TransactionItem } from '@/components/transaction-item'

export async function TransactionList() {
    const { transactions, error } = await getTransactions()
    if (error) {
        return <p className="text-red-500 bold">{error}</p>
    }
    return (
        <div>
            <h3 className='font-semibold text-lg'></h3>
            <ul className='flex justify-center items-center flex-col gap-2 w-full'>
                {transactions && transactions.map((transaction: Transaction) =>
                    <TransactionItem key={transaction.id} transaction={transaction} />
                )}
            </ul>
        </div>
    )
}

