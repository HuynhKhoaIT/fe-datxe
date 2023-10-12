import React from 'react';
function StoreInfo() {
    return (
        <div className="user-profile-card profile-store">
            <h4 className="user-profile-card-title">Store Info</h4>
            <div className="col-lg-12">
                <div className="user-profile-form">
                    <form action="#">
                        <div className="form-group">
                            <div className="store-logo-preview">
                                <img src="assets/img/store/logo.jpg" alt="" />
                            </div>
                            <input type="file" className="store-file" />
                            <button type="button" className="theme-btn store-upload">
                                <span className="far fa-upload"></span> Upload Logo
                            </button>
                        </div>
                        <div className="form-group">
                            <div className="store-banner-preview">
                                <img src="assets/img/store/banner.jpg" alt="" />
                            </div>
                            <input type="file" className="store-file" />
                            <button type="button" className="theme-btn store-upload mb-4">
                                <span className="far fa-upload"></span> Upload Banner
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Store Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value="Automotive Car"
                                placeholder="Store Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value="+2 123 654 7898"
                                placeholder="Contact Phone Number"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value="antoni@example.com"
                                placeholder="Contact Email"
                            />
                        </div>
                        <button type="button" className="theme-btn my-3">
                            <span className="far fa-save"></span> Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StoreInfo;
