import prisma from "@/db";
import { Trader, TraderEnum } from "@/lib/models";

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
  let message = "Updated trader successfully.";
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
        const isTraderWithEmailExist = await prisma.trader.findFirst({
          where: { email: data },
        });
        if (isTraderWithEmailExist === null) {
          updatedTrader = await prisma.trader.update({
            where: { id: id },
            data: { email: data },
          });
        } else {
          message = "There is already another trader with this email.";
        }
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
  } else {
    message = "Could not find the trader to update.";
  }
  return { updatedTrader, message };
}

export async function deleteTraderById(traderId: number) {
  let deletedTrader;
  const trader = await prisma.trader.findFirst({ where: { id: traderId } });
  if (trader) {
    deletedTrader = await prisma.trader.delete({
      where: { id: traderId },
    });
  }
  return { deletedTrader };
}
