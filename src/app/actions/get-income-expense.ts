"use server"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getIncomeExpense(): Promise<{ income?: number; expense?: number; error?: string; }> {
    const { userId } = auth();

    if (!userId) {
        return { error: 'User not found' };
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId }
        })

        const amounts = transactions.map((transactions) => transactions.amount)
        const income = amounts.filter(amount => amount > 0).reduce((total, amount) => total + amount, 0)
        const expense = Math.abs(amounts.filter(amount => amount < 0).reduce((total, amount) => total + amount, 0))
        return { income, expense }
    } catch (error) {
        return { error: 'DB error:' + (error as string).toString() }
    }
}