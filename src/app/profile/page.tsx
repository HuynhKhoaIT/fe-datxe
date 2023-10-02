import { getMyAccount } from '@/utils/user';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
export default async function Profile() {
    const myAccount = await getMyAccount('1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY');

    return (
        <main className="main">
            {/* <!-- user-profile --> */}
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar myAccount={myAccount} />
                        </div>
                        <div className="col-lg-9">
                            <div className="user-profile-wrapper">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="user-profile-card">
                                            <h4 className="user-profile-card-title">Profile Info</h4>
                                            <div className="user-profile-form">
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>First Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="Antoni"
                                                                    placeholder="First Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Last Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="Jonson"
                                                                    placeholder="Last Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="antoni@example.com"
                                                                    placeholder="Email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Phone</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="+2 134 562 458"
                                                                    placeholder="Phone"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Address</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="New York, USA"
                                                                    placeholder="Address"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="theme-btn my-3">
                                                        <span className="far fa-user"></span> Save Changes
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="user-profile-card">
                                            <h4 className="user-profile-card-title">Change Password</h4>
                                            <div className="col-lg-12">
                                                <div className="user-profile-form">
                                                    <form action="#">
                                                        <div className="form-group">
                                                            <label>Old Password</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Old Password"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>New Password</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="New Password"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Re-Type Password</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Re-Type Password"
                                                            />
                                                        </div>
                                                        <button type="button" className="theme-btn my-3">
                                                            <span className="far fa-key"></span> Change Password
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="user-profile-card profile-store">
                                            <h4 className="user-profile-card-title">Store Info</h4>
                                            <div className="col-lg-12">
                                                <div className="user-profile-form">
                                                    <form action="#">
                                                        <div className="form-group">
                                                            <div className="store-logo-preview">
                                                                <img src="assets/img/store/logo.jpg" alt="" />
                                                            </div>
                                                            <input type="file" className="store-file" />
                                                            <button type="button" className="theme-btn store-upload">
                                                                <span className="far fa-upload"></span> Upload Logo
                                                            </button>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="store-banner-preview">
                                                                <img src="assets/img/store/banner.jpg" alt="" />
                                                            </div>
                                                            <input type="file" className="store-file" />
                                                            <button
                                                                type="button"
                                                                className="theme-btn store-upload mb-4"
                                                            >
                                                                <span className="far fa-upload"></span> Upload Banner
                                                            </button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Store Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value="Automotive Car"
                                                                placeholder="Store Name"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Contact Phone Number</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value="+2 123 654 7898"
                                                                placeholder="Contact Phone Number"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Contact Email</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value="antoni@example.com"
                                                                placeholder="Contact Email"
                                                            />
                                                        </div>
                                                        <button type="button" className="theme-btn my-3">
                                                            <span className="far fa-save"></span> Save Changes
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- user-profile end --> */}
        </main>
    );
}
