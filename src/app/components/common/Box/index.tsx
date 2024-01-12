import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import Container from "../Container";

function Box({ className, children }: any) {
  return (
    <Container>
      <div className={classNames(styles.box, className)}>{children}</div>
    </Container>
  );
}

export default Box;
