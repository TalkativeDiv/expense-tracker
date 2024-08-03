"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export async function addTransaction(
  formData: FormData
): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue =
    parseFloat(formData.get("amount") as string) *
    parseFloat(formData.get("type") as string);

  // Check for input values
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing" };
  }

  const text: string = textValue.toString(); // Ensure text is a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount as number

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");

    return { data: transactionData };
  } catch (error) {
    console.log(error);
    return { error: "Transaction not added" };
  }
}
