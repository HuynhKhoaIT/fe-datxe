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
            <div className="shop-widget">
                <h4 className="shop-widget-title">Parts Brand</h4>
                <ul>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="brand1" />
                            <label className="form-check-label" htmlFor="brand1">
                                {' '}
                                Audi
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="brand2" />
                            <label className="form-check-label" htmlFor="brand2">
                                {' '}
                                BMW
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="brand3" />
                            <label className="form-check-label" htmlFor="brand3">
                                {' '}
                                Ford
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="brand4" />
                            <label className="form-check-label" htmlFor="brand4">
                                {' '}
                                Tesla
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="brand5" />
                            <label className="form-check-label" htmlFor="brand5">
                                {' '}
                                Honda
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="shop-widget">
                <h4 className="shop-widget-title">Price Range</h4>
                <div className="price-range-box">
                    <div className="price-range-input">
                        <input type="text" id="price-amount" />
                    </div>
                    <div className="price-range"></div>
                </div>
            </div>
            <div className="shop-widget">
                <h4 className="shop-widget-title">Popular Tags</h4>
                <div className="shop-tags">
                    <a href="#">Car</a>
                    <a href="#">Parts</a>
                    <a href="#">Fuel</a>
                    <a href="#">Tire</a>
                    <a href="#">Light</a>
                </div>
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
