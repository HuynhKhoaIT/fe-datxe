// 'use client';

import { IconShoppingCart, IconEye, IconHeart, IconStarFilled, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { IProduct } from '@/interfaces/product';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
const ProductItemMini = ({ key, product }: { key: number; product: IProduct }) => {
    const pathParm = useParams();
    const Parm = usePathname();
    let isCategory = Parm?.includes('chuyen-muc');
    const { data: session } = useSession();
    const [openedNotification, { open: openNotification, close: closeNotification }] = useDisclosure(false);

    const handleOk = () => {
        closeNotification();
        const existingCartItems = JSON.parse('[]');
        existingCartItems.push({
            garageId: product.garageId,
            product: product,
            quantity: 1,
        });
        localStorage.setItem('cartData', JSON.stringify(existingCartItems));
        openNotification();
    };

    const addProductToLocalStorage = () => {
        if (product && session?.user) {
            const productId = product.id;
            const garageId = product.garageId;
            const existingCartItems = JSON.parse(localStorage.getItem('cartData') || '[]');
            const index = existingCartItems.findIndex((item: any) => item.product.id === productId);
            const idCar = existingCartItems.findIndex((item: any) => item.product.garageId === garageId);

            if (existingCartItems.length > 0 && idCar === -1) {
                openNotification();
            } else {
                if (index !== -1) {
                    existingCartItems[index].quantity += 1;
                } else {
                    existingCartItems.push({
                        garageId: garageId,
                        product: product,
                        quantity: 1,
                    });
                }

                localStorage.setItem('cartData', JSON.stringify(existingCartItems));
                openNotification();
            }
        } else {
            signIn();
        }
    };
    return (
        <div key={key} className="col-md-6 col-lg-4 col-xl-3">
            <div className="shop-item">
                <div className="shop-item-img-200">
                    <span className="shop-item-sale">Sale</span>
                    {/* {isCategory ? (
                        <Link href={`/chuyen-muc/${pathParm?.slug}/${product.id}`}>
                            <img src={product.thumbnail} alt="" />
                        </Link>
                    ) : (
                        <Link href={`/san-pham/${product.id}`}>
                            <img src={product.thumbnail} alt="" />
                        </Link>
                    )} */}
                    <Link href={`/san-pham/${product.id}`}>
                        <img src={product.thumbnail} alt="" />
                    </Link>
                    <div className="shop-item-meta">
                        <Link href="#">
                            <IconHeart />
                        </Link>
                        {/* {isCategory ? (
                            <Link href={`/san-pham/${pathParm?.slug}/${product.id}`}>
                                <IconEye />
                            </Link>
                        ) : (
                            <Link href={`/san-pham/${product.id}`}>
                                <IconEye />
                            </Link>
                        )} */}
                        <Link href={`/san-pham/${product.id}`}>
                            <IconEye />
                        </Link>
                        <p onClick={addProductToLocalStorage}>
                            <IconShoppingCart />
                        </p>
                    </div>
                </div>
                <div className="shop-item-info">
                    <div className="shop-item-rate">
                        <IconStarFilled color="var(--theme-color)" size={18} />
                        <IconStarFilled color="var(--theme-color)" size={18} />
                        <IconStarFilled color="var(--theme-color)" size={18} />
                        <IconStarFilled color="var(--theme-color)" size={18} />
                        <IconStarFilled color="var(--theme-color)" size={18} />
                    </div>
                    {/* {isCategory ? (
                        <Link href={`/san-pham/${pathParm?.slug}/${product.id}`}>
                            <h4 className="shop-item-title">{product.name}</h4>
                        </Link>
                    ) : (
                        <Link href={`/san-pham/${product.id}`}>
                            <h4 className="shop-item-title">{product.name}</h4>
                        </Link>
                    )} */}
                    <Link href={`/san-pham/${product.id}`}>
                        <h4 className="shop-item-title">{product.name}</h4>
                    </Link>
                    <div className="shop-item-price">
                        <del>{product.price?.toLocaleString()}đ</del> {product.price?.toLocaleString()}đ
                    </div>
                </div>
            </div>
            <Modal
                title="Thông báo"
                opened={openedNotification}
                onClose={closeNotification}
                style={{ zIndex: '99999' }}
            >
                <p>Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng để thêm sản phẩm mới?</p>
                <Group mt="xl" justify="flex-end">
                    <Button onClick={closeNotification}>Huỷ</Button>
                    <Button onClick={handleOk}>Thêm</Button>
                </Group>
            </Modal>
        </div>
    );
};
export { ProductItemMini };
