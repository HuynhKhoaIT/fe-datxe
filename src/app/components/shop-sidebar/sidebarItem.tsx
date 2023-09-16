import { ICategory } from '@/interfaces/category';
export async function SideBarItem({ category }: { category: ICategory }) {
    return (
        <li>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="cat1" />
                <label className="form-check-label" htmlFor="cat1">
                    {category.name}
                </label>
            </div>
        </li>
    );
}
