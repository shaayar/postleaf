"use client";

import { usePathname, useRouter } from "next/navigation";

import { Avatar, Column, DropdownWrapper, Icon, IconButton, Line, Option, Row, Text, ToggleButton, User, } from "@once-ui-system/core";

import { useUser } from "@/components/UserProvider";
import { createClient } from "@/lib/sb/client";
import { sidebarPrimaryNav, sidebarWorkspaceNav } from "@/lib/navigation";

interface SidebarProps {
  onClose: () => void;
}

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function formatDisplayName(value: string) {
  return value
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, userEmail } = useUser();

  const logout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push("/auth");
  };

  const rawHandle =
    profile?.username?.trim() ||
    userEmail?.split("@")[0]?.trim() ||
    "reader";
  const displayName = formatDisplayName(rawHandle);
  const username = `@${rawHandle.toLowerCase()}`;
  const avatarSrc = profile?.avatar_url?.trim() || undefined;
  const avatarValue = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Column
      as="aside"
      // width={280}
      // minWidth={280}
      maxWidth={20}
      fillHeight
      background="surface"
      borderLeft="neutral-alpha-weak"
      overflow="hidden"
      padding="16"
      position={"absolute"}
      gap="16"
      style={{ flex: "0 0 280px", flexShrink: 0, boxSizing: "border-box", right: 0 }}
    >
      <Row fillWidth horizontal="between" vertical="center">
        
        <IconButton
          variant="ghost"
          size="s"
          icon="chevronRight"
          tooltip="Close sidebar"
          tooltipPosition="bottom"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      </Row>

      <Column gap="12" fillWidth>
        <DropdownWrapper
          fillWidth
          placement="bottom-end"
          trigger={
            <Row
              fillWidth
              padding="8"
              radius="m"
              horizontal="between"
              vertical="center"
              cursor="interactive"
              border="neutral-alpha-weak"
            >
              <User
                name={displayName}
                subline={username}
                avatarProps={
                  avatarSrc
                    ? { src: avatarSrc }
                    : { value: avatarValue, empty: true }
                }
              />
              <Icon name="chevronsLeftRight" onBackground="neutral-weak" />
            </Row>
          }
          dropdown={
            <Column maxWidth={24} fitWidth padding="4" gap="2" tabIndex={-1}>
              <Option
                value="current-account"
                hasPrefix={
                  avatarSrc ? (
                    <Avatar src={avatarSrc} />
                  ) : (
                    <Avatar value={avatarValue} empty />
                  )
                }
                label={displayName}
                description={
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {username}
                  </Text>
                }
              />
              <Line />
              <Option
                value="switch-account"
                hasPrefix={<Icon name="person" onBackground="neutral-weak" />}
                label="Add account"
                description="Future support for account switching"
              />
              <Line />
              <Option
                value="sign-out"
                danger
                hasPrefix={<Icon name="close" onBackground="neutral-weak" />}
                label="Sign out"
                description="End this session"
                onClick={() => {
                  void logout();
                }}
              />
            </Column>
          }
        />
      </Column>

      <Column
        fill
        gap="16"
        overflowY="auto"
        scrollbar="minimal"
        paddingRight="4"
      >
        <Column gap="4">
          {sidebarPrimaryNav.map((item) => (
            <ToggleButton
              key={item.href}
              fillWidth
              horizontal="start"
              selected={isActiveRoute(pathname, item.href)}
              href={item.href}
              prefixIcon={item.icon}
              label={item.label}
            />
          ))}
        </Column>

        <Column gap="8" paddingTop="8">
          <Text
            variant="label-default-s"
            onBackground="neutral-weak"
            paddingX="8"
          >
            Workspace
          </Text>
          <Line />
          <Column gap="4">
            {sidebarWorkspaceNav.map((item) => (
              <ToggleButton
                key={item.href}
                fillWidth
                horizontal="start"
                selected={isActiveRoute(pathname, item.href)}
                href={item.href}
                prefixIcon={item.icon}
                label={item.label}
              />
            ))}
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
