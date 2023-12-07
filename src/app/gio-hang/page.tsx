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

export default async function Cart() {
    return <CartComponent />;
}
