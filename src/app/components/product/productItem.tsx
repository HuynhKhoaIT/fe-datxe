'use client';
const ProductItem = () => {
    return (
        <div className="shop-item">
            <div className="shop-item-img">
                <span className="shop-item-sale">Sale</span>
                <img src="/assets/img/shop/01.jpg" alt="" />
                <div className="shop-item-meta">
                    <a href="#">
                        <i className="far fa-heart"></i>
                    </a>
                    <a href="#">
                        <i className="far fa-eye"></i>
                    </a>
                    <a href="#">
                        <i className="far fa-shopping-cart"></i>
                    </a>
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
                <div className="shop-item-price">
                    <del>$450</del> $390
                </div>
            </div>
        </div>
    );
};
export { ProductItem };
