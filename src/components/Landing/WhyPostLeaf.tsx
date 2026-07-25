import {
    Column,
    Heading,
    Text,
} from "@once-ui-system/core";

import RevealText from "@/components/UI/RevealText";

export default function WhyPostLeafExists() {
    return (
        <Column
            fillWidth
            horizontal="center"
            paddingY="160"
            gap="80"
        >
            <Column
                maxWidth={720}
                horizontal="center"
                gap="32"
            >
                <RevealText>
                    <Text variant="label-strong-m" onBackground="brand-weak" >Why PostLeaf Exists</Text>
                </RevealText>

                <RevealText delay={0.05}>
                    <Heading as="h2" variant="display-default-l" align="center" wrap="balance">
                        Most digital conversations <br /> aren't built to be remembered.
                    </Heading>
                </RevealText>

                <RevealText delay={0.1}>
                    <Text align="center" variant="body-default-l" onBackground="neutral-weak" wrap="balance">
                        We write birthday wishes, letters to loved ones, late-night reflections, <br /> and promises to our future selves.
                        <br /> <br />
                        Yet they're scattered across chats, emails, notes, and forgotten folders
                        <br /> <br />
                        PostLeaf was created to give those words a place where they could truly stay.
                    </Text>
                </RevealText>
            </Column>

            <Column
                maxWidth={720}
                horizontal="center"
                gap="40"
            >
                <RevealText delay={0.15}>
                    <Heading
                        variant="heading-default-xl"
                        align="center"
                    >
                        Chats get buried.
                    </Heading>
                </RevealText>

                <RevealText delay={0.2}>
                    <Heading
                        variant="heading-default-xl"
                        align="center"
                    >
                        Emails get archived.
                    </Heading>
                </RevealText>

                <RevealText delay={0.25}>
                    <Heading
                        variant="heading-default-xl"
                        align="center"
                    >
                        Notes become forgotten.
                    </Heading>
                </RevealText>

                <RevealText delay={0.35}>
                    <Heading
                        variant="display-default-m"
                        align="center"
                        onBackground="brand-strong"
                    >
                        Some words deserve better.
                    </Heading>
                </RevealText>
            </Column>
        </Column>
    );
}