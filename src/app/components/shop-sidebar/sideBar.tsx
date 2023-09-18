import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';
import { SideBarItem } from './sidebarItem';
export async function SideBar() {
    const category_list = await getCategories();

    return (
        <div className="shop-sidebar">
            <div className="shop-widget">
                <div className="shop-search-form">
                    <h4 className="shop-widget-title">Search</h4>
                    <form action="#">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button type="button">
                                <i className="far fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="shop-widget">
                <h4 className="shop-widget-title">Category</h4>
                <ul>
                    {category_list.map((category: ICategory, index) => (
                        <SideBarItem category={category} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
