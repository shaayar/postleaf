import { Animation, BlobFx, Column, Grid, Heading, Icon, Text } from "@once-ui-system/core";

const features = [
  {
    title: "Private by Default",
    description:
      "Every letter belongs to you. Nothing is public unless you choose to share it.",
    icon: "lock",
  },
  {
    title: "Thoughtfully Timed",
    description:
      "Deliver letters tomorrow, next year, or decades from now. The right words deserve the right moment.",
    icon: "calendar",
  },
  {
    title: "Made to Last",
    description:
      "Unlike chats that disappear into history, your letters remain organized and easy to revisit.",
    icon: "archive",
  },
  {
    title: "Beautiful to Read",
    description:
      "A calm, distraction-free reading experience designed to make every letter feel special.",
    icon: "book",
  },
  {
    title: "Accessible Anywhere",
    description:
      "Whether you're at home or across the world, your memories are always within reach.",
    icon: "globe",
  },
  {
    title: "Built with Care",
    description:
      "Every interaction is crafted to help you slow down, reflect, and write with intention.",
    icon: "heart",
  },
];

export const Privacy: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column fillWidth gap="40" {...flex} paddingX={4} paddingTop={8}>
      <Column
        maxWidth="m"
        paddingX="40"
        gap="12"
      >
        <Text
          variant="label-default-m"
          onBackground="brand-weak"
        >
          Why PostLeaf
        </Text>

        <Heading
          as="h2"
          variant="display-default-s"
        >
          More than a place to write.
          <Text onBackground="brand-weak">
            {" "}A place to remember.
          </Text>
        </Heading>

        <Text
          onBackground="neutral-weak"
          variant="body-default-l"
        >
          Every detail is designed to make meaningful writing feel calm,
          personal, and lasting.
        </Text>
      </Column>
      <Grid fillWidth gap="12" columns="3" m={{ columns: 2 }} s={{ columns: 1 }}>
        <BlobFx position="absolute" right="0" bottom="0" />
        {features.map((feature, index) => (
          <Animation key={index} zoomOut={1.02} fade={1} triggerType="hover" duration={300}>
            <Column
              background="surface"
              radius="s"
              padding="32"
              border
              fillWidth
              gap="8"
            >
              <Icon padding="8" name={feature.icon} onBackground="brand-weak" size="m" radius="m" border="brand-alpha-medium" background="brand-alpha-weak" />
              <Heading marginTop="12" as="h3" variant="body-default-m">
                {feature.title}
              </Heading>
              <Text wrap="balance" onBackground="neutral-weak" variant="body-default-s">
                {feature.description}
              </Text>
            </Column>
          </Animation>
        ))}
      </Grid>
    </Column>
  );
};
