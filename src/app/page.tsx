import './assets/css/nice-select.min.css';
export default function Home() {
    return (
        <main className="main">
            <div className="hero-section">
                <div className="hero-slider owl-carousel owl-theme">
                    <div className="hero-single" style={{ background: `url(assets/img/slider/slider-1.jpg)` }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-12 col-lg-6">
                                    <div className="hero-content">
                                        <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">
                                            Welcome To Motex!
                                        </h6>
                                        <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                            Best Way To Find Your <span>Dream</span> Car
                                        </h1>
                                        <p data-animation="fadeInLeft" data-delay=".75s">
                                            There are many variations of passages orem psum available but the majority
                                            have suffered alteration in some form by injected humour.
                                        </p>
                                        <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                                            <a href="#" className="theme-btn">
                                                About More<i className="fas fa-arrow-right-long"></i>
                                            </a>
                                            <a href="#" className="theme-btn theme-btn2">
                                                Learn More<i className="fas fa-arrow-right-long"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="hero-right">
                                        <div className="hero-img">
                                            <img
                                                src="assets/img/slider/hero-1.png"
                                                alt=""
                                                data-animation="fadeInRight/"
                                                data-delay=".25s"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="hero-single" style={{background: `url(assets/img/slider/slider-2.jpg)`}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-12 col-lg-6">
                                <div className="hero-content">
                                    <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">Welcome To
                                        Motex!</h6>
                                    <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                        Best Way To Find Your <span>Dream</span> Car
                                    </h1>
                                    <p data-animation="fadeInLeft" data-delay=".75s">
                                        There are many variations of passages orem psum available but the majority have
                                        suffered alteration in some form by injected humour.
                                    </p>
                                    <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                                        <a href="#" className="theme-btn">About More<i
                                                className="fas fa-arrow-right-long"></i></a>
                                        <a href="#" className="theme-btn theme-btn2">Learn More<i
                                                className="fas fa-arrow-right-long"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="hero-right">
                                    <div className="hero-img">
                                        <img src="assets/img/slider/hero-2.png" alt="" data-animation="fadeInRight/"
                                            data-delay=".25s"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-single" style={{background: `url(assets/img/slider/slider-3.jpg)`}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-12 col-lg-6">
                                <div className="hero-content">
                                    <h6 className="hero-sub-title" data-animation="fadeInUp" data-delay=".25s">Welcome To
                                        Motex!</h6>
                                    <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                        Best Way To Find Your <span>Dream</span> Car
                                    </h1>
                                    <p data-animation="fadeInLeft" data-delay=".75s">
                                        There are many variations of passages orem psum available but the majority have
                                        suffered alteration in some form by injected humour.
                                    </p>
                                    <div className="hero-btn" data-animation="fadeInUp" data-delay="1s">
                                        <a href="#" className="theme-btn">About More<i
                                                className="fas fa-arrow-right-long"></i></a>
                                        <a href="#" className="theme-btn theme-btn2">Learn More<i
                                                className="fas fa-arrow-right-long"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="hero-right">
                                    <div className="hero-img">
                                        <img src="assets/img/slider/hero-4.png" alt="" data-animation="fadeInRight/"
                                            data-delay=".25s"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
            {/* <!-- hero slider end --> */}

            {/* <!-- find car form --> */}
            <div className="find-car">
                <div className="container">
                    <div className="find-car-form">
                        <h4 className="find-car-title">Let's Find Your Perfect Car</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Car Condition</label>
                                        <select className="select">
                                            <option value="1">All Status</option>
                                            <option value="2">New Car</option>
                                            <option value="3">Used Car</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Brand Name</label>
                                        <select className="select">
                                            <option value="1">All Brand</option>
                                            <option value="2">BMW</option>
                                            <option value="3">Ferrari</option>
                                            <option value="4">Marcediz Benz</option>
                                            <option value="5">Hyundai</option>
                                            <option value="6">Nissan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Car Model</label>
                                        <select className="select">
                                            <option value="1">All Model</option>
                                            <option value="2">3-Series </option>
                                            <option value="3">Carrera</option>
                                            <option value="4">G-TR</option>
                                            <option value="3">Macan</option>
                                            <option value="3">N-Series</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Choose Year</label>
                                        <select className="select">
                                            <option value="1">All Year</option>
                                            <option value="2">2023</option>
                                            <option value="3">2022</option>
                                            <option value="4">2021</option>
                                            <option value="5">2020</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Choose Milieage</label>
                                        <select className="select">
                                            <option value="1">All Milieage</option>
                                            <option value="2">2000 Miles</option>
                                            <option value="3">3000 Miles</option>
                                            <option value="4">4000 Miles</option>
                                            <option value="5">5000 Miles</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Price Range</label>
                                        <select className="select">
                                            <option value="1">All Price</option>
                                            <option value="2">$1,000 - $5,000</option>
                                            <option value="3">$5,000 - $10,000</option>
                                            <option value="4">$15,000 - $20,000</option>
                                            <option value="5">$20,000 - $25,000</option>
                                            <option value="6">$25,000 - $30,000</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Body Type</label>
                                        <select className="select">
                                            <option value="1">All Body Type</option>
                                            <option value="2">Sedan</option>
                                            <option value="5">Compact</option>
                                            <option value="3">Coupe</option>
                                            <option value="4">Wagon</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3 align-self-end">
                                    <button className="theme-btn" type="submit">
                                        <span className="far fa-search"></span> Find Your Car
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="about-area py-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                                <div className="about-img">
                                    <img src="assets/img/about/01.png" alt="" />
                                </div>
                                <div className="about-experience">
                                    <div className="about-experience-icon">
                                        <i className="flaticon-car"></i>
                                    </div>
                                    <b>
                                        30 Years Of <br /> Quality Service
                                    </b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-right wow fadeInRight" data-wow-delay=".25s">
                                <div className="site-heading mb-3">
                                    <span className="site-title-tagline justify-content-start">
                                        <i className="flaticon-drive"></i> About Us
                                    </span>
                                    <h2 className="site-title">
                                        World Largest <span>Car Dealer</span> Marketplace.
                                    </h2>
                                </div>
                                <p className="about-text">
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration in some form, by injected humour.
                                </p>
                                <div className="about-list-wrapper">
                                    <ul className="about-list list-unstyled">
                                        <li>At vero eos et accusamus et iusto odio.</li>
                                        <li>Established fact that a reader will be distracted.</li>
                                        <li>Sed ut perspiciatis unde omnis iste natus sit.</li>
                                    </ul>
                                </div>
                                <a href="about.html" className="theme-btn mt-4">
                                    Discover More<i className="fas fa-arrow-right-long"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="counter-area pt-30 pb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon">
                                    <i className="flaticon-car-rental"></i>
                                </div>
                                <div>
                                    <span className="counter" data-count="+" data-to="500" data-speed="3000">
                                        500
                                    </span>
                                    <h6 className="title">+ Available Cars </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon">
                                    <i className="flaticon-car-key"></i>
                                </div>
                                <div>
                                    <span className="counter" data-count="+" data-to="900" data-speed="3000">
                                        900
                                    </span>
                                    <h6 className="title">+ Happy Clients</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon">
                                    <i className="flaticon-screwdriver"></i>
                                </div>
                                <div>
                                    <span className="counter" data-count="+" data-to="1500" data-speed="3000">
                                        1500
                                    </span>
                                    <h6 className="title">+ Team Workers</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon">
                                    <i className="flaticon-review"></i>
                                </div>
                                <div>
                                    <span className="counter" data-count="+" data-to="30" data-speed="3000">
                                        30
                                    </span>
                                    <h6 className="title">+ Years Of Experience</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="car-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> New Arrivals
                                </span>
                                <h2 className="site-title">
                                    Let's Check Latest <span>Cars</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="car-img">
                                    <span className="car-status status-1">Used</span>
                                    <img src="assets/img/car/01.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="car-img">
                                    <img src="assets/img/car/02.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="car-img">
                                    <img src="assets/img/car/03.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay="1s">
                                <div className="car-img">
                                    <span className="car-status status-2">New</span>
                                    <img src="assets/img/car/04.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="car-img">
                                    <span className="car-status status-1">Used</span>
                                    <img src="assets/img/car/05.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="car-img">
                                    <span className="car-status status-2">New</span>
                                    <img src="assets/img/car/06.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
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
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="car-img">
                                    <img src="assets/img/car/07.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <a href="#">Mercedes Benz Suv</a>
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
                                        </li>
                                        <li>
                                            <i className="far fa-gas-pump"></i>Hybrid
                                        </li>
                                    </ul>
                                    <div className="car-footer">
                                        <span className="car-price">$75,820</span>
                                        <a href="#" className="theme-btn">
                                            <span className="far fa-eye"></span>Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <div className="car-item wow fadeInUp" data-wow-delay="1s">
                                <div className="car-img">
                                    <img src="assets/img/car/08.jpg" alt="" />
                                    <div className="car-btns">
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
                                            <a href="#">Red Hyundai Car</a>
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
                                            <i className="far fa-road"></i>10.15km / 1-litre
                                        </li>
                                        <li>
                                            <i className="far fa-car"></i>Model: 2023
                                        </li>
                                        <li>
                                            <i className="far fa-gas-pump"></i>Hybrid
                                        </li>
                                    </ul>
                                    <div className="car-footer">
                                        <span className="car-price">$25,620</span>
                                        <a href="#" className="theme-btn">
                                            <span className="far fa-eye"></span>Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <a href="#" className="theme-btn">
                            Load More <i className="far fa-arrow-rotate-right"></i>{' '}
                        </a>
                    </div>
                </div>
            </div>

            <div className="car-category py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Car Category
                                </span>
                                <h2 className="site-title">
                                    Car By Body <span>Types</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="category-img">
                                    <img src="assets/img/category/01.png" alt="" />
                                </div>
                                <h5>Sedan</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="category-img">
                                    <img src="assets/img/category/02.png" alt="" />
                                </div>
                                <h5>Compact</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="category-img">
                                    <img src="assets/img/category/03.png" alt="" />
                                </div>
                                <h5>Convertible</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1s">
                                <div className="category-img">
                                    <img src="assets/img/category/04.png" alt="" />
                                </div>
                                <h5>SUV</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1.25s">
                                <div className="category-img">
                                    <img src="assets/img/category/05.png" alt="" />
                                </div>
                                <h5>Crossover</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1.50s">
                                <div className="category-img">
                                    <img src="assets/img/category/06.png" alt="" />
                                </div>
                                <h5>Wagon</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="category-img">
                                    <img src="assets/img/category/07.png" alt="" />
                                </div>
                                <h5>Sports</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="category-img">
                                    <img src="assets/img/category/08.png" alt="" />
                                </div>
                                <h5>Pickup</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="category-img">
                                    <img src="assets/img/category/09.png" alt="" />
                                </div>
                                <h5>Family MPV</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1s">
                                <div className="category-img">
                                    <img src="assets/img/category/10.png" alt="" />
                                </div>
                                <h5>Coupe</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1.25s">
                                <div className="category-img">
                                    <img src="assets/img/category/11.png" alt="" />
                                </div>
                                <h5>Electric</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <a href="#" className="category-item wow fadeInUp" data-wow-delay="1.50s">
                                <div className="category-img">
                                    <img src="assets/img/category/12.png" alt="" />
                                </div>
                                <h5>Luxury</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="video-area pb-120">
                <div className="container-fluid px-0">
                    <div className="video-content">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="video-wrapper">
                                    <a
                                        className="play-btn popup-youtube"
                                        href="https://www.youtube.com/watch?v=ckHzmP1evNU"
                                    >
                                        <i className="fas fa-play"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- video area end --> */}

            {/* <!-- car dealer --> */}
            <div className="car-dealer pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Car Dealers
                                </span>
                                <h2 className="site-title">
                                    Best Dealers In <span>Your City</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">25 Listing</span>
                                    <img src="assets/img/dealer/01.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Automotive Gear</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">35 Listing</span>
                                    <img src="assets/img/dealer/02.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Keithson Car</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">15 Listing</span>
                                    <img src="assets/img/dealer/03.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Superious Automotive</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay="1s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">20 Listing</span>
                                    <img src="assets/img/dealer/04.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Racing Gear Car</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">19 Listing</span>
                                    <img src="assets/img/dealer/05.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Car Showromio</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">40 Listing</span>
                                    <img src="assets/img/dealer/06.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Fastspeedio Car</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">59 Listing</span>
                                    <img src="assets/img/dealer/07.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Star AutoMall</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="dealer-item wow fadeInUp" data-wow-delay="1s">
                                <div className="dealer-img">
                                    <span className="dealer-listing">28 Listing</span>
                                    <img src="assets/img/dealer/08.png" alt="" />
                                </div>
                                <div className="dealer-content">
                                    <h4>
                                        <a href="#">Superspeed Auto</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <i className="far fa-location-dot"></i> 25/B Milford Road, New York
                                        </li>
                                        <li>
                                            <i className="far fa-phone"></i>{' '}
                                            <a href="tel:+21236547898">+2 123 654 7898</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- car dealer end--> */}

            {/* <!-- choose area --> */}
            <div className="choose-area py-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="choose-content">
                                <div className="site-heading wow fadeInDown" data-wow-delay=".25s">
                                    <span className="site-title-tagline text-white justify-content-start">
                                        <i className="flaticon-drive"></i> Why Choose Us
                                    </span>
                                    <h2 className="site-title text-white mb-10">
                                        We are dedicated <span>to provide</span> quality service
                                    </h2>
                                    <p className="text-white">
                                        There are many variations of passages available but the majority have suffered
                                        alteration in some form going to use a passage by injected humour randomised
                                        words which don't look even slightly believable.
                                    </p>
                                </div>
                                <div className="choose-img wow fadeInUp" data-wow-delay=".25s">
                                    <img src="assets/img/choose/01.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="choose-content-wrapper wow fadeInRight" data-wow-delay=".25s">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 mt-lg-5">
                                        <div className="choose-item">
                                            <span className="choose-count">01</span>
                                            <div className="choose-item-icon">
                                                <i className="flaticon-car"></i>
                                            </div>
                                            <div className="choose-item-info">
                                                <h3>Best Quality Cars</h3>
                                                <p>
                                                    There are many variations of the passages available but the majo
                                                    have suffered fact that reader will be dist alteration.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="choose-item mb-lg-0">
                                            <span className="choose-count">03</span>
                                            <div className="choose-item-icon">
                                                <i className="flaticon-drive-thru"></i>
                                            </div>
                                            <div className="choose-item-info">
                                                <h3>Popular Brands</h3>
                                                <p>
                                                    There are many variations of the passages available but the majo
                                                    have suffered fact that reader will be dist alteration.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="choose-item">
                                            <span className="choose-count">02</span>
                                            <div className="choose-item-icon">
                                                <i className="flaticon-chauffeur"></i>
                                            </div>
                                            <div className="choose-item-info">
                                                <h3>Certified Mechanics</h3>
                                                <p>
                                                    There are many variations of the passages available but the majo
                                                    have suffered fact that reader will be dist alteration.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="choose-item mb-lg-0">
                                            <span className="choose-count">04</span>
                                            <div className="choose-item-icon">
                                                <i className="flaticon-online-payment"></i>
                                            </div>
                                            <div className="choose-item-info">
                                                <h3>Reasonable Price</h3>
                                                <p>
                                                    There are many variations of the passages available but the majo
                                                    have suffered fact that reader will be dist alteration.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- choose area end --> */}

            {/* <!-- car brand --> */}
            <div className="car-brand py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Popular Brands
                                </span>
                                <h2 className="site-title">
                                    Our Top Quality <span>Brands</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/01.png" alt="" />
                                </div>
                                <h5>Ferrari</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/02.png" alt="" />
                                </div>
                                <h5>Hyundai</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/03.png" alt="" />
                                </div>
                                <h5>Mercedes Benz</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/04.png" alt="" />
                                </div>
                                <h5>Toyota</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.25s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/05.png" alt="" />
                                </div>
                                <h5>BMW</h5>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.50s">
                                <div className="brand-img">
                                    <img src="assets/img/brand/06.png" alt="" />
                                </div>
                                <h5>Nissan</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- car brand end--> */}

            {/* <!-- testimonial area --> */}
            <div className="testimonial-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Testimonials
                                </span>
                                <h2 className="site-title">
                                    What Our Client <span>Say's</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-slider owl-carousel owl-theme">
                        <div className="testimonial-single">
                            <div className="testimonial-content">
                                <div className="testimonial-author-img">
                                    <img src="assets/img/testimonial/01.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Sylvia H Green</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <span className="testimonial-quote-icon">
                                    <i className="flaticon-quote"></i>
                                </span>
                                <p>
                                    There are many variations of passages available but the majority have suffered to
                                    the alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <div className="testimonial-single">
                            <div className="testimonial-content">
                                <div className="testimonial-author-img">
                                    <img src="assets/img/testimonial/02.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Gordo Novak</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <span className="testimonial-quote-icon">
                                    <i className="flaticon-quote"></i>
                                </span>
                                <p>
                                    There are many variations of passages available but the majority have suffered to
                                    the alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <div className="testimonial-single">
                            <div className="testimonial-content">
                                <div className="testimonial-author-img">
                                    <img src="assets/img/testimonial/03.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Reid E Butt</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <span className="testimonial-quote-icon">
                                    <i className="flaticon-quote"></i>
                                </span>
                                <p>
                                    There are many variations of passages available but the majority have suffered to
                                    the alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <div className="testimonial-single">
                            <div className="testimonial-content">
                                <div className="testimonial-author-img">
                                    <img src="assets/img/testimonial/04.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Parker Jimenez</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <span className="testimonial-quote-icon">
                                    <i className="flaticon-quote"></i>
                                </span>
                                <p>
                                    There are many variations of passages available but the majority have suffered to
                                    the alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <div className="testimonial-single">
                            <div className="testimonial-content">
                                <div className="testimonial-author-img">
                                    <img src="assets/img/testimonial/05.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Heruli Nez</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <span className="testimonial-quote-icon">
                                    <i className="flaticon-quote"></i>
                                </span>
                                <p>
                                    There are many variations of passages available but the majority have suffered to
                                    the alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- testimonial area end --> */}

            {/* <!-- blog area --> */}
            <div className="blog-area py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Our Blog
                                </span>
                                <h2 className="site-title">
                                    Latest News & <span>Blog</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/01.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/02.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/03.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- blog area end --> */}

            {/* <!-- download area --> */}
            <div className="download-area mb-120">
                <div className="container">
                    <div className="download-wrapper">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="download-content">
                                    <div className="site-heading mb-4">
                                        <span className="site-title-tagline justify-content-start">
                                            <i className="flaticon-drive"></i> Get Our App
                                        </span>
                                        <h2 className="site-title mb-10">
                                            Download <span>Our Motex</span> App For Free
                                        </h2>
                                        <p>
                                            There are many variations of passages available but the majority have
                                            suffered in some form going to use a passage by injected humour.
                                        </p>
                                    </div>
                                    <div className="download-btn">
                                        <a href="#">
                                            <i className="fab fa-google-play"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>Google Play</strong>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-app-store"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>App Store</strong>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="download-img">
                            <img src="assets/img/download/01.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- download area end --> */}
        </main>
    );
}
