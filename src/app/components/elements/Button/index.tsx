import React from "react";
import Loader from "@/assets/icons/loader.svg";
import styles from "./index.module.scss";
import classNames from "classnames";
const Button = ({
  className,
  refControl,
  onSubmit,
  onClick,
  loading = false,
  disabled,
  children,
  style,
  hidden,
  ...props
}: any) => {
  return (
    <button
      className={classNames(styles.submitBtn, className)}
      onSubmit={onSubmit}
      disabled={disabled}
      style={style}
      onClick={onClick}
      hidden={hidden}
      {...props}
      ref={refControl}
    >
      {!loading ? (
        children
      ) : (
        <img src={Loader.src} className={styles.spinner} />
      )}
    </button>
  );
};

export default Button;
