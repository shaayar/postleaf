"use client";

import { useRouter } from "next/navigation";

import { Button, Column, Row, Text } from "@once-ui-system/core";

import { useUser } from "@/components/UserProvider";
import { createClient } from "@/lib/sb/client";
import { accountNav, appNav } from "@/lib/navigation";

import StaggeredMenu from "./StaggeredMenu";

export default function Sidebar() {
  const router = useRouter();
  const { profile, userEmail } = useUser();

  const logout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/auth");
  };

  const footerName = profile?.username?.trim() || "Account";
  const footerEmail = userEmail || "Signed in";

  const primaryItems = appNav.map((item) => ({
    label: item.label,
    link: item.href,
    icon: item.icon,
    ariaLabel: item.label,
  }));

  const secondaryItems = accountNav.map((item) => ({
    label: item.label,
    link: item.href,
    icon: item.icon,
    ariaLabel: item.label,
  }));

  return (
    <Column
      as="aside"
      width={280}
      fillHeight
      background="surface"
      border="neutral-alpha-weak"
      style={{ overflow: "visible", position: "relative" }}
    >
      <StaggeredMenu
        position="left"
        isFixed={false}
        className="sidebar-staggered"
        logoUrl="/trademarks/wordmark-dark.svg"
        colors={["#f4efe8", "#ebe3da", "#e2d8cd"]}
        menuButtonColor="#111827"
        openMenuButtonColor="#111827"
        accentColor="#7c6f61"
        items={primaryItems}
        secondaryItems={secondaryItems}
        displaySocials={false}
        displayItemNumbering
        closeOnClickAway
        footerContent={
          <Column gap="16">
            <hr />
            <Row
              fillWidth
              horizontal="between"
              vertical="center"
              gap="16"
            >
              <Column gap="2">
                <Text variant="label-default-s">{footerName}</Text>
                <Text
                  variant="body-default-xs"
                  onBackground="neutral-weak"
                >
                  {footerEmail}
                </Text>
              </Column>
              <Button
                variant="tertiary"
                size="s"
                prefixIcon="logout"
                onClick={logout}
                aria-label="Log out"
              />
            </Row>
          </Column>
        }
      />
    </Column>
  );
}
