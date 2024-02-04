"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import Scroll from "@/app/components/common/Scroll";
import BlogItem from "@/app/layout/desktop/danh-muc/Blogs/BlogItem";
const Blogs = ({ blogs }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Bài viết danh mục"
        linkToList={"/blogs"}
        id="blogs-expert"
      >
        <div style={{ marginRight: "-12px" }}>
          <Scroll>
            {blogs?.map((blog: any, index: number) => (
              <BlogItem blog={blog} key={index} />
            ))}
          </Scroll>
        </div>
      </OverviewPanel>
    </div>
  );
};
export default Blogs;
