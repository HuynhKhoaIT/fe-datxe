import React, { Fragment } from "react";
import styles from "./index.module.scss";
import ServicesItem from "./ServicesItem";
import SkeLeton from "@/app/components/elements/Skeleton";
const ServiceList = ({ data }: any) => {
  return (
    <div className={styles.servicesList}>
      {data ? (
        data?.data?.map((category: any) => {
          return (
            <ServicesItem
              style={{ marginTop: "1.5rem" }}
              data={category}
              key={category?.id}
              renderLink={category?.length > 3}
              renderTitle={true}
            />
          );
        })
      ) : (
        <SkeLeton numRow={18} />
      )}
    </div>
  );
};

export default ServiceList;
