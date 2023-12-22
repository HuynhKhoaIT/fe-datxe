import React from "react";
import { SideBar } from "../components/elements/shop-sidebar/sideBar";
import { Sort } from "../components/elements/shop-sort/sort";
import ServiceData from "../components/elements/service/serviceData";
import { getServices } from "@/utils/service";
export default async function Shop() {
  const product_data = await getServices();
  return (
    <div className="shop-area bg py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            {/* <Sort lengthData={product_data?.length} /> */}
            <ServiceData product_data={product_data} />
          </div>
        </div>
      </div>
    </div>
  );
}
