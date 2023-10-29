import React from 'react';
export async function Sort({ lengthData }: { lengthData: number }) {
    return (
        <div className="shop-sort">
            <h5>Hiển thị 8 sản phẩm trong {lengthData} sản phẩm</h5>
            <div className="shop-sort-box">
                <select className="select">
                    <option value="1">Sort By Default</option>
                    <option value="5">Sort By Featured</option>
                    <option value="2">Sort By Latest</option>
                    <option value="3">Sort By Low Price</option>
                    <option value="4">Sort By High Price</option>
                </select>
            </div>
        </div>
    );
}
