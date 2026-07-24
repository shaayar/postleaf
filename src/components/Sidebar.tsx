"use client";

import { Button, Column, Icon, Logo, Row, SmartLink, Text, } from "@once-ui-system/core";
import { appNav, accountNav } from "@/lib/navigation";

export default function Sidebar() {
  return (
    <Column
      width={280}
      fillHeight
      padding="20"
      gap="24"
      border="neutral-alpha-weak"
      background="surface"
      horizontal="between"
    >
      {/* Top */}
      <Column gap="24">
        <Row>
          <Logo
            dark
            icon="/trademarks/wordmark-dark.svg"
            href="/dashboard"
            size="s"
          />
          
          <Logo
            light
            icon="/trademarks/wordmark-light.svg"
            href="/dashboard"
            size="s"
          />
        </Row>
      </Column>

      <Column gap="4">
        {appNav.map((item) => (
          <SmartLink
            key={item.href}
            href={item.href}
          >
            <Row
              fillWidth
              gap="12"
              paddingY="12"
              paddingX="12"
              radius="l"
              vertical="center"
            >
              <Icon
                name={item.icon}
                size="s"
              />
              <Text>{item.label}</Text>
            </Row>
          </SmartLink>
        ))}
      </Column>

      {/* Bottom */}
      <Column gap="20">
        <hr />
        <Column gap="4">
          {accountNav.map((item) => (
            <SmartLink
              key={item.href}
              href={item.href}
            >
              <Row
                fillWidth
                gap="12"
                paddingY="12"
                paddingX="12"
                radius="l"
                vertical="center"
              >
                <Icon
                  name={item.icon}
                  size="s"
                />
                <Text>{item.label}</Text>
              </Row>
            </SmartLink>
          ))}
        </Column>
        <hr />
        <Row
          fillWidth
          horizontal="between"
          vertical="center"
          paddingX="8"
        >
          <Column gap="2">
            <Text variant="label-default-s">Shubham Dave</Text>
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
            >
              shubham@example.com
            </Text>
          </Column>
          <Button
            variant="tertiary"
            size="s"
            prefixIcon="logout"
          />
        </Row>
      </Column>
    </Column>
  );
}
