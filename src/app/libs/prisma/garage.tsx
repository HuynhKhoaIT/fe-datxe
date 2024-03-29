import { createBitlyGarage } from "@/utils/garage";
import prisma from "../prismadb";
import { randomString } from "@/utils";

export async function getGarages(requestData: any) {
  try {
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;

    if (page) {
      currentPage = Number(page);
    }
    if (limit) {
      take = Number(limit);
    } else {
      limit = 10;
    }
    let garageId = 0;
    if(requestData.garageId){
      garageId = Number(requestData.garageId);
    }
    const skip = take * (currentPage - 1);
    const [data, total] = await prisma.$transaction([
      prisma.garage.findMany({
        take: take,
        skip: skip,
        orderBy: {
          id: "desc",
        },
        where: {
          AND: [
            {
              status: {
                not: "DELETE",
              },
              routeId: garageId
            },
          ],
        },
        include: {
          amenities: {
            include: {
              amenities: true,
            },
          },
        },
      }),
      prisma.garage.count(),
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 201,
    };
  } catch (error) {
    return { error };
  }
}

export async function getGarageIdByDLBDID(dlbdId:number) {
  const rs = await prisma.garage.findFirst({
    where:{
        routeId: dlbdId,
        status: {
          not: 'DELETE'
        }
    }
  });
  if(rs){
    return rs.id;
  }
  return 0;
}


export async function showGarage(id:number) {
    const garage = await prisma.garage.findFirst({
        where:{
            id: Number(id),
        },
        include: {
          amenities: {
              include: {
                  amenities: true,
              },
          },
      },
    });
    return garage;
}

export async function getGarageByDlbdId(garageId: number){
    return await prisma.garage.findFirst({
        where:{
            routeId: garageId,
            status: 'PUBLIC'
        }
    });
}

export async function createGarage(data: any) {
  try {
    let amenitiesArr: any = [];
    if (data.amenities) {
      data.amenities.forEach(function (id: number) {
        amenitiesArr.push({
          assignedBy: "Admin",
          assignedAt: new Date(),
          amenities: {
            connect: {
              id: Number(id.toString()),
            },
          },
        });
      });
    }
    const code = await getRandomCodeForGarage();
    const garage = await prisma.garage.create({
      data: {
        routeId: Number(data.routeId),
        code: code ?? '',
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
          create: amenitiesArr,
        },
      },
      include: {
        cars: true,
        amenities: true,
      },
    });
    if(garage){
      const createBitly = await createBitlyGarage(garage);
      if(createBitly){
        await  prisma.garage.update({
          where: {
            id: Number(garage.id),
          },
          data: {
            bitlyUrl: createBitly.id
          },
        })
      }
    }
    return garage;
  } catch (error) {
    return { error };
  }
}

export async function updateGarage(id: number, data: any) {
  try {
    let updateData = {
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
        deleteMany: {},
        create: data.amenities.map((id: number) => ({
          assignedBy: "Admin",
          assignedAt: new Date(),
          amenities: {
            connect: {
              id: Number(id),
            },
          },
        })),
      },
    };
    const updatedPost = await prisma.garage.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });
    return { data: updatedPost };
  } catch (error) {
    return { error };
  }
}

export async function deleteGarage(id: number) {
  try {
    const garage = await prisma.garage.delete({
      where: { id: Number(id) },
    });
    return { garage };
  } catch (error) {
    return { error };
  }
}

export async function getRandomCodeForGarage() {
  let str = randomString(5).toLocaleUpperCase();
  const c = await getGarageByCode(str);
  if(!c){
      return str;
  }
  await getRandomCodeForGarage();
}

export async function getGarageByCode(code: string){
  try {
      const rs = await prisma.garage.findFirst({
          where: {
              code: code,
          }
      });
      return rs;
  } catch (error) {
      return { error };
  }
  
}