export default function SingleShop  (){
    return (
        
    <main className="main">

    <div className="site-breadcrumb" style={{color: "red"}}>
        <div className="container">
            <h2 className="breadcrumb-title">Shop Single</h2>
            <ul className="breadcrumb-menu">
                <li><a href="index.html">Home</a></li>
                <li className="active">Shop Single</li>
            </ul>
        </div>
    </div>


    <div className="shop-item-single bg py-120">
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="item-gallery mb-5">
                        <div className="flexslider-thumbnails">
                            <ul className="slides">
                                <li data-thumb="/assets/img/shop/01.jpg" rel="adjustX:10, adjustY:">
                                    <img src="/assets/img/shop/01.jpg" alt="#"/>
                                </li>
                                {/* <li data-thumb="/assets/img/shop/02.jpg">
                                    <img src="/assets/img/shop/02.jpg" alt="#"/>
                                </li>
                                <li data-thumb="/assets/img/shop/03.jpg">
                                    <img src="/assets/img/shop/03.jpg" alt="#"/>
                                </li>
                                <li data-thumb="/assets/img/shop/04.jpg">
                                    <img src="/assets/img/shop/04.jpg" alt="#"/>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="single-item-info">
                        <h4 className="single-item-title">Car Engine Parts</h4>
                        <div className="single-item-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <i className="far fa-star"></i>
                            <span className="rating-count"> (4 Customer Reviews)</span>
                        </div>
                        <div className="single-item-price">
                            <h4><del>$690</del><span>$650</span></h4>
                        </div>
                        <p className="mb-4">
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't
                            look even slightly believable.
                        </p>
                        <div className="single-item-content">
                            <h5>Stock: <span>Available</span></h5>
                            <h5>SKU: <span>676TYWV</span></h5>
                        </div>
                        <div className="single-item-action">
                            <h5 className="title">Quantity:</h5>
                            <div className="cart-qty">
                                <button className="minus-btn bg-white"><i className="fal fa-minus"></i></button>
                                <input className="quantity bg-white" type="text" value="1" />
                                <button className="plus-btn bg-white"><i className="fal fa-plus"></i></button>
                            </div>
                            <div className="item-single-btn-area">
                                <button className="theme-btn"><span className="far fa-shopping-cart"></span>Add to
                                    cart</button>
                                <a href="#" className="single-item-btn"><i className="far fa-heart"></i></a>
                                <a href="#" className="single-item-btn"><i className="far fa-exchange-alt"></i></a>
                            </div>
                        </div>
                        <div className="single-item-content">
                            <h5>Category: <span>Car Parts</span></h5>
                            <h5>Tags: <span>Car, Shop, Tire</span></h5>
                        </div>
                        <hr/>
                        <div className="single-item-share">
                            <span>Share:</span>
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-pinterest-p"></i></a>
                        </div>

                    </div>
                </div>
            </div>
            <div className="single-item-details">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-tab1" data-bs-toggle="tab" data-bs-target="#tab1"
                            type="button" role="tab" aria-controls="tab1" aria-selected="true">Description</button>
                        <button className="nav-link" id="nav-tab2" data-bs-toggle="tab" data-bs-target="#tab2"
                            type="button" role="tab" aria-controls="tab2" aria-selected="false">Additional
                            Info</button>
                        <button className="nav-link" id="nav-tab3" data-bs-toggle="tab" data-bs-target="#tab3"
                            type="button" role="tab" aria-controls="tab3" aria-selected="false">Reviews
                            (05)</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-tab1">

                        <div className="single-item-desc">
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority
                                have suffered alteration in some form, by injected humour, or randomised words which
                                don't look even slightly believable. If you are going to use a passage of Lorem
                                Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
                                text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
                                chunks as necessary, making this the first true generator on the Internet.
                            </p>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                            </p>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="nav-tab2">
                        <div className="single-additional-info">
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority
                                have suffered alteration in some form, by injected humour, or randomised words which
                                don't look even slightly believable. If you are going to use a passage of Lorem
                                Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
                                text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
                                chunks as necessary, making this the first true generator on the Internet.
                            </p>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                            </p>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="nav-tab3">
                        <div className="single-item-review">
                            <div className="blog-comments">
                                <h3>Reviews (05)</h3>
                                <div className="blog-comments-wrapper">
                                    <div className="blog-comments-single">
                                        <img src="/assets/img/blog/com-1.jpg" alt="thumb"/>
                                        <div className="blog-comments-content">
                                            <h5>Jesse Sinkler</h5>
                                            <span><i className="far fa-clock"></i> 31 Jan, 2023</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                            <a href="#"><i className="far fa-reply"></i> Reply</a>
                                        </div>
                                    </div>
                                    <div className="blog-comments-single">
                                        <img src="/assets/img/blog/com-2.jpg" alt="thumb"/>
                                        <div className="blog-comments-content">
                                            <h5>Daniel Wellman</h5>
                                            <span><i className="far fa-clock"></i> 31 Jan, 2023</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                            <a href="#"><i className="far fa-reply"></i> Reply</a>
                                        </div>
                                    </div>
                                    <div className="blog-comments-single">
                                        <img src="/assets/img/blog/com-3.jpg" alt="thumb"/>
                                        <div className="blog-comments-content">
                                            <h5>Kenneth Evans</h5>
                                            <span><i className="far fa-clock"></i> 31 Jan, 2023</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                            <a href="#"><i className="far fa-reply"></i> Reply</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-comments-form bg-white">
                                    <h3>Leave A Review</h3>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group review-rating">
                                                    <label>Your Rating</label>
                                                    <div>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Your Name*"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Your Email*"/>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <textarea className="form-control" rows={5} placeholder="Your Comment*"></textarea>
                                                </div>
                                                <button type="submit" className="theme-btn"><span className="far fa-paper-plane"></span> Submit Review</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="related-item">
                <div className="row">
                    <div className="col-12 mx-auto">
                        <div className="site-heading">
                            <h2 className="site-title">Related Items</h2>
                        </div>
                    </div>
                </div>
                <div className="shop-item-wrapper">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-lg-3">
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
                                    <div className="shop-item-price"><del>$560</del> $510</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
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
                                    <div className="shop-item-price">$680</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="shop-item">
                                <div className="shop-item-img">
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
                                    <div className="shop-item-price">$710</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="shop-item">
                                <div className="shop-item-img">
                                    <span className="shop-item-sale">Sale</span>
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
                                    <div className="shop-item-price"><del>$920</del> $900</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</main>

    )
}