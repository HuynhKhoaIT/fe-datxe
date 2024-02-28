import prisma from "../prismadb";
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