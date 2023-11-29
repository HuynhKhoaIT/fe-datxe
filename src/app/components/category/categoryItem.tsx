import Link from 'next/link';
import { ICategory } from '@/interfaces/category';
const CategoryItem = ({ key, category, garageId }: { key: number; category: ICategory; garageId: any }) => {
    return (
        <div key={key}>
            {garageId > 0 ? (
                <Link
                    href={`/chuyen-muc/${category.id}?garage_id=${garageId}`}
                    className="category-item wow fadeInUp"
                    data-wow-delay=".25s"
                >
                    <div className="category-img">
                        <img src={category.thumbnail} alt="" />
                    </div>
                    <div style={{ height: '43px' }}>
                        <h5>{category.name}</h5>
                    </div>
                </Link>
            ) : (
                <Link href={`/chuyen-muc/${category.id}`} className="category-item wow fadeInUp" data-wow-delay=".25s">
                    <div className="category-img">
                        <img src={category.thumbnail} alt="" />
                    </div>
                    <div style={{ height: '43px' }}>
                        <h5>{category.name}</h5>
                    </div>
                </Link>
            )}
        </div>
    );
};
export { CategoryItem };
