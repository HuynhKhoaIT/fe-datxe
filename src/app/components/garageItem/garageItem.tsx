'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
const GarageItem = ({
    garageId,
    name,
    thumbnail,
    address,
    phone_number,
}: {
    garageId: number;
    name: string;
    thumbnail: string;
    address: string;
    phone_number: string;
}) => {
    return (
        <div key={garageId} className="col-md-6 col-lg-3">
            <div className="dealer-item wow fadeInUp" data-wow-delay=".25s">
                <div className="dealer-img">
                    <span className="dealer-listing">25 Listing</span>
                    <img src={thumbnail} alt="" />
                </div>
                <div className="dealer-content">
                    <h4>
                        <Link href={`/chuyen-gia/${garageId}`}>
                            <h4 className="shop-item-title">{name}</h4>
                        </Link>
                    </h4>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} /> {address}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <Link href={`tel:${phone_number}`}>{phone_number}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export { GarageItem };
