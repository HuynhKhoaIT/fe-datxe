"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import BlogItem from "./BlogItem";
import SlickCarousel from "@/app/components/common/SlickCarousell";
const Blogs = ({ blogs }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Trung tâm tin tức"
        linkToList={"/blogs"}
        id="blogs-expert"
        fullWidth={true}
      >
        <SlickCarousel
          column={7}
          gap={8}
          dots={true}
          infinite={true}
          autoplay={true}
        >
          {blogs?.map((blog: any, index: number) => (
            <BlogItem blog={blog} key={index} />
          ))}
        </SlickCarousel>
      </OverviewPanel>{" "}
    </div>
  );
};
export default Blogs;
