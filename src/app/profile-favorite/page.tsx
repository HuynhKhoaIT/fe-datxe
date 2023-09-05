import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
export default function ProfileFavorite() {
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
                                <div className="user-profile-card profile-favorite">
                                    <h4 className="user-profile-card-title">My Favorites</h4>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <span className="car-status status-1">Used</span>
                                                    <img src="assets/img/car/01.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">Mercedes Benz Car</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$45,620</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <img src="assets/img/car/02.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">Yellow Ferrari 458</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$90,250</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <img src="assets/img/car/03.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">Black Audi Q7</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$44,350</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <span className="car-status status-2">New</span>
                                                    <img src="assets/img/car/04.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">BMW Sports Car</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$78,760</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <span className="car-status status-1">Used</span>
                                                    <img src="assets/img/car/05.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">White Tesla Car</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$64,230</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="car-item">
                                                <div className="car-img">
                                                    <span className="car-status status-2">New</span>
                                                    <img src="assets/img/car/06.jpg" alt="" />
                                                    <div className="car-btns">
                                                        <a href="#">
                                                            <i className="far fa-xmark"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-heart"></i>
                                                        </a>
                                                        <a href="#">
                                                            <i className="far fa-arrows-repeat"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="car-content">
                                                    <div className="car-top">
                                                        <h4>
                                                            <a href="#">White Nissan Car</a>
                                                        </h4>
                                                        <div className="car-rate">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <span>5.0 (58.5k Review)</span>
                                                        </div>
                                                    </div>
                                                    <ul className="car-list">
                                                        <li>
                                                            <i className="far fa-steering-wheel"></i>Automatic
                                                        </li>
                                                        <li>
                                                            <i className="far fa-car"></i>Model: 2023
                                                        </li>
                                                        <li>
                                                            <i className="far fa-road"></i>10.15km / 1-litre
                                                        </li>
                                                        <li>
                                                            <i className="far fa-gas-pump"></i>Hybrid
                                                        </li>
                                                    </ul>
                                                    <div className="car-footer">
                                                        <span className="car-price">$34,540</span>
                                                        <a href="#" className="theme-btn">
                                                            <span className="far fa-eye"></span>Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
            {/* <!-- user-profile end --> */}
        </main>
    );
}
