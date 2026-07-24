"use client";

// import { Heading, Text, Button, Column, Badge, Logo, Background, Row, Line, Grid, } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";
import Hero  from "@/components/hero/Hero";

const features = [
  {
    title: "Write letters",
    description: "A calm, intentional writing experience for meaningful messages.",
  },
  {
    title: "Schedule delivery",
    description: "Send letters at exactly the right moment.",
  },
  {
    title: "Organize collections",
    description: "Group letters by theme, memory, or recipient.",
  },
  {
    title: "Private & secure",
    description: "Your letters are protected with end-to-end security.",
  },
];

export default function Home() {
  const { profile } = useUser();
  return (
    // <Column fillWidth horizontal="center" paddingX="l" paddingTop="104">
    //   <Background style={{top: "-4rem"}} position="absolute" left="0" gradient={{ display: true, x: 50, y: 0, colorStart: "brand-background-strong" }}/>
    //   <Column maxWidth="m" horizontal="center" gap="160" paddingBottom="160">
    //     <Column horizontal="center" gap="l" align="center">
    //       <Badge
    //         pointerEvents="none"
    //         textVariant="code-default-s"
    //         onBackground="neutral-medium"
    //         background="brand-medium"
    //         border="brand-alpha-weak"
    //         vertical="center"
    //         gap="16"
    //       >
    //         <Logo dark icon="/trademarks/icon-dark.svg" size="s" />
    //         <Logo light icon="/trademarks/icon-light.svg" size="s" />
    //         ✖
    //         <Logo dark icon="/trademarks/icon-sb.svg" size="s" />
    //         <Logo light icon="/trademarks/icon-sb.svg" size="s" />
    //       </Badge>
    //       <Heading variant="display-strong-m" marginTop="12">
    //         Letters that arrive when they matter most
    //       </Heading>
    //       <Text
    //         variant="heading-default-l"
    //         onBackground="neutral-weak"
    //         wrap="balance"
    //         marginBottom="16"
    //       >
    //         Write, schedule, and preserve meaningful digital letters.
    //       </Text>
    //       <Row gap="8">
    //         {!profile && (
    //           <Button
    //             id="auth"
    //             href="/auth"
    //             data-border="rounded"
    //             variant="secondary"
    //             arrowIcon>
    //             Create account
    //           </Button>
    //         )}
    //         <Button
    //           id="access"
    //           href="https://once-ui.com/products/supabase-starter"
    //           data-border="rounded"
    //           arrowIcon>
    //           Get access
    //         </Button>
    //       </Row>
    //     </Column>
    //     <Column fillWidth gap="24">
    //       <Heading as="h2" variant="display-strong-xs" marginBottom="24" align="center">
    //         Powerful features in a simple app
    //       </Heading>
    //       <Grid fillWidth gap="8" columns="3" m={{columns: 2}} s={{columns: 1}}>
    //         {features.map((feature, index) => (
    //           <Column
    //             background="overlay"
    //             radius="l"
    //             padding="40"
    //             border="neutral-alpha-weak"
    //             key={index}
    //             fillWidth
    //             gap="8"
    //           >
    //             <Heading as="h3" variant="body-default-m">
    //               {feature.title}
    //             </Heading>
    //             <Text wrap="balance" onBackground="neutral-weak" variant="body-default-s">
    //               {feature.description}
    //             </Text>
    //           </Column>
    //         ))}
    //       </Grid>
    //     </Column>
    //   </Column>
    // </Column>

    <Hero />
  );
}
