'use client';

import deleteTransaction from '@/app/actions/delete-transaction';
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardDescription, CardTitle } from "./ui/card";
import { useToast } from './ui/use-toast';

export function TransactionItem({ transaction }: { transaction: Transaction }) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const { toast } = useToast()
    async function handleDelete(transactionId: string) {
        const confirmed = window.confirm('Are you sure you want to delete this transaction?');
        if (!confirmed) return;
        const { message, error } = await deleteTransaction(transactionId);
        toast({ title: (error ? "Error" : "Success"), description: (error ? error : message), variant: (error ? "destructive" : "default") })
    }

    return (
        <Card className="p-4 w-full">
            <CardTitle className='mb-2'>{transaction.text}</CardTitle>
            <CardDescription className='flex justify-between items-center'>
                <span>
                    {sign}${addCommas(Number(Math.abs(transaction.amount)?.toFixed(2) ?? 0))}
                </span>
                <Button variant='destructive'
                    size="icon"
                    onClick={() => handleDelete(transaction.id)}
                >
                    <X className='w-4 h-4' />
                </Button>
            </CardDescription>
        </Card>
    );
};

