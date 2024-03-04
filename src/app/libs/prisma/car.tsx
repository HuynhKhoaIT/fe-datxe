import prisma from "../prismadb";
import { getGarageByDlbdId } from "./garage";
export async function createCar(json: any) {
    try {
        const car = await prisma.car.create({
            data: {                
                customerId: Number(json.customerId),
                numberPlates: json.numberPlates,
                carBrandId: Number(json.carBrandId),
                carNameId: Number(json.carNameId),
                carYearId: Number(json.carYearId),
                carStyleId: json.carStyleId,
                color: json.color,
                vinNumber: json.vinNumber,
                machineNumber: json.machineNumber,
                description: json.description,
                status: json.status,
                garageId: Number(json.garageId),
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


export async function syncCarFromDLBD(requestData:any) {
    try {
        const garage = await getGarageByDlbdId(requestData.garage_id);
        if(garage){
            const car = await prisma.car.findFirst({
                where:{
                    status: "PUBLIC",
                    numberPlates: {
                        contains: requestData.numberPlates
                    },
                    garageId: Number(garage.id)
                }
            });
            if(car){
                return car;
            }else{
                const carNew = await prisma.car.create({
                    data: {
                        customerId: Number(requestData.customerId),
                        numberPlates: requestData.numberPlates,
                        description: requestData.description,
                        garageId: Number(garage.id)
                    }
                });
                return carNew;                
            }
        }
        
        
    } catch (error) {
        return { error };
    }
}