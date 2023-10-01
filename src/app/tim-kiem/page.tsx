import { getProductsSearch } from '@/utils/product';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import { Pagination } from '../components/pagination-area/pagination-area';
import SearchData from '../components/search/SearchData';

export default async function Search() {
    return (
        <main className="main">
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <div className="col-md-12">
                                <Sort />
                            </div>
                            <SearchData />
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
