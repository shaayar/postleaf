"use client";

import { Background, Button, Column, Heading, Row, Text, } from "@once-ui-system/core";

export default function Hero() {
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
                    variant="display-strong-xl"
                    align="center"
                >
                    Some words deserve
                    <br />
                    to last forever.
                </Heading>

                <Text
                    variant="heading-default-l"
                    align="center"
                    onBackground="neutral-medium"
                    wrap="balance"
                >
                    Write personal letters, preserve meaningful moments,
                    and share stories that outlive the moment they were written.
                </Text>

                <Row
                    gap="12"
                    marginTop="16"
                    wrap
                    horizontal="center"
                >
                    <Button
                        href="/auth?state=signup"
                        label="Start Writing"
                    />

                    <Button
                        href="/community"
                        variant="secondary"
                        label="Explore Community"
                    />
                </Row>
            </Column>
        </Column>
    );
}