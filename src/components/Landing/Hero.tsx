"use client";

import { Background, Button, Column, Heading, Row, Text, } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";
import { RevealFx } from "@once-ui-system/core";

export default function Hero() {
    const { profile } = useUser();

    return (
        <Column
            position="relative"
            fillWidth
            horizontal="center"
            vertical="center"
            overflow="hidden"
            style={{
                minHeight: "100dvh",
            }}
        >
            {/* Background Video */}

            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src="/loop.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}

            <Background
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                background="overlay"
                style={{ opacity: 0.65 }}
                zIndex={1}
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
                    y: 0,
                    width: 100,
                    height: 100,
                    colorStart: "brand-alpha-weak",
                    colorEnd: "static-transparent",
                }}
                zIndex={2}
            />

            {/* Content */}

            <Column
                position="relative"
                zIndex={3}
                maxWidth="m"
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
                        Some words deserve
                        <br />
                        to last forever.
                    </RevealFx>
                </Heading>

                <Text
                    variant="heading-default-l"
                    align="center"
                    // onBackground="neutral-medium"
                    wrap="balance"
                >
                    <RevealFx delay={0.6} translateY={2}>
                        Write personal letters, preserve meaningful moments, and share stories that <br /> outlive the moment they were written.
                    </RevealFx>
                </Text>

                <Row
                    gap="12"
                    marginTop="16"
                    wrap
                    horizontal="center"
                >
                    <RevealFx delay={0.9} translateY={2}>
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
