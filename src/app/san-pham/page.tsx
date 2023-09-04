

export default function Shop() {
    return (
        <main className="main">
    
            {/* <!-- breadcrumb --> */}
            <div className="site-breadcrumb">
                <div className="container">
                    <h2 className="breadcrumb-title">Our Shop</h2>
                    <ul className="breadcrumb-menu">
                        <li><a href="index.html">Home</a></li>
                        <li className="active">Our Shop</li>
                    </ul>
                </div>
            </div>
            {/* <!-- breadcrumb end --> */}
    
    
            {/* <!-- shop-area --> */}
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop-sidebar">
                                <div className="shop-widget">
                                    <div className="shop-search-form">
                                        <h4 className="shop-widget-title">Search</h4>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Search"/>
                                                <button type="button"><i className="far fa-search"></i></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Category</h4>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat1"/>
                                                <label className="form-check-label" htmlFor="cat1"> Headlights & Lighting</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input"  type="checkbox" id="cat2"/>
                                                <label className="form-check-label" htmlFor="cat2"> Interior Parts</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat3"/>
                                                <label className="form-check-label" htmlFor="cat3"> Switches & Relays</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat4"/>
                                                <label className="form-check-label" htmlFor="cat4"> Tires & Wheels</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat5"/>
                                                <label className="form-check-label" htmlFor="cat5"> Fuel Systems</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat6"/>
                                                <label className="form-check-label" htmlFor="cat6"> Steering</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat7"/>
                                                <label className="form-check-label" htmlFor="cat7"> Body Parts</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat8"/>
                                                <label className="form-check-label" htmlFor="cat8"> Air Filters</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="cat9"/>
                                                <label className="form-check-label" htmlFor="cat9"> Wipers & Washers</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Parts Brand</h4>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand1"/>
                                                <label className="form-check-label" htmlFor="brand1"> Audi</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand2"/>
                                                <label className="form-check-label" htmlFor="brand2"> BMW</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand3"/>
                                                <label className="form-check-label" htmlFor="brand3"> Ford</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand4"/>
                                                <label className="form-check-label" htmlFor="brand4"> Tesla</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand5"/>
                                                <label className="form-check-label" htmlFor="brand5"> Honda</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Price Range</h4>
                                    <div className="price-range-box">
                                        <div className="price-range-input">
                                            <input type="text" id="price-amount" />
                                        </div>
                                        <div className="price-range"></div>
                                    </div>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Popular Tags</h4>
                                    <div className="shop-tags">
                                        <a href="#">Car</a>
                                        <a href="#">Parts</a>
                                        <a href="#">Fuel</a>
                                        <a href="#">Tire</a>
                                        <a href="#">Light</a>
                                    </div>
                                </div>
                                <div className="widget-banner mt-30 mb-50">
                                    <div className="banner-content">
                                        <h3>Get <span>35% Off</span> On All Our Products</h3>
                                        <a href="#" className="theme-btn">Buy Now<i className="fas fa-arrow-right-long"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="col-md-12">
                                <div className="shop-sort">
                                    <h5>Showing 1-10 of 50 Results</h5>
                                    <div className="shop-sort-box">
                                        <select className="select">
                                            <option value="1">Sort By Default</option>
                                            <option value="5">Sort By Featured</option>
                                            <option value="2">Sort By Latest</option>
                                            <option value="3">Sort By Low Price</option>
                                            <option value="4">Sort By High Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <span className="shop-item-sale">Sale</span>
                                                <img src="/assets/img/shop/01.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price"><del>$450</del> $390</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/02.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$640</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/03.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$710</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <span className="shop-item-sale">Sale</span>
                                                <img src="/assets/img/shop/04.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price"><del>$320</del> $290</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/05.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$670</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/06.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$250</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/07.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$420</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/08.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$550</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="shop-item">
                                            <div className="shop-item-img">
                                                <img src="/assets/img/shop/09.jpg" alt=""/>
                                                <div className="shop-item-meta">
                                                    <a href="#"><i className="far fa-heart"></i></a>
                                                    <a href="#"><i className="far fa-eye"></i></a>
                                                    <a href="#"><i className="far fa-shopping-cart"></i></a>
                                                </div>
                                            </div>
                                            <div className="shop-item-info">
                                                <div className="shop-item-rate">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <a href="#">
                                                    <h4 className="shop-item-title">Car Engine Parts</h4>
                                                </a>
                                                <div className="shop-item-price">$695</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <div aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    
        </main>
    )
  }
  