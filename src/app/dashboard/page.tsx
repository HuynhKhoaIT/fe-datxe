import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
export default function Dashboard() {
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
                            <div className="user-profile-wrapper">
                                <div className="row">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="dashboard-widget dashboard-widget-color-1">
                                            <div className="dashboard-widget-info">
                                                <h1>450</h1>
                                                <span>Active Listing</span>
                                            </div>
                                            <div className="dashboard-widget-icon">
                                                <i className="fal fa-list"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="dashboard-widget dashboard-widget-color-2">
                                            <div className="dashboard-widget-info">
                                                <h1>18.6k</h1>
                                                <span>Total Views</span>
                                            </div>
                                            <div className="dashboard-widget-icon">
                                                <i className="fal fa-eye"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="dashboard-widget dashboard-widget-color-3">
                                            <div className="dashboard-widget-info">
                                                <h1>1560</h1>
                                                <span>Total Listing</span>
                                            </div>
                                            <div className="dashboard-widget-icon">
                                                <i className="fal fa-layer-group"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="user-profile-card">
                                            <h4 className="user-profile-card-title">Recent Listing</h4>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Car Info</th>
                                                            <th>Brand</th>
                                                            <th>Publish</th>
                                                            <th>Price</th>
                                                            <th>Views</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="table-list-info">
                                                                    <a href="#">
                                                                        {/* <img src="assets/img/car/01.jpg" alt=""> */}
                                                                        <div className="table-ad-content">
                                                                            <h6>Mercedes Benz Car</h6>
                                                                            <span>Car ID: #123456</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>Ferrari</td>
                                                            <td>5 days ago</td>
                                                            <td>$50,650</td>
                                                            <td>350k+</td>
                                                            <td>
                                                                <span className="badge badge-success">Active</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="table-list-info">
                                                                    <a href="#">
                                                                        {/* <img src="assets/img/car/02.jpg" alt=""> */}
                                                                        <div className="table-ad-content">
                                                                            <h6>Mercedes Benz Car</h6>
                                                                            <span>Car ID: #123456</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>Ferrari</td>
                                                            <td>5 days ago</td>
                                                            <td>$50,650</td>
                                                            <td>350k+</td>
                                                            <td>
                                                                <span className="badge badge-success">Active</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="table-list-info">
                                                                    <a href="#">
                                                                        <img src="assets/img/car/03.jpg" alt="" />
                                                                        <div className="table-ad-content">
                                                                            <h6>Mercedes Benz Car</h6>
                                                                            <span>Car ID: #123456</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>Ferrari</td>
                                                            <td>5 days ago</td>
                                                            <td>$50,650</td>
                                                            <td>350k+</td>
                                                            <td>
                                                                <span className="badge badge-success">Active</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="table-list-info">
                                                                    <a href="#">
                                                                        <img src="assets/img/car/04.jpg" alt="" />
                                                                        <div className="table-ad-content">
                                                                            <h6>Mercedes Benz Car</h6>
                                                                            <span>Car ID: #123456</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>Ferrari</td>
                                                            <td>5 days ago</td>
                                                            <td>$50,650</td>
                                                            <td>350k+</td>
                                                            <td>
                                                                <span className="badge badge-success">Active</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="table-list-info">
                                                                    <a href="#">
                                                                        <img src="assets/img/car/05.jpg" alt="" />
                                                                        <div className="table-ad-content">
                                                                            <h6>Mercedes Benz Car</h6>
                                                                            <span>Car ID: #123456</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>Ferrari</td>
                                                            <td>5 days ago</td>
                                                            <td>$50,650</td>
                                                            <td>350k+</td>
                                                            <td>
                                                                <span className="badge badge-success">Active</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
