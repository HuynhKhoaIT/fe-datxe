import React from "react";
import Product from "../elements/product/ListProductHot";
import Categories from "../elements/category/categories";
export default function ProductListItem({
  dataSource,
  title,
  label = "Nổi bật",
  limit,
  subTitle = "Hot",
  isCategory = false,
  style,
  className,
  garageId = 0,
}: any) {
  return (
    <div className="car-area bg pt-40 pb-40" style={style && style}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">
                <i className="flaticon-drive"></i> {label}
              </span>
              <h2 className="site-title">
                {title} <span>{subTitle}</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        {isCategory ? (
          <Categories initialCategoryData={dataSource} garageId={0} />
        ) : (
          <Product
            initialProductData={dataSource}
            limit={limit}
            garageId={garageId}
          />
        )}
      </div>
    </div>
  );
}
