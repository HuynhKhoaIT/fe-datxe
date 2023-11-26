'use client';
import Link from 'next/link';
import { getMyAccount } from '@/utils/user';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { IUser } from '@/interfaces/user';
import { usePathname } from 'next/navigation';
import { IconLogout } from '@tabler/icons-react';
const ProfileSidebar = () => {
    const pathname = usePathname();
    const parts = pathname.split('/');
    let page = parts[parts.length - 1];
    const { data: session } = useSession();
    const token = session?.user?.token;

    const [myAccount, setMyAccount] = useState<IUser>();

    const fetchAccount = async () => {
        try {
            if (token) {
                const myAccount = await getMyAccount(token);
                setMyAccount(myAccount);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchAccount();
    }, [token]);
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
                    <Link href="/dashboard/profile" className={`list-group-item ${page == 'profile' && 'active'}`}>
                        <i className="far fa-user"></i> Hồ sơ của tôi
                    </Link>
                </li>
                <li>
                    <Link
                        href="/dashboard/cars"
                        className={`list-group-item ${(page == 'cars' || page == 'add-car') && 'active'}`}
                    >
                        <i className="far fa-layer-group"></i> Danh sách xe
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/order" className={`${page == 'order' && 'active'}`}>
                        <i className="far fa-plus-circle"></i> Đơn hàng
                    </Link>
                </li>
                <li>
                    <Link style={{ display: 'flex', alignItems: 'center' }} href={'/'} onClick={() => signOut()}>
                        <IconLogout size={20} />
                        <p style={{ marginLeft: '8px' }}>Đăng Xuất</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export { ProfileSidebar };
