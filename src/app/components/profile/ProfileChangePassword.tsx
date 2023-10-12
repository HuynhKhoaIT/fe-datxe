import React from 'react';
function ProfileChangePassword() {
    return (
        <div className="user-profile-card">
            <h4 className="user-profile-card-title">Change Password</h4>
            <div className="col-lg-12">
                <div className="user-profile-form">
                    <form action="#">
                        <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" className="form-control" placeholder="Old Password" />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" placeholder="New Password" />
                        </div>
                        <div className="form-group">
                            <label>Re-Type Password</label>
                            <input type="password" className="form-control" placeholder="Re-Type Password" />
                        </div>
                        <button type="button" className="theme-btn my-3">
                            <span className="far fa-key"></span> Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileChangePassword;
