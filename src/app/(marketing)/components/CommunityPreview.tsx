import { Badge, Button, Column, Grid, Heading, Icon, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

const section = {
  eyebrow: "Community",
  title: "Every letter tells a story.",
  description:
    "Explore a growing collection of public letters shared by people around the world. Moments of gratitude, love, growth, and everything in between.",
};

const categories = [
  "All",
  "Future Self",
  "Family",
  "Love",
  "Growth",
  "Friendship",
];

const letters = [
  {
    title: "Dear Future Me",
    preview:
      "If you're reading this, I hope you never stopped chasing the things that made you feel alive. Keep choosing curiosity over comfort...",
    category: "Future Self",
    readTime: "3 min read",
    likes: 248,
  },
  {
    title: "To My Dad",
    preview:
      "There are so many things I never said out loud. Thank you for showing up, even on the days I didn't notice...",
    category: "Family",
    readTime: "4 min read",
    likes: 381,
  },
  {
    title: "For The Days You Feel Lost",
    preview:
      "You don't need to have everything figured out today. Just take one more step. Then another...",
    category: "Growth",
    readTime: "2 min read",
    likes: 194,
  },
  {
    title: "The Day We Met",
    preview:
      "Some memories refuse to fade. I still remember the way we laughed over absolutely nothing...",
    category: "Love",
    readTime: "5 min read",
    likes: 412,
  },
];

export const CommunityPreview: React.FC< React.ComponentProps<typeof Column> > = ({ ...rest }) => {
  return (
    <Column
      fillWidth
      horizontal="center"
      gap="64"
      {...rest}
    >
      <Column
        fillWidth
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
          align="center"
          wrap="balance"
          onBackground="neutral-weak"
        >
          {section.description}
        </Text>
      </Column>

      <Row
        gap="12"
        wrap
        horizontal="center"
      >
        {categories.map((category, index) => (
          <Badge
            key={category}
            background={index === 0 ? "brand-medium" : "neutral-medium"}
            cursor="pointer"
            effect={false}
          >
            {category}
          </Badge>
        ))}
      </Row>

      <Grid
        columns={2}
        s={{ columns: 1 }}
        fillWidth
        gap="24"
      >
        {letters.map((letter) => (
          <Column
            key={letter.title}
            fillWidth
            background="surface"
            border="neutral-alpha-medium"
            radius="xl"
            padding="m"
            gap="24"
          >
            <Column gap="12">
              <Tag variant="brand" position="absolute" top="0" right="0">{letter.category}</Tag>
              <Heading
                as="h3"
                variant="heading-strong-l"
              >
                {letter.title}
              </Heading>

              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                wrap="balance"
              >
                {letter.preview}
              </Text>
            </Column>

            <Column gap="16">
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                {letter.readTime}
              </Text>

              <Row
                fillWidth
                horizontal="between"
                vertical="center"
              >
                <Row gap="8" vertical="center">
                  <Icon
                    name="heart"
                    size="s"
                    onBackground="neutral-weak"
                  />

                  <Text
                    variant="body-default-s"
                    onBackground="neutral-weak"
                  >
                    {letter.likes}
                  </Text>
                </Row>

                <Button
                  variant="tertiary"
                  suffixIcon="arrowRight"
                >
                  Read
                </Button>
              </Row>
            </Column>
          </Column>
        ))}
      </Grid>

      <SmartLink href="/community">
        <Button
          variant="secondary"
          suffixIcon="arrowRight"
        >
          Explore Community
        </Button>
      </SmartLink>
    </Column>
  );
};