import { getMyAccount } from '@/utils/user';
import { Orders } from '../components/dashboard/order/orders';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import React, { useEffect } from 'react';
import axios from 'axios';
export default async function Dashboard() {
    const token = '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY';

    const myAccount = await getMyAccount(token);
    const abc = await fetch('http://localhost:3002/api/search?query=hello');
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
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
