import React from 'react';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
import { getCars } from '@/utils/car';
import Link from 'next/link';
import CarItem from './CarItem';
export default async function CarsPage() {
    const cars = await getCars();
    return (
        <main className="main">
            <div className="user-profile pt-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar page="cars" />
                        </div>
                        <div className="col-lg-9">
                            <div className="user-profile-wrapper">
                                <div className="user-profile-card profile-ad">
                                    <div className="user-profile-card-header">
                                        <h4 className="user-profile-card-title">Xe của tôi</h4>
                                        <div className="user-profile-card-header-right">
                                            <div className="user-profile-search">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Tìm..." />
                                                    <i className="far fa-search"></i>
                                                </div>
                                            </div>
                                            <Link href="cars/add-car" className="theme-btn">
                                                <span className="far fa-plus-circle"></span>Thêm xe
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="table-responsive">
                                            <table className="table text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Thông tin</th>
                                                        <th>Hãng</th>
                                                        <th>Dòng</th>
                                                        <th>Năm</th>
                                                        <th>Hạn bảo dưỡng</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{cars?.map((item, index) => <CarItem item={item} />)}</tbody>
                                            </table>
                                        </div>
                                        {/* <!-- pagination --> */}
                                        {/* <div className="pagination-area">
                                            <div aria-label="Page navigation example">
                                                <ul className="pagination my-3">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">
                                                                <i className="far fa-angle-double-left"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a className="page-link" href="#">
                                                            1
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">
                                                            2
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">
                                                            3
                                                        </a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">
                                                                <i className="far fa-angle-double-right"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- user-profile end --> */}
        </main>
    );
}
