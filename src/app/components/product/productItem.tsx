// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IProduct } from '@/interfaces/product';
const ProductItem = ({ key, product }: { key: number; product: IProduct }) => {
    return (
        <div key={key} className="col-md-6 col-lg-4 col-xl-3">
            <div className="shop-item">
                <div className="shop-item-img">
                    <span className="shop-item-sale">Sale</span>
                    <img src={product.thumbnail} alt="" />
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
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <Link href={`/san-pham/${product.id}`}>
                        <h4 className="shop-item-title">{product.name}</h4>
                    </Link>
                    <div className="shop-item-price">
                        <del>{product.price?.toLocaleString()}đ</del> {product.price?.toLocaleString()}đ
                    </div>
                </div>
            </div>
        </div>
    );
};
export { ProductItem };
