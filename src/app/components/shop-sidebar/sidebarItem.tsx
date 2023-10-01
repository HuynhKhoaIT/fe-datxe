'use client';
import { ICategory } from '@/interfaces/category';
import { useRouter } from 'next/navigation';

export function SideBarItem({ category }: { category: ICategory }) {
    const router = useRouter();

    const catId: string = category.id;
    const name: string = category ? category.name : '';

    let queryParams: URLSearchParams;

    function handleClick(checkbox: HTMLInputElement) {
        const checkboxes = document.querySelectorAll('input[name="category"]');

        checkboxes.forEach((item) => {
            if (item !== checkbox) (item as HTMLInputElement).checked = false;
        });

        if (checkbox.checked === false) {
            queryParams.delete('cat_id');
        } else {
            queryParams.set('cat_id', `${category?.id}`);
        }
        const path = window.location.pathname + '?' + queryParams.toString();
        router.push(path);
    }

    function checkHandler(checkBoxType: string, checkBoxValue: string) {
        queryParams = new URLSearchParams(window.location.search);
        const value = queryParams.get(checkBoxType);
        return checkBoxValue == value;
    }

    return (
        <li>
            <div className="form-check">
                <input
                    name="category"
                    className="form-check-input"
                    type="checkbox"
                    id={category.id?.toString()}
                    defaultChecked={checkHandler('cat_id', catId)}
                    onClick={(e) => handleClick(e.target as HTMLInputElement)}
                />
                <label className="form-check-label" htmlFor={category.id?.toString()}>
                    {name}
                </label>
            </div>
        </li>
    );
}
