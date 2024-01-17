import { apiUrl } from "@/constants";
import { CategoryItem } from "../components/elements/category/categoryItem";
import { ICategory } from "@/interfaces/category";
import { getCategories } from "@/utils/category";
async function getData() {
  const res = await fetch(`${apiUrl}api/product-category`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Category() {
  let categories = await getData();

  return (
    <div>
      <div className="shop-item-wrapper pt-60 pb-60">
        <div className="row">
          {categories?.map((category: ICategory, index: number) => (
            <div className="col-md-2">
              <CategoryItem key={index} category={category} garageId={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
