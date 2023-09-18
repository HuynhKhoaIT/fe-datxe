// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart, faMinus, faPlus, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IProduct } from '@/interfaces/product';
const CartItem = ({ key, cartItem }: { key: number; cartItem: IProduct }) => {
    return (
        <tr>
            <td>
                <div className="cart-img">
                    <img src={cartItem.thumbnail} alt="" />
                </div>
            </td>
            <td>
                <h5>{cartItem.name}</h5>
            </td>
            <td>
                <div className="cart-price">
                    <span>{cartItem.price?.toLocaleString()}đ</span>
                </div>
            </td>
            <td>
                <div className="cart-qty">
                    <button onClick={() => decrementQuantity(cartItem.id)} className="minus-btn">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input className="quantity" type="text" value={cartItem.quantity} readOnly />
                    <button onClick={() => incrementQuantity(cartItem.id)} className="plus-btn">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </td>
            <td>
                <div className="cart-sub-total">
                    <span>{(cartItem.price * cartItem.quantity)?.toLocaleString()}đ</span>
                </div>
            </td>
            <td>
                <a onClick={() => deleteItem(cartItem.id)} className="cart-remove">
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </td>
        </tr>
    );
};
export { CartItem };
