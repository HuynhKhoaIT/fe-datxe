'use client';
import { GarageItem } from '../components/garageItem/garageItem';
import React from 'react';
import { getGarages } from '@/utils/garage';
import { IGarage } from '@/interfaces/garage';
export default async function Expert() {
    const garage_data = await getGarages();
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area car-area list bg pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop-item-wrapper">
                                <div className="row">
                                    {garage_data.map((garage: IGarage, index) => (
                                        <GarageItem garage={garage} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <div aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    <i className="far fa-arrow-left"></i>
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
                                                    <i className="far fa-arrow-right"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
