
import { generateUUID } from "@/utils/until";
import prisma from "../prismadb";
export async function registerUser(json: any) {
  try {
    const user = await prisma.user.create({
      data: {
        id: Number(json.id),
        uuId: generateUUID(),
        fullName: json.fullName,
        email: json.email ?? '',
        phoneNumber: json.phoneNumber,
        sex: 'FEMALE',
        garageId: Number(json.garageId) ?? 2,
        status: 'PUBLIC',
        role: json.role ?? 'CUSTOMER'
      }
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
