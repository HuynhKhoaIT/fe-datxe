import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
import { getServerSession } from 'next-auth/next';

import React from 'react';
export default async function Profile() {
    const session = await getServerSession(authOptions);
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar page="profile" />
                        </div>
                        <div className="col-lg-9">
                            <div className="card text-left">
                                <div className="card-body">
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Họ tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputFullname"
                                                placeholder="Nguyễn Văn A"
                                                value={session?.user?.name ?? ''}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Điện thoại</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="inputPhone"
                                                value={session?.user?.phone ?? ''}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail4"
                                                value={session?.user?.email ?? ''}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress"
                                                placeholder="1234 Main St"
                                                value={session?.user?.address ?? ''}
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <label className="form-label">Tỉnh thành</label>
                                            <select id="inputState" className="form-select">
                                                <option selected>Choose...</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword4" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Xác thực Password</label>
                                            <input type="password" className="form-control" id="inputPassword5" />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary">
                                                Cập nhật
                                            </button>
                                        </div>
                                    </form>
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
