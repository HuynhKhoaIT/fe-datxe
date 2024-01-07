import prisma from "../prismadb";

export async function getCategories() {
  try {
    const categories = await prisma.productCategory.findMany({
      take: 10,
    });
    return { categories };
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
