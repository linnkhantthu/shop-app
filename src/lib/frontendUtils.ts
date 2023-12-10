import { Results, Trader, TraderRole } from "./models";

/**
 * Fetch Traders
 * @param role TraderRole i.e: "SUPPLIER" or "CUSTOMER"
 * @param page Current page number for pagination
 * @param cursor Cursor for prisma pagination i.e: Model's Id
 * @returns Returns {traders, count, message}
 */
export async function fetchTraders(
  role: TraderRole,
  page: number,
  cursor: number
) {
  const res = await fetch(
    `/api/traders?role=${role}&page=${page}&cursor=${cursor}`,
    {
      method: "GET",
    }
  );
  if (res.ok) {
    const {
      traders,
      count,
      message,
    }: { traders: Trader[]; count: number; message: string } = await res.json();
    return { traders, count, message };
  } else {
    return { message: Results.CONNECTION_ERROR };
  }
}

/**
 * Add Trader
 * @param fullname Fullname of the trader.
 * @param email Email of the trader.
 * @param address Address of the trader.
 * @param phoneNo Phone number of the trader.
 * @param role Role of the trader i.e: SUPPLIER or CUSTOMER.
 * @param [amount=0] Amount of money that is left.
 */
export async function addTrader(
  fullname: string,
  email: string,
  address: string,
  phoneNo: string,
  role: TraderRole,
  amount = 0
) {
  if (fullname !== "" && address !== "" && phoneNo !== "" && email !== "") {
    const newSupplier: Trader = {
      id: Math.floor(Math.random() * 100),
      fullName: fullname,
      email: email,
      address: address,
      phoneNo: phoneNo,
      role: role,
      amount: amount,
    };
    const res = await fetch("/api/traders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    });
    if (res.ok) {
      const { trader, message }: { trader: Trader; message: string } =
        await res.json();
      return { trader, message };
    } else {
      return { message: Results.CONNECTION_ERROR };
    }
  }
  return { message: "Lacks of input data" };
}
