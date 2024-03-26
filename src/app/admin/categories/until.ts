import { getCategoriesFromDLBD } from '@/utils/category';
import axios from 'axios';

export async function getCategories(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/product-category`);

        return res.data;
    } catch (error) {
        console.error('error:', error);
    }
}

export const getCategoriesDlbd = async (profile: any) => {
    try {
        const data: any = await getCategoriesFromDLBD(profile?.session?.user?.garageId);
        return data;
    } catch (error) {
        console.error('error get categories');
    }
};
