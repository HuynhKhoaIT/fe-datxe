import { getCategoriesFromDLBD } from '@/utils/category';

export const getCategoriesDlbd = async (profile: any) => {
    try {
        const data: any = await getCategoriesFromDLBD(profile?.session?.user?.garageId);
        return data;
    } catch (error) {
        console.error('error get categories');
    }
};
