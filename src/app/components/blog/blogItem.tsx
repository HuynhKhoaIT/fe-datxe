'use client';
import Link from 'next/link';

const BlogItem = () => {
    return (
        <div className="blog-item wow fadeInUp" data-wow-delay=".50s">
            <div className="blog-item-img">
                <img src="assets/img/blog/02.jpg" alt="Thumb" />
            </div>
            <div className="blog-item-info">
                <div className="blog-item-meta">
                    <ul>
                        <li>
                            <Link href="#">
                                <i className="far fa-user-circle"></i> By Alicia Davis
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <i className="far fa-calendar-alt"></i> January 29, 2023
                            </Link>
                        </li>
                    </ul>
                </div>
                <h4 className="blog-title">
                    <Link href="chi-tiet-bai-viet">There are many variations of passage available.</Link>
                </h4>
                <Link className="theme-btn" href="chi-tiet-bai-viet">
                    Read More<i className="fas fa-arrow-right-long"></i>
                </Link>
            </div>
        </div>
    );
};
export { BlogItem };
