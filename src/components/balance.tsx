import getBalance from "@/app/actions/get-balance";
import { addCommas } from "@/lib/utils";
export async function Balance() {
  const balance = await getBalance();
  return (
    <>
      <h4 className="font-semibold">Your Balance</h4>
      <h1 className="font-bold text-3xl">
        {`${(balance.balance ?? 0) >= 0 ? "" : "-"}$${addCommas(
          Number(Math.abs(balance.balance ?? 0)?.toFixed(2))
        )}`}
      </h1>
    </>
  );
}
