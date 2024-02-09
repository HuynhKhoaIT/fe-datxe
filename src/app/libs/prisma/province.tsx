import prisma from "../prismadb";
export async function getProvinces() {
    try {
        const rs = await prisma.provinces.findMany();
        return rs;
    }catch (error) {
        return { error };
    }
}
export async function getDistricts(provinceId : Number) {
    try {
        const rs = await prisma.districts.findMany(
            {
                where: {
                    province_id:  Number(provinceId)
                }
            }
        );
        return rs;
    }catch (error) {
        return { error };
    }
}

export async function getWards(districtId : Number) {
    try {
        const rs = await prisma.wards.findMany(
            {
                where: {
                    district_id:  Number(districtId)
                }
            }
        );
        return rs;
    }catch (error) {
        return { error };
    }
}