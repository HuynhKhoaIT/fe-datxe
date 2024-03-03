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

export async function getCustomers(requestData:any) {
    let currentPage = 1;
    let take = 10;
    let limit = 10;
    if(requestData.limit){
      take = parseInt(requestData.limit)
    }
    const skip = take * (currentPage - 1);
    let titleFilter = '';
    let garageId = {};
    
    let status = {
        contains: 'PUBLIC',
    };
    if(requestData.status == 'NOT_DELETE'){
        let status = {
            not: 'DELETE',
        };
    }else if(requestData.status){
        let status = {
            contains: requestData.status,
        };
    }
    const customers = await prisma.customer.findMany({
        take: take,
        skip: skip,
        where: {
            AND: [
                {
                    fullName: {
                        contains: titleFilter
                    },
                    garageId: garageId,
                    // status: ,
                },
            ],
        },
        include: {
            cars: true,
        },
    });
    return customers;
}