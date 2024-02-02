import { Button, Select } from "@mantine/core";
import styles from "./index.module.scss";
const Book = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.listItem}>
        <li className={styles.item}>
          <Select
            classNames={{ label: styles.label }}
            label="Vị trí"
            variant="unstyled"
            placeholder="Chọn vị trí"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </li>
        <li className={styles.item}>
          <Select
            classNames={{ label: styles.label }}
            variant="unstyled"
            label="Hãng xe"
            placeholder="Chọn hãng xe"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </li>
        <li className={styles.item}>
          <Select
            classNames={{ label: styles.label }}
            variant="unstyled"
            label="Dòng xe"
            placeholder="Chọn dòng xe"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </li>
        <li className={styles.item}>
          <Select
            classNames={{ label: styles.label }}
            variant="unstyled"
            label="Năm sản xuất"
            placeholder="Chọn năm sản xuất"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </li>
        <li className={styles.itemBtn}>
          <Button h={47} fullWidth color="var(--yellow-btn)">
            Tìm kiếm
          </Button>
        </li>
      </ul>
    </div>
  );
};
export default Book;
