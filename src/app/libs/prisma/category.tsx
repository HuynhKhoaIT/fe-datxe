
import prisma from "../prismadb";

export async function getCategories(request: any) {
  try {
    let garageId = 1;
    const session = request.session;
    if(session){
      garageId = session?.user?.garageId;
    }
    const productCategory = await prisma.productCategory.findMany({
      take: 10,
      where: {
          AND: [
              {
                  status: {
                      not: 'DELETE',
                  },
                  garageId:{
                    in: [Number(process.env.GARAGE_DEFAULT),garageId]
                  }
              },
          ],
      },
  });
    return productCategory ;
  } catch (error) {
    return { error };
  }
}

export async function createCategory(category: any) {
  try {
    const categoryFromDB = await prisma.productCategory.create({
      data: category,
    });
    return { category: categoryFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateCategory(id: number, category: any) {
  try {
    const categoryFromDB = await prisma.productCategory.update({
      where: { id: Number(id) },
      data: category,
    });
    return { product: categoryFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteCategory(id: number) {
  try {
    const category = await prisma.productCategory.delete({
      where: { id: Number(id) },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}

export async function getCategoryById(id: number) {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: Number(id) },
    });
    return { category };
  } catch (error) {
    return { error };
  }
}

export async function syncCategoryFromDlbd(catData: any,garageId: number){
  const cat = await prisma.productCategory.findFirst({
    where:{
      title: catData.name,
      garageId: garageId,
      status: {
        not: "DELETE"
      }
    }
  })
  if(cat){
    return cat;    
  }
  const c = await prisma.productCategory.create({
    data:{
      title: catData.name,
      garageId: garageId,
      slug: catData.name,
      image: catData.thumbnail
    }
  })
  return c;
}
