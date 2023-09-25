// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGarage } from '@/interfaces/garage';
const GarageItem = ({ key, garage }: { key: number; garage: IGarage }) => {
    return (
        <div className="col-md-6 col-lg-3">
            <div className="dealer-item wow fadeInUp" data-wow-delay=".25s">
                <div className="dealer-img">
                    {/* <span className="dealer-listing">25 Listing</span> */}
                    <img src={garage.logo} alt="" />
                </div>
                <div className="dealer-content">
                    <h4>
                        <Link href={`/chuyen-gia/${garage.id}`}>
                            <h4 className="shop-item-title">{garage.name}</h4>
                        </Link>
                    </h4>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} /> {garage.address}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <Link href={`tel:${garage.phone_number}`}>{garage.phone_number}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export { GarageItem };
