// 'use client';
// import { getMyAccount } from '@/utils/user';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { IUser } from '@/interfaces/user';
// function ProfileInfo() {
//     const { data: session } = useSession();
//     const token = session ? session?.user?.token : null;
//     const [myAccount, setMyAccount] = useState<IUser | null>(null); // IUser là kiểu dữ liệu của dữ liệu tài khoản
//     useEffect(() => {
//         const fetchData = async () => {
//             if (token) {
//                 try {
//                     // const accountData = await getMyAccount(token);
//                     // setMyAccount(accountData);
//                 } catch (error) {
//                     console.error('Lỗi khi lấy thông tin tài khoản:', error);
//                 }
//             }
//         };

//         fetchData();
//     }, [token]);
//     console.log(myAccount);
//     return (
//         <div className="user-profile-card">
//             <h4 className="user-profile-card-title">Thông tin khách hàng</h4>
//             <div className="user-profile-form">
//                 <form action="#">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="form-group">
//                                 <label>Họ và tên</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={myAccount?.name}
//                                     placeholder="Last Name"
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="form-group">
//                                 <label>Email</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={myAccount?.email}
//                                     placeholder="Email"
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="form-group">
//                                 <label>Số điện thoại</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={myAccount?.phone}
//                                     placeholder="Phone"
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-12">
//                             <div className="form-group">
//                                 <label>Địa chỉ</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={myAccount?.address}
//                                     placeholder="Address"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <button type="button" className="theme-btn my-3">
//                         <span className="far fa-user"></span> Save Changes
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ProfileInfo;
