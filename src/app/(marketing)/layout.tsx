import { Column } from "@once-ui-system/core";
import { Footer, Header } from "@/components";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Column
      fillWidth
      horizontal="center"
      background="page"
      style={{ minHeight: "100vh" }}
    >
      <Header />
      <Column as="main" fillWidth flex={1}>
        {children}
      </Column>
      <Footer />
    </Column>
  );
}
