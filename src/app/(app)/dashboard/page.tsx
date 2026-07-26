import { Button, Column, Heading, Row, Text, } from "@once-ui-system/core";

export default function DashboardPage() {
    return (
        <Column gap="32" paddingX={12} paddingTop={8}>
            {/* Hero */}

            <Row fillWidth horizontal="between" vertical="center">
                <Column gap="8">
                    <Heading variant="display-strong-s">Dashboard</Heading>

                    <Text onBackground="neutral-weak">Welcome back, Shubham. Ready to write something meaningful?</Text>
                </Column>

                <Button href="/write" prefixIcon="plus" label="New Letter"/>
            </Row>

            {/* Continue Writing */}

            <Column gap="16">
                <Heading variant="heading-strong-m">
                    Continue Writing
                </Heading>

                <Column
                    fillWidth
                    gap="20"
                    padding="24"
                    radius="xl"
                    background="surface"
                    border="neutral-alpha-weak"
                >
                    <Column gap="8">
                        <Text variant="heading-strong-s">
                            To Future Me
                        </Text>

                        <Row gap="8" vertical="center">
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak"
                            >
                                Draft
                            </Text>

                            <Text onBackground="neutral-weak">•</Text>

                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak"
                            >
                                Last edited 2 hours ago
                            </Text>
                        </Row>
                    </Column>

                    <Text
                        variant="body-default-m"
                        onBackground="neutral-medium"
                    >
                        Sometimes the hardest words to write are the ones meant for yourself.
                    </Text>

                    <Row>
                        <Button
                            href="/write"
                            variant="secondary"
                            label="Continue Writing"
                            suffixIcon="arrowRight"
                        />
                    </Row>
                </Column>
            </Column>

            {/* Recent Letters */}

            <Column gap="16">
                <Row horizontal="between" vertical="center">
                    <Heading variant="heading-strong-m">Recent Letters</Heading>
                    <Button href="/library" variant="tertiary" label="View All" suffixIcon="arrowRight"/>
                </Row>

                <Row fillWidth gap="16" wrap>
                    {[1, 2, 3, 4].map((letter) => (
                        <Column key={letter} flex={1} gap="16" padding="20" radius="xl" background="surface" border="neutral-alpha-weak">
                            <Column gap="8">
                                <Text variant="heading-strong-s">
                                    {[
                                        "To Future Me",
                                        "Happy Birthday, Mom",
                                        "The Day Everything Changed",
                                        "Thank You"
                                    ][letter - 1]}
                                </Text>

                                <Text variant="body-default-s" onBackground="neutral-weak">Jul {18 + letter}, 2026</Text>
                            </Column>

                            <Text variant="body-default-s" onBackground="neutral-medium">
                                {
                                    [
                                        "A reminder to never lose curiosity.",
                                        "Words I've wanted to say for years.",
                                        "Some memories deserve to stay forever.",
                                        "Gratitude often arrives late."
                                    ][letter - 1]
                                }
                            </Text>

                            <Row fillWidth horizontal="between" vertical="center">
                                <Text variant="label-default-s" onBackground="brand-medium">Draft</Text>

                                <Button href="/write" variant="tertiary" size="s" suffixIcon="arrowRight">Open</Button>
                            </Row>
                        </Column>
                    ))}
                </Row>
            </Column>

            {/* Bottom Section */}  

            <Row fillWidth gap="16" wrap>
                {/* Vault */}

                <Column flex={1} gap="20" padding="24" radius="xl" background="surface" border="neutral-alpha-weak">
                    <Column gap="8">
                        <Heading variant="heading-strong-m">Vault</Heading>
                        <Text onBackground="neutral-weak">Letters safely stored until the moment they're meant to be opened.</Text>
                    </Column>

                    <Heading variant="display-strong-s">12</Heading>

                    <Text onBackground="neutral-medium">Locked Letters</Text>

                    <Button href="/vault" variant="secondary" label="Open Vault" suffixIcon="arrowRight"/>
                </Column>

                {/* Community */}

                <Column flex={1} gap="20" padding="24" radius="xl" background="surface" border="neutral-alpha-weak">
                    <Column gap="8">
                        <Heading variant="heading-strong-m">Community</Heading>
                        <Text onBackground="neutral-weak">Read anonymous letters from people around the world.</Text>
                    </Column>

                    <Column gap="12">
                        <Text>🚧 Coming Soon</Text>

                        <Text onBackground="neutral-medium"> Discover heartfelt stories, thoughtful reflections, and writing prompts shared by the community.</Text>
                    </Column>

                    <Button href="/community" variant="tertiary" label="Learn More" suffixIcon="arrowRight"/>
                </Column>

            </Row>
        </Column>
    );
}