"use client";
import { useRef } from "react";
import { toast as sonner } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { addTransaction } from "@/app/actions/add-transaction";
export function AddTransaction() {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await addTransaction(formData);

    if (error) {
      sonner.error("Error", {
        description: error.toString(),
      });
    } else {

      sonner.success("Success", {
        description: "Transaction Added",
      });
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Add Transaction</h3>
      <form action={clientAction} ref={formRef}>
        <div className="mb-2 flex flex-col gap-2">
          <Label htmlFor="text">Type</Label>
          <select
            name="type"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="1">Income</option>
            <option value="-1">Expense</option>
          </select>
        </div>
        <div className="mb-2 flex flex-col gap-2">
          <Label htmlFor="text">Text</Label>
          <Input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="mb-2 flex flex-col gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            min={0}
            step="0.01"
          />
        </div>
        <Button className="my-3.5 w-full">Add transaction</Button>
      </form>
    </>
  );
}
