"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Background,
  Row,
  Line,
  Grid,
} from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";

const features = [
  {
    title: "Email authentication",
    description: "Built-in email authentication with password reset.",
  },
  {
    title: "User management",
    description: "Simple user management with role-based access control.",
  },
  {
    title: "Rate limiting",
    description: "Rate limiting to prevent abuse and protect your application.",
  },
  {
    title: "Profile page",
    description: "Built-in profile page to showcase an efficient CRUD API setup.",
  },
  {
    title: "Routing setup",
    description: "A simple routing setup with the Next.js app router.",
  },
  {
    title: "Ready to build",
    description: "Just copy-paste any Once UI component or block to extend the app.",
  },
];

const setupSteps: { title: string }[] = [
  { title: "Create a Supabase project" },
  { title: "Run the SQL script to create the database" },
  { title: "Create an Upstash Redis instance" },
  { title: "Add your API keys" },
];

export default function Home() {
  const { profile } = useUser();
  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="104">
      <Background style={{top: "-4rem"}} position="absolute" left="0" gradient={{ display: true, x: 50, y: 0, colorStart: "brand-background-strong" }}/>
      <Column maxWidth="m" horizontal="center" gap="160" paddingBottom="160">
        <Column horizontal="center" gap="l" align="center">
          <Badge
            pointerEvents="none"
            textVariant="code-default-s"
            onBackground="neutral-medium"
            background="brand-medium"
            border="brand-alpha-weak"
            vertical="center"
            gap="16"
          >
            <Logo dark icon="/trademarks/icon-dark.svg" size="s" />
            <Logo light icon="/trademarks/icon-light.svg" size="s" />
            ✖
            <Logo dark icon="/trademarks/icon-sb.svg" size="s" />
            <Logo light icon="/trademarks/icon-sb.svg" size="s" />
          </Badge>
          <Heading variant="display-strong-m" marginTop="12">
            The elegance of Once UI meets the power of Supabase
          </Heading>
          <Text
            variant="heading-default-l"
            onBackground="neutral-weak"
            wrap="balance"
            marginBottom="16"
          >
            A simple app boilerplate with Once UI, Supabase and Next.js
          </Text>
          <Row gap="8">
            {!profile && (
              <Button
                id="auth"
                href="/auth"
                data-border="rounded"
                variant="secondary"
                arrowIcon>
                Create account
              </Button>
            )}
            <Button
              id="access"
              href="https://once-ui.com/products/supabase-starter"
              data-border="rounded"
              arrowIcon>
              Get access
            </Button>
          </Row>
        </Column>
        <Column fillWidth gap="24">
          <Heading as="h2" variant="display-strong-xs" marginBottom="24" align="center">
            Powerful features in a simple app
          </Heading>
          <Grid fillWidth gap="8" columns="3" m={{columns: 2}} s={{columns: 1}}>
            {features.map((feature, index) => (
              <Column
                background="overlay"
                radius="l"
                padding="40"
                border="neutral-alpha-weak"
                key={index}
                fillWidth
                gap="8"
              >
                <Heading as="h3" variant="body-default-m">
                  {feature.title}
                </Heading>
                <Text wrap="balance" onBackground="neutral-weak" variant="body-default-s">
                  {feature.description}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
        <Column fillWidth horizontal="center" gap="24">
          <Heading as="h2" variant="display-strong-xs" marginBottom="48" align="center">
            Start building in 5 minutes
          </Heading>
          {setupSteps.map((step, index) => (
            <Column key={index} fillWidth gap="24" horizontal="center">
              <Row
                minWidth="40"
                maxWidth="40"
                minHeight="40"
                center
                radius="full"
                solid="brand-medium"
                onSolid="brand-strong"
              >
                {index + 1}
              </Row>
              <Heading as="h3" variant="heading-strong-s">
                {step.title}
              </Heading>
              {index < setupSteps.length - 1 && (
                <Row minWidth="40" maxWidth="40" minHeight="40" center>
                  <Line vert fillHeight/>
                </Row>
              )}
            </Column>
          ))}
        </Column>
      </Column>
    </Column>
  );
}
