import ProductData from "../product/ProductData";
import { Sort } from "../shop-sort/sort";
const TableDataProduct = ({ data }: { data: any }) => {
  return (
    <div>
      {data.length > 8 ? (
        <Sort lengthData={data?.length ?? 0} />
      ) : (
        <h5>Hiển thị {data.length} sản phẩm</h5>
      )}
      <div className="shop-item-wrapper">
        <div className="row">
          <ProductData product_data={data} />
        </div>
      </div>
    </div>
  );
};

export { TableDataProduct };
