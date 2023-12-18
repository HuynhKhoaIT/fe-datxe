import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';
import { SideBarItem } from './sidebarItem';
export async function SideBar() {
    const category_list = await getCategories();
    return (
        <div className="shop-sidebar">
            <div className="shop-widget">
                <h4 className="shop-widget-title">Category</h4>
                <ul>
                    {category_list.map((category: ICategory, index) => (
                        <SideBarItem category={category} key={index} />
                    ))}
                </ul>
            </div>

            <div className="widget-banner mt-30 mb-50">
                <div className="banner-content">
                    <h3>
                        Get <span>35% Off</span> On All Our Products
                    </h3>
                    <a href="#" className="theme-btn">
                        Buy Now<i className="fas fa-arrow-right-long"></i>{' '}
                    </a>
                </div>
            </div>
        </div>
    );
}
