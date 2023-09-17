// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ICategory } from '@/interfaces/category';
const CategoryItem = ({ key, category }: { key: number; category: ICategory }) => {
    return (
        <div className="col-6 col-md-4 col-lg-2">
            <Link href={`/chuyen-muc/${category.id}`} className="category-item wow fadeInUp" data-wow-delay=".25s">
                <div className="category-img">
                    <img src={category.thumbnail} alt="" />
                </div>
                <h5>{category.name}</h5>
            </Link>
        </div>
    );
};
export { CategoryItem };
