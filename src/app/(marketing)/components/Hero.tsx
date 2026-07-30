"use client";

import { Background, Button, Column, Fade, Heading, Media, Row, Text, } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";
import { RevealFx } from "@once-ui-system/core";

export function Hero() {
    const { profile } = useUser();

    return (
        <Column
            fillWidth
            horizontal="center"
            overflow="hidden"
            minHeight="100dvh"
            paddingBottom={10}
            vertical="end"
        >
            {/* Background Video */}

            <Media
                src="/loop.mp4"
                autoplay
                sound={false}
                loop
                position="absolute"
                left="0"
                top="0"
                fillHeight
            />

            {/* Dark Overlay */}

            <Fade
                position="absolute"
                left="0"
                bottom="0"
                base="surface"
                to="top"
                height={12}
            />

            <Fade
                position="absolute"
                left="0"
                top="0"
                base="surface"
                height={12}
            />

            {/* Gradient */}

            <Background
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                gradient={{
                    display: true,
                    x: 50,
                    y: 100,
                    colorStart: "surface-background",
                }}
            />

            {/* Content */}

            <Column
                maxWidth="s"
                gap="24"
                horizontal="center"
                align="center"
                paddingX="24"
            >
                <Heading
                    variant="display-strong-l"
                    align="center"
                >
                    <RevealFx translateY={2} >
                        Some words deserve to last forever
                    </RevealFx>
                </Heading>

                <RevealFx delay={0.6} translateY={2} horizontal="center">
                    <Text
                        variant="heading-default-l"
                        align="center"
                        // onBackground="neutral-medium"
                        wrap="balance"
                    >
                            Write personal letters, preserve meaningful moments, and share stories that outlive the moment they were written.
                    </Text>
                </RevealFx>

                <Row
                    marginTop="16"
                    wrap
                    horizontal="center"
                >
                    <RevealFx delay={0.9} translateY={2} gap="8">
                        <Button
                            href={profile ? "/dashboard" : "/auth?state=login"}
                            label="Start Writing"
                        />

                        <Button
                            href={profile ? "/community" : "/auth?state=login"}
                            variant="secondary"
                            label="Explore Community"
                        />
                    </RevealFx>
                </Row>
            </Column>
        </Column>
    );
}
