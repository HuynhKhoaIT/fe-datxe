'use client';
import React, { FormEvent, Suspense, useEffect, useRef, useState } from 'react';
import { checkOutCart } from '@/utils/order';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { Grid, Modal, TextInput, Box, Select, Button, Group, Table, LoadingOverlay, Card, Avatar } from '@mantine/core';
import { ActionIcon, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconClock12, IconTrash, IconBan, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-react';
import CartItemRow from './CartItemRow';
import InfoCustomer from './InfoCustomer';
import InfoCar from './InfoCar';
import InfoCart from './InfoCart';
import InfoDate from './InfoDate';
import CartComponent from './CartComponent';
import { getCarsSsr } from '@/utils/car';
import { getMyAccount } from '@/utils/user';

export default async function Cart() {
    //Lấy danh sách xe
    const fetchedCars = await getCarsSsr();
    const carOptions = fetchedCars?.map((car) => ({
        value: car.id?.toString() || '',
        label: car.licensePlates || '',
        otherData: {
            carId: car.id?.toString() || '',
            brandId: car.brandCarName.id,
            brandName: car.brandCarName.name,
            modelId: car.modelCarName.id,
            modelName: car.modelCarName.name,
        },
    }));
    const account: any = await getMyAccount();

    const carDefault: any = carOptions?.filter((car) => car.value == account?.carIdDefault);
    return <CartComponent carDefault={carDefault?.[0]?.otherData} carOptions={carOptions} carId={carDefault?.value} />;
}
