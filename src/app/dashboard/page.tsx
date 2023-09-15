import { Orders } from '../components/dashboard/order/orders';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import React, { useEffect, useState } from 'react';
import { getOrders } from '@/utils/order';
const Dashboard = () => {
    return (
        <main className="main">
            {/* <!-- user-profile --> */}
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar />
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
};
export default Dashboard;
