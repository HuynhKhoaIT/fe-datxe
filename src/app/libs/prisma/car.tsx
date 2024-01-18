import prisma from "../prismadb";
export async function createCar(json: any) {
    try {
        // return json;
        const car = await prisma.car.create({
            data: {                
                customerId: parseInt(json.customerId),
                numberPlates: json.numberPlates,
                carBrandId: parseInt(json.carBrandId),
                carNameId: parseInt(json.carNameId),
                carYearId: parseInt(json.carYearId),
                carStyleId: json.carStyleId,
                color: json.color,
                vinNumber: json.vinNumber,
                machineNumber: json.machineNumber,
                description: json.description,
                status: json.status,
                garageId: parseInt(json.garageId),
            },
            include:{
                customer: true,
                carStyle: true
            }
        });
        return {car};
    } catch (error) {
      return { error };
    }
  }