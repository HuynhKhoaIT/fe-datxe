import Menu from '../components/profile-sidebar/Menu';
export default async function Setting() {
    return (
        <main className="main">
            {/* <!-- user-profile --> */}
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <Menu />
                        </div>
                        <div className="col-lg-9">
                            <div className="user-profile-wrapper">
                                <div className="user-profile-card profile-setting">
                                    <h4 className="user-profile-card-title">Settings</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h6 className="mb-3">Privacy Setting</h6>
                                            <div className="profile-privacy-setting">
                                                <form action="#">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            name="privacy-setting"
                                                            value="1"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="privacy-setting-1"
                                                            checked
                                                        />
                                                        <label className="form-check-label" htmlFor="privacy-setting-1">
                                                            Enable Messages
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            name="privacy-setting"
                                                            value="2"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="privacy-setting-2"
                                                        />
                                                        <label className="form-check-label" htmlFor="privacy-setting-2">
                                                            I Want To Receive Email Notify
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            name="privacy-setting"
                                                            value="3"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="privacy-setting-3"
                                                            checked
                                                        />
                                                        <label className="form-check-label" htmlFor="privacy-setting-3">
                                                            Hide My Phone Number From Public
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            name="privacy-setting"
                                                            value="4"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="privacy-setting-4"
                                                        />
                                                        <label className="form-check-label" htmlFor="privacy-setting-4">
                                                            I Want To Receive Message
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            name="privacy-setting"
                                                            value="5"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="privacy-setting-5"
                                                            checked
                                                        />
                                                        <label className="form-check-label" htmlFor="privacy-setting-5">
                                                            Make My Profile Private
                                                        </label>
                                                    </div>
                                                    <div className="my-4">
                                                        <button type="submit" className="theme-btn">
                                                            <span className="far fa-gear"></span>Update Settings
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <h6 className="mb-3">Delete Account</h6>
                                            <div className="user-profile-form">
                                                <form action="#">
                                                    <div className="form-group">
                                                        <select className="select mb-4">
                                                            <option value="">Choose Reason</option>
                                                            <option value="1">Reason One</option>
                                                            <option value="2">Reason Two</option>
                                                            <option value="3">Reason Three</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea
                                                            className="form-control"
                                                            cols={30}
                                                            rows={4}
                                                            placeholder="Describe Your Reason"
                                                        ></textarea>
                                                    </div>
                                                    <div className="my-4">
                                                        <button type="submit" className="theme-btn">
                                                            <span className="far fa-trash-can"></span>Delete Account
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
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
