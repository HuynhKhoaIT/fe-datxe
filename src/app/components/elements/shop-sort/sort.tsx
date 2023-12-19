import React from "react";
import { Select } from "@mantine/core";
export async function Sort({ lengthData }: { lengthData: number }) {
  return (
    <div className="shop-sort">
      <h5>Hiển thị {lengthData} sản phẩm</h5>
      <div>
        <Select
          placeholder="Sắp xếp theo mặc định"
          data={[
            "Sắp xếp theo mặc định",
            "Sắp xếp theo nổi bật",
            "Sắp xếp theo mới nhất",
            "Sắp xếp theo giá thấp",
            "Sắp xếp theo giá cao",
          ]}
        />
      </div>
    </div>
  );
}
