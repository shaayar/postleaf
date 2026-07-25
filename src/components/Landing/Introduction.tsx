import {
    Animation,
    Background,
    Button,
    Column,
    Grid,
    Heading,
    Media,
    Row,
    Text,
} from "@once-ui-system/core";

const introduction = {
    eyebrow: "A place for words that matter",
    title: "More than messages.\nA home for moments worth keeping.",
    description:
        "PostLeaf is where personal letters, memories, and stories live beyond the moment they were written. Write without distraction, preserve what matters, and return whenever life brings you back.",
    image: "/images/editor-ss.png", // Replace with actual screenshot
};

const pillars = [
    {
        title: "Write",
        description:
            "A calm, distraction-free editor designed for thoughtful letters.",
    },
    {
        title: "Preserve",
        description:
            "Organize memories into collections you'll revisit for years.",
    },
    {
        title: "Share",
        description:
            "Keep letters private or publish stories for others to discover.",
    },
    {
        title: "Revisit",
        description:
            "Return to your words whenever you want to relive a moment.",
    },
];

export const Introduction: React.FC<
    React.ComponentProps<typeof Column>
> = ({ ...flex }) => {
    return (
        <Column
            fillWidth
            horizontal="center"
            paddingY="160"
            paddingX={4}
            position="relative"
            overflow="hidden"
            {...flex}
        >
            <Column
                fill
                position="absolute"
                style={{
                    transform: "skewY(-4deg)",
                }}
            >
                <Background
                    fill
                    // data="neutral-medium"
                    mask={{
                        cursor: true,
                    }}
                />
            </Column>

            <Column maxWidth="xl" fillWidth gap="80">

                {/* Hero Layout */}

                <Row
                    fillWidth
                    vertical="center"
                    gap="64"
                    s={{
                        direction: "column",
                        // gap: "40",
                    }}
                >
                    <Column fillWidth gap="24">

                        <Text
                            variant="label-strong-m"
                            onBackground="brand-weak"
                        >
                            {introduction.eyebrow}
                        </Text>

                        <Heading
                            as="h2"
                            variant="display-default-m"
                            wrap="balance"
                        >
                            {introduction.title}
                        </Heading>

                        <Text
                            variant="body-default-l"
                            onBackground="neutral-weak"
                            wrap="balance"
                            style={{
                                maxWidth: "36rem",
                            }}
                        >
                            {introduction.description}
                        </Text>
                    </Column>

                    <Media
                        fillWidth
                        radius="l"
                        src={introduction.image}
                        alt="PostLeaf writing experience"
                    />
                </Row>

                {/* Pillars */}

                <Grid
                    columns={4}
                    m={{ columns: 2 }}
                    s={{ columns: 1 }}
                    gap="12"
                >
                    {pillars.map((pillar) => (
                        <Animation
                            key={pillar.title}
                            // fade
                            duration={500}
                        >
                            <Column
                                fillWidth
                                padding="32"
                                gap="16"
                                border="neutral-alpha-medium"
                                radius="l"
                            >
                                <Heading
                                    as="h3"
                                    variant="heading-strong-s"
                                >
                                    {pillar.title}
                                </Heading>

                                <Text
                                    variant="body-default-s"
                                    onBackground="neutral-weak"
                                    wrap="balance"
                                >
                                    {pillar.description}
                                </Text>
                            </Column>
                        </Animation>
                    ))}
                </Grid>
            </Column>
        </Column>
    );
};