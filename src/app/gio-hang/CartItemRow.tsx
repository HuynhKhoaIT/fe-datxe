'use client';
import React from 'react';
import { Table, Avatar, Button } from '@mantine/core'; // Replace with the actual import statements for your UI library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Make sure to import the necessary icons
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons-react';
const CartItemRow = ({ record, decrementQuantity, incrementQuantity, handleOpenModalDelete }: any) => {
    return (
        <Table.Tr key={record.product.id}>
            <Table.Td>
                <Avatar variant="filled" radius="sm" size="lg" src={record.product.thumbnail} />
            </Table.Td>
            <Table.Td>{record.product.name}</Table.Td>
            <Table.Td>{record.product.price.toLocaleString()}đ</Table.Td>

            <Table.Td width={180} align="center">
                <>
                    <Button variant="transparent" onClick={() => decrementQuantity(record.product.id)}>
                        <IconMinus size={16} />
                    </Button>
                    <span style={{ padding: '10px' }}>{record.quantity}</span>
                    <Button variant="transparent" onClick={() => incrementQuantity(record.product.id)}>
                        <IconPlus size={16} />
                    </Button>
                </>
            </Table.Td>
            <Table.Td>
                <span>{(record?.product.price * record.quantity).toLocaleString()}đ</span>
            </Table.Td>

            <Table.Td width={30} align="center">
                <Button
                    variant="transparent"
                    color="red"
                    onClick={() => handleOpenModalDelete(record)}
                    style={{ padding: 0 }}
                >
                    <IconTrash />
                </Button>
            </Table.Td>
        </Table.Tr>
    );
};

export default CartItemRow;
