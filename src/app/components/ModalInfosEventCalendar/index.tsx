'use client';
import React, { useEffect, useState } from 'react';
import BasicModal from '../basicModal/BasicModal';
import { ModalEventCalendar } from './ModalEventCalendar';
import { useSession } from 'next-auth/react';
import { getBrands, getModels } from '@/utils/branch';
import { useSearchParams } from 'next/navigation';
import { getGarage } from '@/utils/garage';
import { getCategories } from '@/utils/category';
import Categories from '../category/categories';
import { getCustomerCareCreate } from '@/utils/customerCare';
import { getCars } from '@/utils/car';
import { getMyAccount } from '@/utils/user';

export default function ModalCalendar({
    opened,
    onClose,
    eventInfos,
    brandOptions,
    categoryOptions,
    carsData,
    carOptions,
    carDefault: dataCarDefault,
}: any) {
    const searchParams = useSearchParams();
    const garageId = searchParams.get('garage');
    // Lấy thông tin khách hàng nếu có
    const { data: session } = useSession();
    const token = session?.user?.token;
    const user = session?.user;
    // state
    const [brand, setBrand] = useState<number>();
    const [modelOptions, setModelsOptions] = useState<any>();
    const [advisorOptions, setAdvisoroptions] = useState<any>();
    const [garageOptions, setGarageOptions] = useState<any>([]);
    const [customerCreate, setCustomerCreate] = useState<any>();
    const [garage, setGarage] = useState<any>();

    // lấy danh sách model
    const fetchModel = async () => {
        const models = await getModels(brand || 0);
        const newModels = models?.map((model) => ({
            value: model.id?.toString() || '',
            label: model.name || '',
        }));
        setModelsOptions(newModels);
    };
    useEffect(() => {
        fetchModel();
    }, [brand]);

    //  lấy  Garage
    const fetchGarage = async (garageId: string) => {
        if (garageId.length > 0) {
            const garage = await getGarage(garageId || '');
            setGarage(garage);
        }
    };
    useEffect(() => {
        fetchGarage(garageId || '');
    }, [garageId]);

    // Lay thong tin dat lich khi đã login
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const customerCare: any = await getCustomerCareCreate(token, garageId ?? '');
                    const garages: any = customerCare?.garages?.map((garage: { id: any; name: any }) => ({
                        value: garage.id?.toString(),
                        label: garage.name,
                    }));
                    const categories: any = customerCare?.categories?.map((category: { id: any; name: any }) => ({
                        value: category.id?.toString(),
                        label: category.name,
                    }));
                    const advisors: any = customerCare?.serviceAdvisor?.map((advisor: { id: any; name: any }) => ({
                        value: advisor.id?.toString(),
                        label: advisor.name,
                    }));
                    categoryOptions = categories;
                    setGarageOptions(garages);
                    setAdvisoroptions(advisors);
                    setCustomerCreate(customerCare);
                } catch (error) {
                    console.log('API Response:', error);
                }
            }
        };

        fetchData();
    }, [token]);
    return (
        <BasicModal
            size={600}
            isOpen={opened}
            onCloseModal={onClose}
            footer={false}
            title="Đặt lịch"
            style={{ position: 'relative' }}
        >
            <ModalEventCalendar
                user={user}
                brandOptions={brandOptions}
                modelOptions={modelOptions}
                token={token}
                eventInfos={eventInfos}
                setBrand={setBrand}
                garage={garage}
                categoryOptions={categoryOptions}
                advisorOptions={advisorOptions}
                carOptions={carOptions}
                cars={carsData}
                garageOptions={garageOptions}
                dataCarDefault={dataCarDefault?.[0]?.otherData}
                onClose={onClose}
            />
        </BasicModal>
    );
}
