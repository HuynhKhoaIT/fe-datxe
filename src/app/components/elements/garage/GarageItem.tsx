"use client";
import Link from "next/link";
import { IGarage } from "@/interfaces/garage";
import { Button, Card, Group, Image } from "@mantine/core";
import Typo from "../Typo";
import styles from "./GarageItem.module.scss";
const GarageItem = ({ garage }: { garage: IGarage }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p={20}>
        <Image
          src={garage.logo}
          h={160}
          style={{ objectFit: "fill" }}
          alt="Norway"
        />
      </Card.Section>
      <Typo size="sub" className={styles.garageName}>
        {garage.name}
      </Typo>
      <Link href={`/chuyen-gia/${garage.code}`}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
};
export { GarageItem };
