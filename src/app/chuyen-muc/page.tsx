import { CategoryItem } from "../components/elements/category/categoryItem";
import { ICategory } from "@/interfaces/category";
import { getCategories } from "@/utils/category";
import LayoutListProduct from "../components/layout/LayoutListProduct";
export default async function Category() {
  const category_list = await getCategories();
  return (
    <LayoutListProduct>
      <div>
        <div className="shop-item-wrapper pt-60 pb-60">
          <div className="row">
            {category_list?.map((category: ICategory, index) => (
              <div className="col-md-2">
                <CategoryItem key={index} category={category} garageId={0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutListProduct>
  );
}
