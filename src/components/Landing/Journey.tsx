import {
  Column,
  Heading,
  Icon,
  Media,
  Row,
  Text,
} from "@once-ui-system/core";

const section = {
  eyebrow: "A Letter's Journey",
  title: "From a passing thought to a lasting memory.",
  description:
    "Every meaningful letter follows a simple path, from writing and preserving to revisiting years later.",
};

const journey = [
  {
    eyebrow: "Step 01",
    title: "Write",
    description:
      "Start with a blank page and let your thoughts flow. Whether it's a heartfelt letter, a late-night reflection, or a note to your future self, PostLeaf gives your words a calm place to begin.",
    icon: "edit",
    image: "/images/mockups/editor.png",
  },
  {
    eyebrow: "Step 02",
    title: "Preserve",
    description:
      "Choose how your letter should live. Keep it private, share it instantly, or schedule it to arrive months or even years into the future.",
    icon: "lock",
    image: "/images/mockups/preserve.png",
  },
  {
    eyebrow: "Step 03",
    title: "Revisit",
    description:
      "Over time, every letter becomes part of your personal archive. Return to the memories, milestones, and moments that shaped your story.",
    icon: "book",
    image: "/images/mockups/archive.png",
  },
];

export const Journey: React.FC< React.ComponentProps<typeof Column> > = ({ ...rest }) => {
  return (
    <Column
      fillWidth
      horizontal="center"
      gap="80"
      paddingY={8}
      paddingX={4}
      {...rest}
    >
      <Column
        maxWidth={720}
        horizontal="center"
        align="center"
        gap="16"
      >
        <Text
          variant="label-default-l"
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
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
        >
          {section.description}
        </Text>
      </Column>

      <Column
        fillWidth
        maxWidth="xl"
        gap="128"
      >
        {journey.map((item, index) => (
          <Row
            key={item.title}
            fillWidth
            gap="48"
            vertical="center"
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            m={{
              direction: "column",
              // gap: "32",
            }}
          >
            <Row flex={6}>
              <Media
                src={item.image}
                alt={item.title}
                aspectRatio="16 / 10"
                radius="xl"
                sizes={900}
              />
            </Row>

            <Column
              flex={4}
              gap="20"
              horizontal={index % 2 === 0 ? "start" : "end"}
              align={index % 2 === 0 ? "start" : "end"}
              m={{
                horizontal: "center",
                // align: "center",
              }}
            >
              <Row
                gap="12"
                vertical="center"
              >
                <Icon
                  name={item.icon}
                  size="s"
                  onBackground="brand-weak"
                />

                <Text
                  variant="label-default-s"
                  onBackground="brand-weak"
                >
                  {item.eyebrow}
                </Text>
              </Row>

              <Heading
                as="h3"
                variant="display-strong-s"
                align={index % 2 === 0 ? "left" : "right"}
                // m={{ align: "center" }}
              >
                {item.title}
              </Heading>

              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                wrap="balance"
                align={index % 2 === 0 ? "left" : "right"}
                // m={{ align: "center" }}
              >
                {item.description}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  );
};