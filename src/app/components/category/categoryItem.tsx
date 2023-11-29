import Link from 'next/link';
import { ICategory } from '@/interfaces/category';
const CategoryItem = ({ key, category, garageId }: { key: number; category: ICategory; garageId: any }) => {
    return (
        <div className="col-6 col-md-4 col-lg-2" key={key}>
            {garageId > 0 ? (
                <Link
                    href={`/chuyen-muc/${category.id}?garage_id=${garageId}`}
                    className="category-item wow fadeInUp"
                    data-wow-delay=".25s"
                >
                    <div className="category-img">
                        <img src={category.thumbnail} alt="" />
                    </div>
                    <h5>{category.name}</h5>
                </Link>
            ) : (
                <Link href={`/chuyen-muc/${category.id}`} className="category-item wow fadeInUp" data-wow-delay=".25s">
                    <div className="category-img">
                        <img src={category.thumbnail} alt="" />
                    </div>
                    <h5>{category.name}</h5>
                </Link>
            )}
        </div>
    );
};
export { CategoryItem };
