import { Op } from "sequelize";
import Invoice from "../database/models/invoice";
import Payment from "../database/models/payment";

interface invoicesResult extends Invoice {
  payment?: Payment;
}

export const generateBillingReport = async (startDate: Date, endDate: Date) => {
  const invoices: Array<invoicesResult> | null = await Invoice.findAll({
    where: {
      dueDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: { model: Payment, as: "payment" },
  });

  // Initialize report variables
  let totalRevenue = 0;
  let totalOutstandingBalance = 0;
  let approvedClaims = 0;
  let pendingClaims = 0;
  let rejectedClaims = 0;

  invoices.forEach((invoice) => {
    // Safeguard against undefined insuranceCoverage
    const totalCoverage =
      invoice.clientCoverage + (invoice.insuranceCoverage || 0);

    const totalPaid = invoice.payment?.amount || 0;
    const outstandingBalance = Math.max(totalCoverage - totalPaid, 0); // Ensure non-negative outstanding balance

    // Calculate claims by status
    const approvedInsuranceClaims =
      invoice.payment?.insuranceClaimStatus === "Approved"
        ? invoice.insuranceCoverage || 0
        : 0;

    const rejectedInsuranceClaims =
      invoice.payment?.insuranceClaimStatus === "Rejected"
        ? invoice.insuranceCoverage || 0
        : 0;

    const pendingInsuranceClaims =
      invoice.payment?.insuranceClaimStatus === "Pending"
        ? invoice.insuranceCoverage || 0
        : 0;

    totalRevenue += totalPaid;
    totalOutstandingBalance += outstandingBalance;
    approvedClaims += approvedInsuranceClaims;
    pendingClaims += pendingInsuranceClaims;
    rejectedClaims += rejectedInsuranceClaims;
  });

  return {
    totalRevenue,
    totalOutstandingBalance,
    approvedClaims,
    pendingClaims,
    rejectedClaims,
  };
};
