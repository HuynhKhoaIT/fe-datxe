'use client';
import { IGarage } from '@/interfaces/garage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export function SideBarGaraItem({ garage }: { garage: IGarage }) {
    const router = useRouter();
    const garageId = garage?.id;
    const name = garage ? garage?.name : '';
    const pathname = usePathname();
    const searchParams = useSearchParams()!;
    let params = new URLSearchParams(searchParams);
    function handleClick(checkbox: HTMLInputElement) {
        const checkboxes = document.querySelectorAll('input[name="garage"]');
        checkboxes.forEach((item) => {
            if (item !== checkbox) (item as HTMLInputElement).checked = false;
        });

        if (checkbox.checked === false) {
            params?.delete('garage_id');
        } else {
            params?.set('garage_id', `${garageId}`);
        }
        const path = pathname + '?' + params?.toString();
        router.push(path);
    }

    const checkHandler = (checkBoxType: string, checkBoxValue: string) => {
        const params = new URLSearchParams(searchParams);
        const value = params.get(checkBoxType);
        return checkBoxValue === value;
    };

    return (
        <li>
            <div className="form-check">
                <input
                    name="garage"
                    className="form-check-input"
                    type="checkBox"
                    id={garage.id?.toString()}
                    checked={checkHandler('garage_id', garageId?.toString() ?? '')}
                    onClick={(e) => handleClick(e.target as HTMLInputElement)}
                />
                <label className="form-check-label" htmlFor={garage.id?.toString()}>
                    {name}
                </label>
            </div>
        </li>
    );
}
