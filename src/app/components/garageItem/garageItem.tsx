// 'use client';
import Link from 'next/link';
import { IGarage } from '@/interfaces/garage';
const GarageItem = ({ garage }: { garage: IGarage }) => {
    return (
        <div>
            <div className="dealer-item wow fadeInUp" data-wow-delay=".25s">
                <div className="dealer-img">
                    {/* <span className="dealer-listing">25 Listing</span> */}
                    <img src={garage.logo} alt="" />
                </div>
                <div className="dealer-content">
                    <h4>
                        <Link href={`/chuyen-gia/${garage.code}?garageId=${garage.id}`}>
                            <h4 className="shop-item-title">{garage.name}</h4>
                        </Link>
                    </h4>
                    {/* <ul>
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} /> {garage.address}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <Link href={`tel:${garage.phone_number}`}>{garage.phone_number}</Link>
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>
    );
};
export { GarageItem };
