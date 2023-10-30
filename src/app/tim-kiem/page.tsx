import { getProductsSearch } from '@/utils/product';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import SearchData from '../components/search/SearchData';

export default async function Search() {
    return <SearchData />;
}
