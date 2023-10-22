import Link from 'next/link';
import { getMyAccount } from '@/utils/user';
const ProfileSidebar = async ({ page = 'dashboard' }: { page: string }) => {
    const myAccount = await getMyAccount();
    return (
        <div className="user-profile-sidebar">
            <div className="user-profile-sidebar-top">
                <div className="user-profile-img">
                    <img src="/assets/img/account/user.jpg" alt="" />
                    <button type="button" className="profile-img-btn">
                        <i className="far fa-camera"></i>
                    </button>
                    <input type="file" className="profile-img-file" />
                </div>
                <h5>{myAccount?.name}</h5>
                <p>{myAccount?.phone}</p>
            </div>
            <ul className="user-profile-sidebar-list">
                <li>
                    <Link href="/dashboard" className={`list-group-item ${page == 'dashboard' && 'active'}`}>
                        <i className="far fa-gauge-high"></i> Tổng quan
                    </Link>
                </li>
                <li>
                    <Link href="dashboard/profile" className={`list-group-item ${page == 'profile' && 'active'}`}>
                        <i className="far fa-user"></i> Hồ sơ của tôi
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/cars" className={`list-group-item ${page == 'cars' && 'active'}`}>
                        <i className="far fa-layer-group"></i> Danh sách xe
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/order" className={`${page == 'orders' && 'active'}`}>
                        <i className="far fa-plus-circle"></i> Đơn hàng
                    </Link>
                </li>
                <li>
                    <Link href="/dang-xuat">
                        <i className="far fa-sign-out"></i>
                        Đăng xuất
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export { ProfileSidebar };
