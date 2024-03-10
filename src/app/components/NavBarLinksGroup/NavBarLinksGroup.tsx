"use client";
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classNames from "classnames";

import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const pathname = usePathname();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      data-active={link.link === pathname || undefined}
      href={link.link}
      key={link.label}
      className={classNames(classes.link)}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      {link ? (
        <Link
          data-active={link === pathname || undefined}
          onClick={() => {
            setOpened((o) => !o);
          }}
          href={link}
          className={classNames(classes.control)}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ width: 18, height: 18 }} />
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </Link>
      ) : (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ width: rem(18), height: rem(18) }} />

              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
