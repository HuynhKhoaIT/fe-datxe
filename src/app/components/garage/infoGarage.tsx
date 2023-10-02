import { IGarage } from '@/interfaces/garage';
import React from 'react';

export default function InfoGarage({ infoGara }: { infoGara: IGarage }) {
    console.log('11111', infoGara);
    return (
        <div className="col-sm-4 invoice-col">
            THÔNG TIN CHUYÊN GIA
            <div>
                <strong>{infoGara.name}</strong>
                <br />
                {infoGara.address}
                <br />
                Phone: {infoGara.phoneNumber}
                <br />
                Email: {infoGara.email}
            </div>
        </div>
    );
}
