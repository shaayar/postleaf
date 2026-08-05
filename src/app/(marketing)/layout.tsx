import { Column } from "@once-ui-system/core";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Column
      fillWidth
      horizontal="center"
      minHeight="100vh"
    >
      <Header position="sticky" />
      <Column as="main" fillWidth flex={1}>
        {children}
      </Column>
      <Footer />
    </Column>
  );
}