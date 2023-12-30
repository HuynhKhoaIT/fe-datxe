"use client";
import Image from "next/image";
import Link from "next/link";
import error from "../../public/assets/images/404.png";
export default function ErrorPage() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        top: 0,
        right: 0,
        bottom: 0,
        background: "#fff",
        left: 0,
      }}
    >
      <img
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        src={error.src}
        alt="404"
      />
    </div>
  );
}
