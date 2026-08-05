import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";
import type { Metadata } from "next";

import { baseURL, fonts, effects, style, dataStyle } from "@/resources/once-ui.config";
import { ThemeInit, Column, Flex, Opacity, SpacingToken, Background } from "@once-ui-system/core";
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "PostLeaf",
    template: "%s | PostLeaf",
  },
  description: "The elegance of Once UI meets the power of Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >

      <head>
        <ThemeInit
          config={{
            theme: style.theme,
            brand: style.brand,
            accent: style.accent,
            neutral: style.neutral,
            solid: style.solid,
            'solid-style': style.solidStyle,
            border: style.border,
            surface: style.surface,
            transition: style.transition,
            scaling: style.scaling,
            'viz-style': dataStyle.variant,
          }}
        />
      </head>
      <Providers>
        <Column as="body" background="surface" fillWidth horizontal="center" margin="0" padding="0" minHeight="100vh">
          {children}
        </Column>
      </Providers>
    </Flex>
  );
}
