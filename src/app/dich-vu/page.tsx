import React from 'react';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Sort } from '../components/shop-sort/sort';
import ServiceData from '../components/service/serviceData';
import { getServices } from '@/utils/service';
export default async function Shop() {
    const product_data = await getServices();
    return (
        <main className="main">
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <Sort />
                            <ServiceData product_data={product_data} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
