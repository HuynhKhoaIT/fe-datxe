import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
const ImgButton = ({
  className,
  style,
  onClick,
  img,
  revert,
}: // width = "70px",
// height = "70px",
any) => {
  return (
    <div
      className={classNames(styles.button, className)}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <div>
        <img
          className={styles.button__image}
          // src={`${URL_IMG}${item?.img}`}
          src={img}
          alt="product"
          style={revert ? { transform: "rotate(180deg)" } : {}}
        />
      </div>
    </div>
  );
};

export default ImgButton;
