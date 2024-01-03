import { IProduct } from "../interfaces/product";
import prisma from "../prismadb";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 10,
    });
    return { products };
  } catch (error) {
    return { error };
  }
}

export async function createProduct(product: any) {
  try {
    const productFromDB = await prisma.product.create({ data: product });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateProduct(id: number, product: any) {
  try {
    const productFromDB = await prisma.product.update({
      where: { id: Number(id) },
      data: product,
    });
    return { product: productFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteProduct(id: number) {
  try {
    const product = await prisma.product.delete({ where: { id: Number(id) } });
    return { product };
  } catch (error) {
    return { error };
  }
}

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return { product };
  } catch (error) {
    return { error };
  }
}
