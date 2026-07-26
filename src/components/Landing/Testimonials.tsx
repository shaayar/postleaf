"use client";

import { Column, Row, Text, Heading, Icon, MatrixFx, Background, AutoScroll, Fade, Avatar } from "@once-ui-system/core";

const defaultTestimonials: Testimonial[] = [
  {
    content: "I wrote a letter to myself before graduating. Reading it three years later reminded me exactly who I wanted to become.",
    name: "Arjun Mehta",
    role: "Software Engineer",
    avatar: "/images/avatars/arjun.webp",
  },
  {
    content: "It feels less like an app and more like a personal time capsule. Every letter becomes something worth returning to.",
    name: "Sophia Chen",
    role: "Product Designer",
    avatar: "/images/avatars/sophia.webp",
  },
  {
    content: "Writing here made me slow down. Instead of sending another message, I found myself saying what I actually meant.",
    name: "Ethan Walker",
    role: "Writer",
    avatar: "/images/avatars/ethan.webp",
  },
  {
    content: "Scheduling a letter for my daughter to open on her eighteenth birthday is something I'll never forget.",
    name: "Olivia Parker",
    role: "Mother",
    avatar: "/images/avatars/olivia.webp",
  },
  {
    content: "The reading experience is beautiful. It feels like opening a handwritten letter instead of another webpage.",
    name: "Noah Kim",
    role: "Creative Director",
    avatar: "/images/avatars/noah.webp",
  },
  {
    content: "I never realized how many thoughts I wanted to preserve until I had a place designed for them.",
    name: "Emma Rodriguez",
    role: "Medical Student",
    avatar: "/images/avatars/emma.webp",
  },
  {
    content: "PostLeaf helped me write things I didn't know how to say out loud. That's incredibly rare for a digital product.",
    name: "Liam Brooks",
    role: "Photographer",
    avatar: "/images/avatars/liam.webp",
  },
  {
    content: "Opening a letter I scheduled months earlier felt like receiving a gift from a younger version of myself.",
    name: "Maya Patel",
    role: "Architect",
    avatar: "/images/avatars/maya.webp",
  },
];

interface Testimonial {
  content: string;
  name: string;
  avatar?: string;
  role?: string;
  company?: string;
}

interface TestimonialsSectionProps extends React.ComponentProps<typeof Row> {
  rating?: number;
  reviewCount?: number;
  testimonials?: Testimonial[];
  scheme?: string;
}

export const Testimonials: React.FC<TestimonialsSectionProps> = ({
  rating = 4.9,
  reviewCount = 247,
  testimonials = defaultTestimonials,
  ...flex
}) => {
  return (
    <Column fillWidth gap="32" paddingX={4} {...flex}>
      <Column
        fillWidth
        maxWidth={320}
        horizontal="center"
        align="center"
        gap="16"
      >
        <Text variant="label-default-m" onBackground="brand-weak">
          Testimonials
        </Text>

        <Heading as="h2" variant="display-strong-l" align="center" wrap="balance">
          Words from the people who trusted us with theirs.
        </Heading>

        <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance">
          Every letter carries a story. Here's what our early community has to say about writing, preserving, and revisiting the moments that matter most.
        </Text>
      </Column>

      <Row fillWidth gap="20" vertical="center" xs={{ direction: "column", horizontal: "start" }}>
        <Column minWidth={14} minHeight={14} fillHeight center radius="xl" border="brand-alpha-weak" overflow="hidden" padding="l">
          <MatrixFx
            data-solid="color"
            position="absolute"
            left="0"
            top="0"
            flicker
            fps={40}
            revealFrom="top"
            size={4}
            spacing={2}
            colors={["brand-solid-strong", "static-transparent"]}
          />
          <Background
            fill
            data-solid="color"
            position="absolute"
            left="0"
            top="0"
            opacity={70}
            gradient={{
              display: true,
              colorStart: "neutral-background-weak",
            }}
          />
          <Column horizontal="center" align="center" gap="8">
            <Heading variant="heading-strong-s">Excellent</Heading>
            <Text variant="display-strong-s" wrap="balance">
              {rating.toFixed(2)}
            </Text>
            <Text onBackground="brand-weak" variant="label-default-s" wrap="balance">
              {reviewCount} Reviews
            </Text>
          </Column>
        </Column>

        <Column fillWidth paddingY="20" flex={1}>
          <Row fillWidth zIndex={1} paddingLeft="12" paddingBottom="20">
            <Heading as="h2" variant="heading-strong-l">
              Loved by many
            </Heading>
          </Row>
          <AutoScroll fillWidth speed="slow">
            {testimonials.map((testimonial, index) => (
              <Column
                key={index}
                background="page"
                radius="l"
                border
                vertical="between"
                marginRight="8"
                padding="24"
                gap="16"
                minWidth={16}
                maxWidth={16}
              >
                <Row gap="4">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Icon key={starIndex} name="star" size="xs" />
                  ))}
                </Row>
                <Row fillWidth textVariant="body-default-s" marginTop="12">
                  <Text wrap="balance">{testimonial.content}</Text>
                </Row>
                <Row fillWidth gap="12" vertical="center">
                  {(testimonial.role || testimonial.company) && (
                    <Avatar src={testimonial.avatar} size="xs" />
                  )}
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {testimonial.name}
                  </Text>
                </Row>
              </Column>
            ))}
          </AutoScroll>
          <Fade pointerEvents="none" fillHeight width={4} s={{ hide: true }} top="0" to="right" position="absolute" left="0" />
          <Fade pointerEvents="none" fillHeight width={4} s={{ hide: true }} top="0" to="left" position="absolute" right="0" />
        </Column>
      </Row>
    </Column>
  );
};
