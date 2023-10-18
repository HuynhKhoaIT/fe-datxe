'use client';
import { getMyAccount } from '@/utils/user';
import { Orders } from '../components/dashboard/order/orders';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
export default async function Dashboard() {
    const { data: session } = useSession();
    if (session?.user?.token) {
        // const myAccount = await getMyAccount(session?.user?.token);
        console.log('token');
        console.log(session?.user?.token);
    }
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">{/* <ProfileSidebar myAccount={myAccount} /> */}</div>
                        <div className="col-lg-9">{/* <Orders /> */}</div>
                    </div>
                </div>
            </div>
            {/* <!-- user-profile end --> */}
        </main>
    );
}
