import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";

type PaymentInput = {
  companyId: string;
  amount: number;
  planName: string;
  status?: string;
  receiptUrl?: string;
  referenceNumber?: string;
};

export const createCompanyPayment = async (payload: PaymentInput) => {
  const company = await prisma.companyProfile.findUnique({
    where: { id: payload.companyId },
  });

  if (!company) {
    throw new AppError(404, "Company profile not found");
  }

  const payment = await prisma.paymentHistory.create({
    data: {
      companyId: payload.companyId,
      amount: payload.amount,
      planName: payload.planName,
      status: payload.status ?? "paid",
      receiptUrl: payload.receiptUrl,
      referenceNumber: payload.referenceNumber,
    },
  });

  if (payment.status === "paid") {
    await prisma.companyProfile.update({
      where: { id: payload.companyId },
      data: {
        subscription: payload.planName,
        subscriptionStatus: "active",
      },
    });
  }

  return payment;
};
