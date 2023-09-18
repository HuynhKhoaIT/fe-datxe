import { ICategory } from '@/interfaces/category';

export async function SideBarItem({ category }: { category: ICategory }) {
    const uniqueId = `cat-${category.id}`; // Generate a unique id for each category

    return (
        <li>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id={uniqueId} />
                <label className="form-check-label" htmlFor={uniqueId}>
                    {category.name}
                </label>
            </div>
        </li>
    );
}
