
"use client";
import { Column, TiltFx, Background, Heading, Text, Button, BlobFx } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";

/**
 * CTA Component
 * 
 * A simple, thoughtful space for your words
 */
export const CTA: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const { profile } = useUser();

  return (
    <TiltFx fillWidth {...flex} paddingX={8}>
      <Column
        border
        background="page"
        paddingX="32"
        radius="xl"
        overflow="hidden"
        paddingY="160"
        fillWidth
      >
        <Background
          position="absolute"
          top="0"
          left="0"
          mask={{
            x: 50,
            y: 0,
            radius: 40,
          }}
          grid={{
            display: true,
            color: "neutral-alpha-weak",
            width: "2rem",
            height: "2rem",
          }}
        />
        <BlobFx
          position="absolute"
          top="0"
          left="0"
          translateY="65%"
        />
        <Column horizontal="center" gap="16" fillWidth>
          <Heading align="center" as="h2" variant="display-default-l">
            Begin your letter
          </Heading>
          <Text align="center" variant="body-default-l" marginBottom="48">
            A simple, thoughtful space for your words
          </Text>
          <Button
            arrowIcon
            id="feature-9"
            weight="default"
            label="Start writing"
            href={profile ? "/community" : "/auth?state=login"}
          />
        </Column>
      </Column>
    </TiltFx>
  )
};