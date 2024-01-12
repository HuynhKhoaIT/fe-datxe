import Link from "next/link";
import { ICategory } from "@/interfaces/category";
import styles from "./index.module.scss";
import Typo from "../Typo";
import ImageField from "../../form/ImageField";
import { Group } from "@mantine/core";
const CategoryItem = ({
  key,
  category,
  garageId,
}: {
  key: number;
  category: ICategory;
  garageId: any;
}) => {
  return (
    <div key={key}>
      {garageId > 0 ? (
        <Link
          href={`/chuyen-muc/${category.id}?garage_id=${garageId}`}
          data-wow-delay=".25s"
          className={styles.ItemCat}
        >
          <div>
            <ImageField src={category.thumbnail} height={"60px"} />
          </div>
          <Typo
            size="sub"
            className={styles.titleItem}
            style={{ transition: "var(--transition)", height: "56px" }}
          >
            {category.name}
          </Typo>
        </Link>
      ) : (
        <Link
          href={`/chuyen-muc/${category.id}`}
          data-wow-delay=".25s"
          className={styles.ItemCat}
        >
          <div>
            <ImageField src={category.thumbnail} height={"60px"} />
          </div>
          <Typo
            size="sub"
            className={styles.titleItem}
            style={{ transition: "var(--transition)", height: "56px" }}
          >
            {category.name}
          </Typo>
        </Link>
      )}
    </div>
  );
};
export { CategoryItem };
