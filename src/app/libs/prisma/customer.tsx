import prisma from "../prismadb";
export async function createCustomer(json: any) {
    try {  
        const customer = await prisma.customer.create({
            data: {
                fullName: json.fullName,
                phoneNumber: json.phoneNumber,
                cityId: Number(json.cityId),
                districtId: Number(json.districtId),
                wardId: Number(json.wardId),
                address: json.address,
                dob: json.dob,
                description: json.description,
                sex: json.sex,
                garageId: Number(json.garageId),
                status: json.status,
            },
            include:{
                cars: true
            }
        });
        return {customer};
    } catch (error) {
      return { error };
    }
  }