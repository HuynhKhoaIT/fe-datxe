import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
const Container = ({ children, className }: any) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

export default Container;
