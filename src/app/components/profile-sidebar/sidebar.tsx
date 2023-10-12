'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IUser } from '@/interfaces/user';

const ProfileSidebar = ({ myAccount }: { myAccount: IUser }) => {
    const router = useRouter();
    function handleLogout() {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
        }
    }
    console.log(myAccount);
    return (
        <div className="user-profile-sidebar">
            <div className="user-profile-sidebar-top">
                <div className="user-profile-img">
                    <img src="assets/img/account/user.jpg" alt="" />
                    <button type="button" className="profile-img-btn">
                        <i className="far fa-camera"></i>
                    </button>
                    <input type="file" className="profile-img-file" />
                </div>
                <h5>{myAccount.name}</h5>
                <p>{myAccount.phone}</p>
            </div>
            <ul className="user-profile-sidebar-list">
                <li>
                    <Link href="dashboard">
                        <i className="far fa-gauge-high"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="profile">
                        <i className="far fa-user"></i> My Profile
                    </Link>
                </li>
                <li>
                    <Link href="profile-listing">
                        <i className="far fa-layer-group"></i> My Listing
                    </Link>
                </li>
                <li>
                    <Link href="add-listing">
                        <i className="far fa-plus-circle"></i> Add Listing
                    </Link>
                </li>
                <li>
                    <Link className="active" href="profile-favorite">
                        <i className="far fa-heart"></i> My Favorites
                    </Link>
                </li>
                <li>
                    <Link href="profile-messages">
                        <i className="far fa-envelope"></i> Messages <span className="badge badge-danger">02</span>
                    </Link>
                </li>
                <li>
                    <Link href="profile-setting">
                        <i className="far fa-gear"></i> Settings
                    </Link>
                </li>
                <li>
                    <Link href="/dang-nhap" onClick={handleLogout}>
                        <i className="far fa-sign-out"></i> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export { ProfileSidebar };
