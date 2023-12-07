import prisma from "@/db";
import { Trader, TraderRole } from "@/lib/models";

export async function insertTrader(trader: Trader) {
  let addedTrader: Trader | undefined = undefined;
  const isTraderExist = await prisma.trader.findFirst({
    where: {
      email: trader.email,
    },
  });
  if (isTraderExist === null) {
    addedTrader = (await prisma.trader.create({
      data: {
        fullName: trader.fullName,
        email: trader.email,
        address: trader.address,
        phoneNo: trader.phoneNo,
        role: trader.role,
      },
    })) as Trader;
    console.log(addedTrader);
  }
  return { addedTrader };
}

export async function getTradersByRole(role: any) {
  const traders = await prisma.trader.findMany({
    where: {
      role: role,
    },
  });
  return { traders };
}
