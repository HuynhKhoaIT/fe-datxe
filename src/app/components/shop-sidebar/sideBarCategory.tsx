import { getGarages } from '@/utils/garage';
import { IGarage } from '@/interfaces/garage';
import { SideBarGaraItem } from './sidebarGaraItem';
export async function SideBarCategory() {
    const garage_list = await getGarages();
    return (
        <div className="shop-sidebar">
            <div className="shop-widget">
                <h4 className="shop-widget-title">Chuyên gia</h4>
                <ul>
                    {garage_list.map((garage: IGarage, index) => (
                        <SideBarGaraItem garage={garage} key={index} />
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
