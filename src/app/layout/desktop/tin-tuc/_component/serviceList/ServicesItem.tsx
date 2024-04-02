import React, { useState } from "react";
import styles from "./servicesItem.module.scss";
import { Card, Image, Flex, HoverCard } from "@mantine/core";
import classNames from "classnames";

import Typo from "@/app/components/elements/Typo";
import { useRouter } from "next/navigation";

const ServicesItem = ({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <HoverCard width={360} shadow="md" position="right">
      <HoverCard.Target>
        <Card
          shadow="sm"
          padding={0}
          radius="lg"
          withBorder
          //   bg="var(--product-container-bg)"
          onClick={() => router.push(`/news/${data?.id}`)}
          className={styles.card}
        >
          <Card.Section>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={data?.thumbnail}
                alt="Product Image"
                w={"100%"}
                className={styles.image}
                // style={{ objectFit: 'fill' }}
                style={{
                  objectFit: "fill",
                  transform: isHovered ? "scale(1.01)" : "scale(1)", // ZoomOut 1 lần khi hover
                  transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động mềm mại
                }}
              />
            </div>
          </Card.Section>

          <Flex
            px={"md"}
            pb={"md"}
            direction="column"
            justify={"space-between"}
            h={"100%"}
          >
            <Typo
              size="primary"
              type="bold"
              className={classNames(styles.productTitle, "limit-line")}
              style={{ marginTop: "3px", lineHeight: 1.5 }}
            >
              {data?.title}
            </Typo>
            <Flex align="center" gap={10}>
              <Typo
                size="tiny"
                style={{ color: "var(--text-color)", marginTop: 5 }}
              >
                {" Chủ đề "} {data?.category?.name}
              </Typo>
            </Flex>
          </Flex>
        </Card>
      </HoverCard.Target>
    </HoverCard>
  );
};

export default ServicesItem;
