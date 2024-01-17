import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import Container from "../Container";

function Box({ className, children, stylesProps }: any) {
  return (
    <Container>
      <div className={classNames(styles.box, className)} style={stylesProps}>
        {children}
      </div>
    </Container>
  );
}

export default Box;
