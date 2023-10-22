import { useSession } from 'next-auth/react';
const CarInfoCart = () => {
    const { data: session, status } = useSession();
    return (
        <div className="checkout-form">
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Biển số</label>
                        <input type="text" className="form-control" placeholder="Biển số" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Hãng Xe</label>
                        <input type="text" className="form-control" placeholder="Hãng Xe" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Dòng Xe</label>
                        <input type="text" className="form-control" placeholder="Dòng xe" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Năm sản xuất</label>
                        <input type="text" className="form-control" placeholder="Năm sản xuất" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export { CarInfoCart };
