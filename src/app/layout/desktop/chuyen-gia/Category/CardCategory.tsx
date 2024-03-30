import Link from "next/link";
import { ICategory } from "@/interfaces/category";
import { Group } from "@mantine/core";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
import styles from "./CartCategory.module.scss";
const CardCategory = ({
  key,
  category,
  garageId,
}: {
  key: number;
  category: ICategory;
  garageId: any;
}) => {
  return (
    <div key={key} className={styles.wrapper}>
      {garageId > 0 ? (
        <Link
          href={`/chuyen-muc/${category.id}?garage_id=${garageId}`}
          data-wow-delay=".25s"
          className={styles.ItemCat}
        >
          <div>
            <ImageField src={category.image} width={60} />
          </div>
          <Typo
            size="sub"
            className={styles.titleItem}
            style={{ transition: "var(--transition)" }}
          >
            {category.title}
          </Typo>
        </Link>
      ) : (
        <Link
          href={`/chuyen-muc/${category.id}`}
          data-wow-delay=".25s"
          className={styles.ItemCat}
        >
          <div>
            <ImageField src={category.image} width={60} height={60} fit />
          </div>
          <Typo
            size="sub"
            className={styles.titleItem}
            style={{ transition: "var(--transition)" }}
          >
            {category.title}
          </Typo>
        </Link>
      )}
    </div>
  );
};
export { CardCategory };
