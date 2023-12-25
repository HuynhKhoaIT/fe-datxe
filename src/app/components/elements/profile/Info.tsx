"use client";

import React, { useState } from "react";
export default function InfoProfile() {
  return (
    <div className="user-profile-card profile-ad">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thông tin hồ sơ</h4>
      </div>
      <div className="card-body">
        <div className="card-info">
          <div className="card-info__code">
            <span>Mã khách hàng:</span> <span>1232322</span>
          </div>
          <div className="card-info__point">
            <span>Điểm hiện có:</span> <span>140000</span>
          </div>
          <div className="card-info__customer">
            <span>Thành viên:</span> <span>bạc</span>
          </div>
          <div className="card-code">
            <span>Mã thẻ:</span> <span>Xe747484848848</span>
          </div>
        </div>
      </div>
    </div>
  );
}
