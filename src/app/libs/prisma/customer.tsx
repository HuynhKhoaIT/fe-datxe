import prisma from "../prismadb";
export async function createCustomer(json: any) {
    try {  
        const customer = await prisma.customer.create({
            data: {
                fullName: json.fullName,
                phoneNumber: json.phoneNumber,
                cityId: parseInt(json.cityId),
                districtId: parseInt(json.districtId),
                wardId: parseInt(json.wardId),
                address: json.address,
                dob: json.dob,
                description: json.description,
                sex: json.sex,
                garageId: parseInt(json.garageId),
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