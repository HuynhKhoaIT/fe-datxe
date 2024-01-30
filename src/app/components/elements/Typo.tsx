import React from "react";

interface TypoProps {
  size?: string;
  type?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface SizeType {
  big: string;
  small: string;
  normal: string;
  primary: string;
  sub: string;
  tiny: string;
}

interface WeightType {
  bold: string;
  normal: string;
  "semi-bold": string;
  [key: string]: string; // Index signature to allow any string key
}

const Typo: React.FC<TypoProps> = ({
  size = "normal",
  type = "normal",
  children,
  className,
  style,
}) => {
  const sizeType: SizeType = {
    big: "var(--h1-font-size)",
    small: "var(--h3-font-size)",
    normal: "var(--h2-font-size)",
    primary: "var(--primary-font-size)",
    sub: "var(--sub-font-size)",
    tiny: "var(--small-font-size)",
  };

  const weightType: WeightType = {
    big: "var(--font-big)",
    bold: "var(--font-bold)",
    normal: "var(--font-normal)",
    "semi-bold": "var(--font-semi-bold)",
  };

  return (
    <div
      className={className}
      style={{
        fontSize: sizeType[size as keyof SizeType],
        fontWeight: weightType[type as keyof WeightType],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Typo;
