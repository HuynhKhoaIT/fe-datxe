import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import Link from 'next/link';
import Image from '../Images';

const cx = classNames.bind(styles);
function SearchItem({ data, onClick }) {
    return (
        <Link href={`/san-pham/${data.id}`} className={cx('wrapper')} onClick={onClick}>
            <Image className={cx('avatar')} src={data.thumbnail} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.name}</span>
                </p>
            </div>
        </Link>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default SearchItem;
