import { Column, Heading, Row, Text } from "@once-ui-system/core";

const section = {
    eyebrow: "Core Experiences",
    title: "Designed for words worth keeping.",
    description:
        "From your first draft to years later, every part of PostLeaf is built around giving meaningful words a lasting home.",
};

const primaryExperiences = [
    {
        title: "Write Freely",
        description:
            "A calm editor designed for letters, reflections, and stories.",
        mediaHeight: 34,
        background: "surface",
        media: <>Large Editor Screenshot</>,
    },
    {
        title: "Preserve Forever",
        description:
            "Keep letters private, schedule them for the future, or share them when you're ready.",
        mediaHeight: 34,
        background: "page",
        media: <>Locked Letter Preview</>,
    },
];

const secondaryExperiences = [
    {
        title: "Schedule Delivery",
        description: "Some words belong to another day.",
        mediaHeight: 22,
        background: "page",
        media: <>Small Calendar UI</>,
    },
    {
        title: "Share Beautifully",
        description: "Every letter opens like a beautifully designed page.",
        mediaHeight: 22,
        background: "surface",
        media: <>Reader Mockup</>,
    },
    {
        title: "Revisit Memories",
        description: "Build a personal timeline of the moments that matter.",
        mediaHeight: 22,
        background: "page",
        media: <>Archive / Timeline Screenshot</>,
    },
];

export const Experiences: React.FC<
    React.ComponentProps<typeof Column>
> = ({ ...rest }) => {
    return (
        <Column
            fillWidth
            horizontal="center"
            gap="64"
            // paddingY="160"
            paddingX={4}
            {...rest}
        >
            <Column
                maxWidth={720}
                horizontal="center"
                align="center"
                gap="16"
            >
                <Text
                    variant="label-default-m"
                    onBackground="brand-weak"
                >
                    {section.eyebrow}
                </Text>

                <Heading
                    as="h2"
                    variant="display-strong-l"
                    align="center"
                    wrap="balance"
                >
                    {section.title}
                </Heading>

                <Text
                    variant="body-default-l"
                    onBackground="neutral-weak"
                    align="center"
                    wrap="balance"
                >
                    {section.description}
                </Text>
            </Column>

            <Column fillWidth gap="24">
                {/* Primary */}
                <Row
                    fillWidth
                    gap="24"
                    s={{ direction: "column" }}
                >
                    {primaryExperiences.map((tile) => (
                        <Column
                            key={tile.title}
                            flex={1}
                            radius="xl"
                            border="neutral-alpha-medium"
                            background={tile.background as any}
                            overflow="hidden"
                        >
                            <Column gap="8" padding="xl">
                                <Heading
                                    as="h3"
                                    variant="heading-strong-xl"
                                >
                                    {tile.title}
                                </Heading>

                                <Text
                                    variant="body-default-m"
                                    onBackground="neutral-weak"
                                    wrap="balance"
                                >
                                    {tile.description}
                                </Text>
                            </Column>

                            <Row
                                fillWidth
                                height={tile.mediaHeight}
                                padding="l"
                            >
                                <Row
                                    fill
                                    center
                                    background="surface"
                                    radius="xl"
                                    border="neutral-alpha-medium"
                                    overflow="hidden"
                                >
                                    {tile.media}
                                </Row>
                            </Row>
                        </Column>
                    ))}
                </Row>

                {/* Secondary */}
                <Row
                    fillWidth
                    gap="24"
                    m={{ direction: "column" }}
                >
                    {secondaryExperiences.map((tile) => (
                        <Column
                            key={tile.title}
                            flex={1}
                            radius="xl"
                            border="neutral-alpha-medium"
                            background={tile.background as any}
                            overflow="hidden"
                        >
                            <Column gap="8" padding="l">
                                <Heading
                                    as="h3"
                                    variant="heading-strong-l"
                                >
                                    {tile.title}
                                </Heading>

                                <Text
                                    variant="body-default-m"
                                    onBackground="neutral-weak"
                                    wrap="balance"
                                >
                                    {tile.description}
                                </Text>
                            </Column>

                            <Row
                                fillWidth
                                height={tile.mediaHeight}
                                padding="l"
                            >
                                <Row
                                    fill
                                    center
                                    background="surface"
                                    radius="xl"
                                    border="neutral-alpha-medium"
                                    overflow="hidden"
                                >
                                    {tile.media}
                                </Row>
                            </Row>
                        </Column>
                    ))}
                </Row>
            </Column>
        </Column>
    );
};