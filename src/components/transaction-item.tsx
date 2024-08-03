"use client";

import deleteTransaction from "@/app/actions/delete-transaction";
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";
import { X } from "lucide-react";
import { toast as sonner } from "sonner";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const date = new Date(transaction.createdAt).toLocaleDateString();
  // get time in 12 hour format
  const time = new Date(transaction.createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  async function handleDelete(transactionId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmed) return;
    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      sonner.error("Error", {
        description: error.toString(),
      });
    } else {
      sonner.success("Success", {
        description: message,
      });
    }
  }

  return (
    <Card className="p-4 w-full">
      <CardTitle className="mb-2">{transaction.text}</CardTitle>
      <div className="text-sm text-muted-foreground">
        <span>
          {date}, {time}
        </span>
        <div className="flex justify-between items-center">
          <span>
            {sign}$
            {addCommas(Number(Math.abs(transaction.amount)?.toFixed(2) ?? 0))}
          </span>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(transaction.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
