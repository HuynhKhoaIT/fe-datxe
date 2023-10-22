import { Orders } from '@/app/components/dashboard/order/orders';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
import React from 'react';
export default async function OrderPage() {
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar page="orders" />
                        </div>
                        <div className="col-lg-9">
                            <Orders />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- user-profile end --> */}
        </main>
    );
}
