'use client';
import { IGarage } from '@/interfaces/garage';
import { getGaragesNear } from '@/utils/garage';
import { GarageItem } from '../garageItem/garageItem';
import { useState } from 'react';

export default function Garages({ initialGarageData }: { initialGarageData: IGarage[] }) {
    const [garageData, setGarageData] = useState<IGarage[]>(initialGarageData);
    const [limit, setLimit] = useState<number>(8);

    const handleButtonClick = async () => {
        // Tăng limit
        const newLimit = limit + 4;
        setLimit(newLimit);

        // Fetch thêm dữ liệu
        const newGarageData = await getGaragesNear({ limit: newLimit });

        // Cập nhật dữ liệu sản phẩm
        setGarageData(newGarageData);
    };
    return (
        <>
            <div className="row">
                {garageData?.map((garage: IGarage, index: number) => <GarageItem garage={garage} key={index} />)}
            </div>
            <div className="text-center mt-4">
                <button onClick={handleButtonClick} className="theme-btn">
                    Load More <i className="far fa-arrow-rotate-right"></i>
                </button>
            </div>
        </>
    );
}
