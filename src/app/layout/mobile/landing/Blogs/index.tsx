"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import BlogItem from "./BlogItem";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import Scroll from "@/app/components/common/Scroll";
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
        <div style={{ marginRight: "-12px" }}>
          <Scroll>
            {blogs?.map((blog: any, index: number) => (
              <BlogItem blog={blog} key={index} />
            ))}
          </Scroll>
        </div>
      </OverviewPanel>{" "}
    </div>
  );
};
export default Blogs;
