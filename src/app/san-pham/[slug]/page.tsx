'use client';
import {
    faCartShopping,
    faHeart,
    faMinus,
    faPlus,
    faRightLeft,
    faStar,
    faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { getProductDetail, getProductsRelated } from '@/utils/product';
import { IProduct } from '@/interfaces/product';
import Product from '@/app/components/product/product';
import { useEffect, useState } from 'react';

export default function SingleShop({ params }: { params: { slug: number } }) {
    const [inputValue, setInputValue] = useState(1);
    const [productDetail, setProductDetail] = useState<IProduct | null>(null);
    const [initialProductData, setInitialProductData] = useState<IProduct[]>([]);
    console.log(initialProductData);
    useEffect(() => {
        // Fetch product details and related products when the component mounts
        const fetchData = async () => {
            try {
                const productDetailResponse: IProduct = await getProductDetail(params.slug);
                setProductDetail(productDetailResponse);
                const catId: IProduct[] = productDetailResponse.categoryId;
                const garId: IProduct[] = productDetailResponse.garageId;
                const relatedProducts: IProduct[] = await getProductsRelated(catId, garId);
                setInitialProductData(relatedProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.slug]);
    // tăng số lượng
    const incrementValue = () => {
        setInputValue(inputValue + 1);
    };
    // giảm số lượng
    const decrementValue = () => {
        if (inputValue === 1) {
            return;
        }
        setInputValue(inputValue - 1);
    };

    const addProductToLocalStorage = () => {
        if (productDetail) {
            const productId = productDetail.id;
            const existingCartItems = JSON.parse(localStorage.getItem('cartData') || '[]');
            const index = existingCartItems.findIndex((item: any) => item.productId === productId);

            if (index !== -1) {
                existingCartItems[index].quantity += inputValue;
            } else {
                existingCartItems.push({
                    product: productDetail,
                    quantity: inputValue,
                });
            }

            localStorage.setItem('cartData', JSON.stringify(existingCartItems));

            alert('Product added to cart!');
        }
    };
    return (
        <main className="main">
            <div className="shop-item-single bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="item-gallery mb-5">
                                <div className="flexslider-thumbnails">
                                    <ul className="slides">
                                        <li data-thumb="/assets/img/shop/01.jpg" rel="adjustX:10, adjustY:">
                                            <img src="/assets/img/shop/01.jpg" alt="#" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-item-info">
                                {productDetail ? ( // Check if productDetail is not null
                                    <div className="single-item-info">
                                        <h4 className="single-item-title">{productDetail.name}</h4>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}

                                <div className="single-item-rating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfStroke} />
                                    <span className="rating-count"> (4 Customer Reviews)</span>
                                </div>

                                <div className="single-item-price">
                                    <h4>
                                        {productDetail?.price ? (
                                            <>
                                                <del>{productDetail.price.toLocaleString()}đ</del>
                                                <span>{productDetail.price.toLocaleString()}đ</span>
                                            </>
                                        ) : (
                                            'Price not available'
                                        )}
                                    </h4>
                                </div>

                                <p className="mb-4">
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration in some form, by injected humour, or randomised words which
                                    don't look even slightly believable.
                                </p>

                                <div className="single-item-content">
                                    <h5>
                                        Stock: <span>Available</span>
                                    </h5>
                                    <h5>
                                        SKU: <span>676TYWV</span>
                                    </h5>
                                </div>

                                <div className="single-item-action">
                                    <h5 className="title">Quantity:</h5>
                                    <div className="cart-qty">
                                        <button className="minus-btn bg-white" onClick={decrementValue}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            className="quantity bg-white"
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(parseInt(e.target.value) || 1)}
                                        />
                                        <button className="plus-btn bg-white" onClick={incrementValue}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="item-single-btn-area">
                                        <button className="theme-btn" onClick={addProductToLocalStorage}>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                            Add to cart
                                        </button>
                                        <Link href="#" className="single-item-btn">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </Link>
                                        <Link href="#" className="single-item-btn">
                                            <FontAwesomeIcon icon={faRightLeft} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="single-item-content">
                                    <h5>
                                        Category: <span>Car Parts</span>
                                    </h5>
                                    <h5>
                                        Tags: <span>Car, Shop, Tire</span>
                                    </h5>
                                </div>

                                <hr />

                                <div className="single-item-share">
                                    <span>Share:</span>
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </Link>
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faPinterestP} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-item-details">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button
                                    className="nav-link active"
                                    id="nav-tab1"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab1"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab1"
                                    aria-selected="true"
                                >
                                    Description
                                </button>
                                <button
                                    className="nav-link"
                                    id="nav-tab2"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab2"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab2"
                                    aria-selected="false"
                                >
                                    Additional Info
                                </button>
                                <button
                                    className="nav-link"
                                    id="nav-tab3"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab3"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab3"
                                    aria-selected="false"
                                >
                                    Reviews (05)
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="tab1"
                                role="tabpanel"
                                aria-labelledby="nav-tab1"
                            >
                                <div className="single-item-desc">
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                                        have suffered alteration in some form, by injected humour, or randomised words
                                        which don't look even slightly believable. If you are going to use a passage of
                                        Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                                        middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
                                        predefined chunks as necessary, making this the first true generator on the
                                        Internet.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                                        porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                                        velit.
                                    </p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="nav-tab2">
                                <div className="single-additional-info">
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                                        have suffered alteration in some form, by injected humour, or randomised words
                                        which don't look even slightly believable. If you are going to use a passage of
                                        Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                                        middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
                                        predefined chunks as necessary, making this the first true generator on the
                                        Internet.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                                        porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                                        velit.
                                    </p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="nav-tab3">
                                <div className="single-item-review">
                                    <div className="blog-comments">
                                        <h3>Reviews (05)</h3>
                                        <div className="blog-comments-wrapper">
                                            <div className="blog-comments-single">
                                                <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                                                <div className="blog-comments-content">
                                                    <h5>Jesse Sinkler</h5>
                                                    <span>
                                                        <i className="far fa-clock"></i> 31 Jan, 2023
                                                    </span>
                                                    <p>
                                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum deleniti atque corrupti quos
                                                        dolores et quas molestias excepturi sint occaecati cupiditate
                                                        non provident, similique sunt in culpa qui officia deserunt
                                                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                                                        rerum facilis est et expedita distinctio.
                                                    </p>
                                                    <a href="#">
                                                        <i className="far fa-reply"></i> Reply
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="blog-comments-single">
                                                <img src="/assets/img/blog/com-2.jpg" alt="thumb" />
                                                <div className="blog-comments-content">
                                                    <h5>Daniel Wellman</h5>
                                                    <span>
                                                        <i className="far fa-clock"></i> 31 Jan, 2023
                                                    </span>
                                                    <p>
                                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum deleniti atque corrupti quos
                                                        dolores et quas molestias excepturi sint occaecati cupiditate
                                                        non provident, similique sunt in culpa qui officia deserunt
                                                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                                                        rerum facilis est et expedita distinctio.
                                                    </p>
                                                    <a href="#">
                                                        <i className="far fa-reply"></i> Reply
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="blog-comments-single">
                                                <img src="/assets/img/blog/com-3.jpg" alt="thumb" />
                                                <div className="blog-comments-content">
                                                    <h5>Kenneth Evans</h5>
                                                    <span>
                                                        <i className="far fa-clock"></i> 31 Jan, 2023
                                                    </span>
                                                    <p>
                                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum deleniti atque corrupti quos
                                                        dolores et quas molestias excepturi sint occaecati cupiditate
                                                        non provident, similique sunt in culpa qui officia deserunt
                                                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                                                        rerum facilis est et expedita distinctio.
                                                    </p>
                                                    <a href="#">
                                                        <i className="far fa-reply"></i> Reply
                                                    </a>
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
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Your Name*"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Your Email*"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                className="form-control"
                                                                rows={5}
                                                                placeholder="Your Comment*"
                                                            ></textarea>
                                                        </div>
                                                        <button type="submit" className="theme-btn">
                                                            <span className="far fa-paper-plane"></span> Submit Review
                                                        </button>
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
                            <div className="row">
                                <Product initialProductData={initialProductData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
