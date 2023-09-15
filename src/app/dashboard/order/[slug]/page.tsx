'use client';
export default function SingleOrder({ params }: { params: { slug: string } }) {
    return (
        <main className="main">
            <div className="order-item-single bg pt-60">
                <div className="container">
                    <div className="card text-left mb-40">
                        <div className="card-body">
                            <div className="row invoice-info">
                                <div className="col-sm-4 invoice-col">
                                    THÔNG TIN CHUYÊN GIA
                                    <div>
                                        <strong>Admin, Inc.</strong>
                                        <br />
                                        795 Folsom Ave, Suite 600
                                        <br />
                                        San Francisco, CA 94107
                                        <br />
                                        Phone: (804) 123-5432
                                        <br />
                                        Email: info@almasaeedstudio.com
                                    </div>
                                </div>

                                <div className="col-sm-4 invoice-col">
                                    THÔNG TIN KHÁCH HÀNG
                                    <div>
                                        <strong>John Doe</strong>
                                        <br />
                                        795 Folsom Ave, Suite 600
                                        <br />
                                        San Francisco, CA 94107
                                        <br />
                                        Phone: (555) 539-1037
                                        <br />
                                        Email: john.doe@example.com
                                    </div>
                                </div>

                                <div className="col-sm-4 invoice-col">
                                    <b>Invoice #007612</b>
                                    <br />
                                    <br />
                                    <b>Order ID:</b> 4F3S8J
                                    <br />
                                    <b>Payment Due:</b> 2/22/2014
                                    <br />
                                    <b>Account:</b> 968-34567
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="row pb-60">
                        <div className="col-12 table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Hình</th>
                                        <th>Tên</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Call of Duty</td>
                                        <td>455-981-221</td>
                                        <td>El snort testosterone trophy driving gloves handsome</td>
                                        <td>$64.50</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Need for Speed IV</td>
                                        <td>247-925-726</td>
                                        <td>Wes Anderson umami biodiesel</td>
                                        <td>$50.00</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Monsters DVD</td>
                                        <td>735-845-642</td>
                                        <td>Terry Richardson helvetica tousled street art master</td>
                                        <td>$10.70</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Grown Ups Blue Ray</td>
                                        <td>422-568-642</td>
                                        <td>Tousled lomo letterpress</td>
                                        <td>$25.99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
