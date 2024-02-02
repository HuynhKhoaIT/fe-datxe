"use client";
import React from "react";
import styles from "./index.module.scss";
import { Tabs, rem } from "@mantine/core";
import Address from "./Address";
import Reviews from "./Review";

const TabsComponent = () => {
  return (
    <div>
      <Tabs
        defaultValue="introduce"
        classNames={{ list: styles.list, tabLabel: styles.tabLabel }}
      >
        <Tabs.List>
          <Tabs.Tab value="introduce">Giới thiệu</Tabs.Tab>
          <Tabs.Tab value="evaluate">Đánh giá</Tabs.Tab>
          <Tabs.Tab value="address">Vị trí</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="introduce">
          Sửa xe là quá trình kiểm tra, chẩn đoán và sửa chữa các hỏng hóc và
          vấn đề kỹ thuật trên xe, nhằm khôi phục và duy trì hoạt động hiệu quả
          của chiếc xe. Người sửa xe phải có kiến thức và kỹ năng vững vàng về
          cơ khí, điện tử và hệ thống ô tô để xác định các sự cố và thực hiện
          các biện pháp sửa chữa phù hợp. Quá trình sửa xe bao gồm việc tìm hiểu
          lý do gây ra sự cố, thực hiện các bước kiểm tra và đo lường, phân tích
          và sửa chữa các cụm phụ tùng và hệ thống cần thiết. Việc sửa chữa xe
          thường bao gồm cả việc thay thế các bộ phận hỏng hóc, bảo dưỡng và
          điều chỉnh lại các bộ phận có vấn đề để đảm bảo hoạt động ổn định và
          an toàn.
        </Tabs.Panel>

        <Tabs.Panel value="evaluate">
          <Reviews />
        </Tabs.Panel>

        <Tabs.Panel value="address">
          <Address />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default TabsComponent;
