import prisma from "../prismadb";

export async function getGarages(data: any) {
    try {
        const garages = await prisma.garage.findMany({
            where: {
                AND: [
                    {
                        status: {
                            not: 'DELETE',
                        },
                    },
                ],
            },
            include:{
                amenities:{
                    include: {
                        amenities: true
                    }
                }
            }
        });
        return garages;
    }catch(error){
        return {error}
    }
}

export async function createGarage(data: any) {
    try {
        let amenitiesArr: any = [];
        if (data.amenities) {
            data.amenities.forEach(function (id: number) {
                amenitiesArr.push({
                    assignedBy: 'Admin',
                    assignedAt: new Date(),
                    amenities:{
                        connect: {
                            id: Number(id.toString()),
                        }
                    }
                    
                });
            });
        } 
        const garage = await prisma.garage.create({
            data: {
                routeId: Number(data.routeId),
                code: data.code,
                name: data.name,
                shortName: data.shortName,
                logo: data.logo,
                email: data.email,
                phoneNumber: data.phoneNumber,
                website: data.website,
                address: data.address,
                status: data.status,
                description: data.description,
                amenities: {
                    create: amenitiesArr
                },
            },
            include: {
                cars: true,
                amenities:true
            },
        });
        return garage;
    }catch (error) {
    return { error };
  }
}