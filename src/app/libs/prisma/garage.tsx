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
            }
        });
        return garages;
    }catch(error){
        return {error}
    }
}

export async function createGarage(data: any) {
    try {
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
            },
            include: {
                cars: true,
            },
        });
        return garage;
    }catch (error) {
    return { error };
  }
}