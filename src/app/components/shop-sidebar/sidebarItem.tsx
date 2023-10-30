'use client';
import { ICategory } from '@/interfaces/category';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export function SideBarItem({ category }: { category: ICategory }) {
    const router = useRouter();
    const catId = category?.id;
    const name = category ? category?.name : '';
    const pathname = usePathname();
    const searchParams = useSearchParams()!;
    let params = new URLSearchParams(searchParams);
    function handleClick(checkbox: HTMLInputElement) {
        const checkboxes = document.querySelectorAll('input[name="category"]');
        checkboxes.forEach((item) => {
            if (item !== checkbox) (item as HTMLInputElement).checked = false;
        });

        if (checkbox.checked === false) {
            params?.delete('cat_id');
        } else {
            params?.set('cat_id', `${catId}`);
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
                    name="category"
                    className="form-check-input"
                    type="checkBox"
                    id={category.id?.toString()}
                    checked={checkHandler('cat_id', catId?.toString() ?? '')}
                    onClick={(e) => handleClick(e.target as HTMLInputElement)}
                />
                <label className="form-check-label" htmlFor={category.id?.toString()}>
                    {name}
                </label>
            </div>
        </li>
    );
}
