import prisma from "@/db";
import { Trader, TraderEnum, TraderRole } from "@/lib/models";

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

export async function updateTraderById(
  id: number,
  field: TraderEnum,
  data: string
) {
  let updatedTrader;
  let dataToUpdate;
  const trader = await prisma.trader.findFirst({ where: { id: id } });
  if (trader) {
    switch (field) {
      case TraderEnum.fullName:
        updatedTrader = await prisma.trader.update({
          where: { id: id },
          data: { fullName: data },
        });
        break;
      case TraderEnum.email:
        updatedTrader = await prisma.trader.update({
          where: { id: id },
          data: { email: data },
        });
        break;
      case TraderEnum.address:
        updatedTrader = await prisma.trader.update({
          where: { id: id },
          data: { address: data },
        });
        break;
      case TraderEnum.phoneNo:
        updatedTrader = await prisma.trader.update({
          where: { id: id },
          data: { phoneNo: data },
        });
        break;
      case TraderEnum.amount:
        updatedTrader = await prisma.trader.update({
          where: { id: id },
          data: { amount: parseFloat(data) },
        });
      default:
        break;
    }
  }
  return { updatedTrader };
}
