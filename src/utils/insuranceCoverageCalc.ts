import Insurance from "../database/models/insurance";
import InsuranceServiceCoverage from "../database/models/insuranceServiceCoverage";

// Helper function to calculate insurance and client coverage for services
export const calculateServiceCoverage = async (
  servicesData: any[],
  insuranceIDs: string[] | undefined,
  priceCoverage: { clientCoverage: number; insuranceCoverage: number }
) => {
  // If no insurance, client pays full price for all services
  if (!insuranceIDs || insuranceIDs.length === 0) {
    return servicesData.map((service) => {
      // Add full service price to client coverage
      priceCoverage.clientCoverage += service.price;

      return {
        name: service.name,
        price: service.price,
        description: service.description,
      };
    });
  }

  // Calculate insurance coverage if available
  const updatedServices = await Promise.all(
    servicesData.map(async (service) => {
      let coveredByInsurance = false;
      let priceCoveredByInsurance = 0;

      // Check if the service is covered by any of the patient's insurances
      coveredByInsurance = service.insurances.some(
        (insurance: Insurance) => insurance.id === insuranceIDs[0]
      );

      if (coveredByInsurance) {
        const insuranceCoverage = await InsuranceServiceCoverage.findOne({
          where: { insuranceId: insuranceIDs[0], serviceId: service.id },
        });

        const percentage: number = insuranceCoverage?.coveragePercentage || 0;
        priceCoveredByInsurance = (service.price * percentage) / 100;

        priceCoverage.insuranceCoverage += priceCoveredByInsurance;
        priceCoverage.clientCoverage += service.price - priceCoveredByInsurance;
      } else {
        // Client pays the full price if the service isn't covered by insurance
        priceCoverage.clientCoverage += service.price;
      }

      return {
        name: service.name,
        price: service.price,
        description: service.description,
      };
    })
  );

  return updatedServices;
};
