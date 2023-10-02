import { getMyAccount } from '@/utils/user';
import { Orders } from '../components/dashboard/order/orders';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import React from 'react';
export default async function Dashboard() {
    const token = '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY';
    const myAccount = await getMyAccount(token);
    return (
        <main className="main">
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar myAccount={myAccount} />
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
