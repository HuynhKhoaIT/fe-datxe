import { createAction } from '@/store/utils';

export const getCartItemList = createAction('cart/GET_CART_ITEM_LIST');
export const addItemCart = createAction('cart/ADD_TO_CART');
export const removeItemCarts = createAction('cart/REMOVE_ITEM_CART');
export const actions = {
    getCartItemList,
    addItemCart,
    removeItemCarts,
};
