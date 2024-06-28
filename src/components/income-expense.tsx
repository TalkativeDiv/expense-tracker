import getIncomeExpense from "@/app/actions/get-income-expense"
import { addCommas } from "@/lib/utils"
import { Card } from "./ui/card"

export async function IncomeExpense() {
    const { income, expense } = await getIncomeExpense()
    return <Card className="p-4 flex-row flex justify-between items-center">
        <div className="flex flex-col justify-center items-center"><h4 className="font-semibold">Income</h4><p className="text-green-500 font-medium">${addCommas(income ?? 0)}</p></div>
        <div className="flex flex-col justify-center items-center"><h4 className="font-semibold" >Expenses</h4><p className="text-red-500 font-medium">${addCommas(expense ?? 0)}</p></div>

    </Card>
}