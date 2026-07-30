import { Button, Column, Icon, Logo, Row, SmartLink, Text, } from "@once-ui-system/core";

export const Footer: React.FC<React.ComponentProps<typeof Row>> = ({ ...flex }) => {

  return (
    <Column gap="40" fillWidth paddingY="l" paddingX="xl" {...flex}>
      <Row fillWidth gap="12" textVariant="label-default-m" horizontal="between" vertical="center">
        <Logo href="#" dark icon="/trademarks/wordmark-dark.svg" size="m" />
        <Logo href="#" light icon="/trademarks/wordmark-light.svg" size="m" />
        <Button
          data-border="rounded"
          size="m"
          weight="default"
          variant="tertiary"
          href="https://docs.once-ui.com/"
        >
          <Row gap="12" vertical="center">
            Preserve the words that matter.
            <Icon size="xs" name="arrowUpRight" onBackground="brand-medium" />
          </Row>
        </Button>
      </Row>
      <Row fillWidth horizontal="between" gap="40" wrap paddingX="2">
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="4" marginBottom="8">
            Product
          </Row>

          <Row>
            <SmartLink href="/features">Features</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/community">Community</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/journal">Journal</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/roadmap">Roadmap</SmartLink>
          </Row>
        </Column>

        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="4" marginBottom="8">
            Company
          </Row>

          <Row>
            <SmartLink href="/about">About</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/contact">Contact</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/changelog">Changelog</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/status">Status</SmartLink>
          </Row>
        </Column>

        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="4" marginBottom="8">
            Resources
          </Row>

          <Row>
            <SmartLink href="/privacy">Privacy Policy</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/terms">Terms of Service</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/faq">FAQ</SmartLink>
          </Row>

          <Row>
            <SmartLink href="/support">Support</SmartLink>
          </Row>
        </Column>

        <Column data-border="rounded" gap="12" textVariant="label-default-m">
          <Row paddingX="4" marginBottom="8">
            Social
          </Row>

          <Button
            href="https://github.com/shaayar/postleaf"
            size="s"
            variant="secondary"
            weight="default"
            prefixIcon="github"
            label="GitHub"
          />

          <Button
            href="https://www.linkedin.com/in/shubham-dave-369682249/"
            size="s"
            variant="secondary"
            weight="default"
            prefixIcon="linkedin"
            label="LinkedIn"
          />

          <Button
            href="https://www.threads.com/@shubh.builds.web"
            size="s"
            variant="secondary"
            weight="default"
            prefixIcon="threads"
            label="Threads"
          />

          <Button
            href="https://www.instagram.com/shubh.builds.web/"
            size="s"
            variant="secondary"
            weight="default"
            prefixIcon="instagram"
            label="Instagram"
          />
        </Column>
      </Row>
      <Row fillWidth textVariant="label-default-s" gap="12">
        {new Date().getFullYear()} <Text>•</Text> PostLeaf
        <Text onBackground="neutral-weak">
          Built with Once UI
        </Text>
      </Row>
    </Column>
  );
};
