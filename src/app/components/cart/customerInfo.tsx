import { useSession } from 'next-auth/react';
const CustomerInfo = () => {
    const { data: session, status } = useSession();
    return (
        <div className="checkout-widget">
            <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
            <div className="checkout-form">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Họ Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Họ Tên"
                                value={session?.user?.name ?? ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập Email"
                                value={session?.user?.email ?? ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
                                value={session?.user?.phone ?? ''}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export { CustomerInfo };
