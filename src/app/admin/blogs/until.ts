import axios from 'axios';

export async function getBlogs(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/posts?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}
