import { ProfileSidebar } from '../components/profile-sidebar/sidebar';

export default function ProfileListing() {
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
                                <div className="user-profile-card profile-ad">
                                    <div className="user-profile-card-header">
                                        <h4 className="user-profile-card-title">My Listing</h4>
                                        <div className="user-profile-card-header-right">
                                            <div className="user-profile-search">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search..."
                                                    />
                                                    <i className="far fa-search"></i>
                                                </div>
                                            </div>
                                            <a href="#" className="theme-btn">
                                                <span className="far fa-plus-circle"></span>Add Listing
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
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
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="table-list-info">
                                                                <a href="#">
                                                                    <img src="assets/img/car/01.jpg" alt="" />
                                                                    <div className="table-list-content">
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
                                                        <td>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Details"
                                                            >
                                                                <i className="far fa-eye"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit"
                                                            >
                                                                <i className="far fa-pen"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-danger btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Delete"
                                                            >
                                                                <i className="far fa-trash-can"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="table-list-info">
                                                                <a href="#">
                                                                    <img src="assets/img/car/02.jpg" alt="" />
                                                                    <div className="table-list-content">
                                                                        <h6>Mercedes Benz Car</h6>
                                                                        <span>Car ID: #123456</span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>Ferrari</td>
                                                        <td>5 days ago</td>
                                                        <td>$50,650</td>
                                                        <td>0</td>
                                                        <td>
                                                            <span className="badge badge-info">Pending</span>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Details"
                                                            >
                                                                <i className="far fa-eye"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit"
                                                            >
                                                                <i className="far fa-pen"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-danger btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Delete"
                                                            >
                                                                <i className="far fa-trash-can"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="table-list-info">
                                                                <a href="#">
                                                                    <img src="assets/img/car/03.jpg" alt="" />
                                                                    <div className="table-list-content">
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
                                                            <span className="badge badge-primary">Sold</span>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Details"
                                                            >
                                                                <i className="far fa-eye"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit"
                                                            >
                                                                <i className="far fa-pen"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-danger btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Delete"
                                                            >
                                                                <i className="far fa-trash-can"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="table-list-info">
                                                                <a href="#">
                                                                    <img src="assets/img/car/04.jpg" alt="" />
                                                                    <div className="table-list-content">
                                                                        <h6>Mercedes Benz Car</h6>
                                                                        <span>Car ID: #123456</span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>Ferrari</td>
                                                        <td>5 days ago</td>
                                                        <td>$50,650</td>
                                                        <td>0</td>
                                                        <td>
                                                            <span className="badge badge-danger">Expired</span>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Details"
                                                            >
                                                                <i className="far fa-eye"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit"
                                                            >
                                                                <i className="far fa-pen"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-danger btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Delete"
                                                            >
                                                                <i className="far fa-trash-can"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="table-list-info">
                                                                <a href="#">
                                                                    <img src="assets/img/car/05.jpg" alt="" />
                                                                    <div className="table-list-content">
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
                                                        <td>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Details"
                                                            >
                                                                <i className="far fa-eye"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit"
                                                            >
                                                                <i className="far fa-pen"></i>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-danger btn-sm rounded-2"
                                                                data-bs-toggle="tooltip"
                                                                title="Delete"
                                                            >
                                                                <i className="far fa-trash-can"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <!-- pagination --> */}
                                        <div className="pagination-area">
                                            <div aria-label="Page navigation example">
                                                <ul className="pagination my-3">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">
                                                                <i className="far fa-angle-double-left"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a className="page-link" href="#">
                                                            1
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">
                                                            2
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">
                                                            3
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">
                                                                <i className="far fa-angle-double-right"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
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
