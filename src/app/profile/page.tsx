import { getMyAccount } from '@/utils/user';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import ProfileChangePassword from '../components/profile/ProfileChangePassword';
import StoreInfo from '../components/profile/StoreInfo';
import { Suspense } from 'react';

export default async function Profile() {
    return (
        <main className="main">
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar />
                        </div>
                        <div className="col-lg-9">
                            <div className="user-profile-wrapper">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <Suspense fallback={<p>Loading feed...</p>}>{/* <ProfileInfo /> */}</Suspense>
                                    </div>
                                    <div className="col-lg-5">
                                        <ProfileChangePassword />
                                    </div>
                                    <div className="col-lg-12">
                                        <StoreInfo />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
