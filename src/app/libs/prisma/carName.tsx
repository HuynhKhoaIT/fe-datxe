import prisma from "../prismadb";

export async function getCarModes(requestData:any) {
    let parentId = 0;
    if(requestData.parentId){
        parentId = parseInt(requestData.parentId)
    }
    const rs = await prisma.carModels.findMany({
        where: {
            parentId: parentId,
        },
        orderBy: {
            title: 'asc',
        },
    });
    return rs;
}
export async function getCarNameById(id: Number) {
    try {
        const rs = await prisma.carModels.findFirst({
            where:{
                id: Number(id)
            }
        });
        return rs;
    } catch (error) {
      return {error} ;
    }
  }