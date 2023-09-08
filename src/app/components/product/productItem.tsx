'use client';
import Link from 'next/link';
const ProductItem = ({
    productId,
    name,
    price,
    thumbnail,
}: {
    productId: number;
    name: string;
    price: number;
    thumbnail: any;
}) => {
    return (
        <div className="shop-item">
            <div className="shop-item-img">
                <span className="shop-item-sale">Sale</span>
                <img src={thumbnail} alt="" />
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
                <Link href={`/san-pham/${productId}`}>
                    <h4 className="shop-item-title">{name}</h4>
                </Link>
                <div className="shop-item-price">
                    <del>{price.toLocaleString()}đ</del> {price.toLocaleString()}đ
                </div>
            </div>
        </div>
    );
};
export { ProductItem };
