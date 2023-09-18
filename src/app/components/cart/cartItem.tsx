// CartItem.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
interface CartItemProps {
    item: {
        product: {
            id: number;
            thumbnail: string;
            name: string;
            price: number;
        };
        quantity: number;
    };
    decrementQuantity: (productId: number) => void;
    incrementQuantity: (productId: number) => void;
    deleteItem: (productId: number) => void;
}
function CartItem({ item, decrementQuantity, incrementQuantity, deleteItem }: CartItemProps) {
    return (
        <tr>
            <td>
                <div className="cart-img">
                    <img src={item.product.thumbnail} alt="" />
                </div>
            </td>
            <td>
                <h5>{item.product.name}</h5>
            </td>
            <td>
                <div className="cart-price">
                    <span>{item.product.price.toLocaleString()}đ</span>
                </div>
            </td>
            <td>
                <div className="cart-qty">
                    <button onClick={() => decrementQuantity(item.product.id)} className="minus-btn">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input className="quantity" type="text" value={item.quantity} readOnly />
                    <button onClick={() => incrementQuantity(item.product.id)} className="plus-btn">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </td>
            <td>
                <div className="cart-sub-total">
                    <span>{(item.product.price * item.quantity).toLocaleString()}đ</span>
                </div>
            </td>
            <td>
                <a onClick={() => deleteItem(item.product.id)} className="cart-remove">
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </td>
        </tr>
    );
}

export default CartItem;
