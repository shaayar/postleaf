import { Button, Row, Text, } from "@once-ui-system/core";

export default function Header() {
    return (
        <Row
            fillWidth
            minHeight="80"
            horizontal="between"
            vertical="center"
            paddingX="24"
            paddingY="16"
            border="neutral-alpha-weak"
            background="surface"
        >
            {/* Left */}

            <Row vertical="center">
                <Text variant="heading-strong-l">
                    Dashboard
                </Text>
            </Row>

            {/* Right */}

            <Row vertical="center">
                <Button
                    variant="secondary"
                    prefixIcon="plus"
                    href="/write"
                    label="New Letter"
                />
            </Row>
        </Row>
    );
}