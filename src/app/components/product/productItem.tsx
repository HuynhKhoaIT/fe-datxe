// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IProduct } from '@/interfaces/product';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const ProductItem = ({ key, product }: { key: number; product: IProduct }) => {
    const pathParm = useParams();
    const Parm = usePathname();
    let isCategory = Parm?.includes('chuyen-muc');
    return (
        <div key={key} className="col-md-6 col-lg-4 col-xl-3">
            <div className="shop-item">
                <div className="shop-item-img">
                    <span className="shop-item-sale">Sale</span>
                    <img src={product.thumbnail} alt="" />
                    <div className="shop-item-meta">
                        <Link href="#">
                            <FontAwesomeIcon icon={faHeart} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
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
                    {isCategory ? (
                        <Link href={`/chuyen-muc/${pathParm?.slug}/${product.id}`}>
                            <h4 className="shop-item-title">{product.name}</h4>
                        </Link>
                    ) : (
                        <Link href={`/san-pham/${product.id}`}>
                            <h4 className="shop-item-title">{product.name}</h4>
                        </Link>
                    )}
                    <div className="shop-item-price">
                        <del>{product.price?.toLocaleString()}đ</del> {product.price?.toLocaleString()}đ
                    </div>
                </div>
            </div>
        </div>
    );
};
export { ProductItem };
