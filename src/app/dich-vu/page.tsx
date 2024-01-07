import React from "react";
import { SideBarFilter } from "../components/elements/shop-sidebar/sideBar";
import { Sort } from "../components/elements/shop-sort/sort";
import ServiceData from "../components/elements/service/serviceData";
import { getServices } from "@/utils/service";
import { getCategories } from "@/utils/category";
export default async function Shop() {
  const product_data = await getServices();
  const categorys = await getCategories();

  return (
    <div className="shop-area bg py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <SideBarFilter
              data={categorys}
              filterName="Danh mục"
              keyName="cat_id"
            />
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
