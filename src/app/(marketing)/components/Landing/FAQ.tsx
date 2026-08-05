"use client";

import { useState } from "react";
import {
  Accordion,
  Column,
  Heading,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core";

interface FaqCategory {
  id: string;
  label: string;
  icon: string;
  items: { title: string; content: string }[];
  description: string;
}

const categories: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    description: "Learn the basics",
    icon: "sparkles",
    items: [
      {
        title: "What is PostLeaf?",
        content:
          "PostLeaf is a place to write meaningful digital letters to yourself or the people you care about. Instead of disappearing into chats or emails, your words are preserved as lasting memories.",
      },
      {
        title: "Is PostLeaf free to use?",
        content:
          "Yes. You can start writing for free. Additional premium features may become available in the future.",
      },
    ],
  },
  {
    id: "letters",
    label: "Letters",
    description: "Writing & delivery",
    icon: "mail",
    items: [
      {
        title: "Can I schedule a letter for the future?",
        content:
          "Yes. Choose exactly when your letter should arrive, whether that's tomorrow, next year, or many years from now.",
      },
      {
        title: "Can I edit a letter after sending it?",
        content:
          "Drafts can be edited freely. Once a letter has been delivered, its contents are preserved to maintain the authenticity of that moment.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Security & ownership",
    icon: "lock",
    items: [
      {
        title: "Who can read my letters?",
        content:
          "Your letters are private by default. Only you, or the people you intentionally share them with, can access them.",
      },
      {
        title: "Is my data secure?",
        content:
          "Your letters are securely stored, and we never sell or use their contents for advertising.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    description: "Profile & access",
    icon: "person",
    items: [
      {
        title: "Can I write letters to myself?",
        content:
          "Absolutely. Many people use PostLeaf as a journal for their future selves, capturing memories they'll revisit years later.",
      },
      {
        title: "Which devices does PostLeaf support?",
        content:
          "PostLeaf works in modern browsers across desktop, tablet, and mobile, so your memories are always within reach.",
      },
    ],
  },
];

export const FAQ = (flex: React.ComponentProps<typeof Column>) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const active = categories.find((category) => category.id === activeCategory) ?? categories[0];

  return (
    <Column fillWidth horizontal="center" gap="48" {...flex}>
      <Column
        fillWidth
        gap="8"
        horizontal="center"
        align="center"
      >
        <Text
          variant="label-default-m"
          onBackground="brand-weak"
        >
          Frequently Asked Questions
        </Text>

        <Heading
          as="h2"
          variant="display-strong-m"
          wrap="balance"
          align="center"
        >
          Everything you need to know.
        </Heading>

        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
          align="center"
        >
          Still have questions? We're here to help you preserve what matters most.
        </Text>
      </Column>

      <Row fillWidth gap="24" s={{ direction: "column" }}>
        <Column maxWidth={20} gap="8">
          {categories.map((category) => (
            <Row
              key={category.id}
              fillWidth
              gap="12"
              padding="12"
              radius="l"
              border={activeCategory === category.id ? "brand-alpha-medium" : "neutral-alpha-weak"}
              background={activeCategory === category.id ? "brand-alpha-weak" : "transparent"}
              vertical="center"
              onClick={() => setActiveCategory(category.id)}
              cursor="interactive"
            >
              <Icon
                name={category.icon}
                size="s"
                onBackground={activeCategory === category.id ? "brand-medium" : "neutral-weak"}
              />
              <Column gap="2" flex={1}>
                <Text variant="label-default-s">{category.label}</Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  {category.description}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>

        <Column fillWidth gap="8">
          {active.items.map((item) => (
            <Column key={item.title} fillWidth border radius="l" padding="4" background="overlay">
              <Accordion title={<Text variant="body-default-s">{item.title}</Text>}>
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {item.content}
                </Text>
              </Accordion>
            </Column>
          ))}
        </Column>
      </Row>
    </Column>
  );
};