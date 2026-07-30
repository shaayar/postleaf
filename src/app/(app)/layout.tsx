import { Column, Row } from "@once-ui-system/core";
import Sidebar from "@/app/(marketing)/components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row fillWidth background="page" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Column as="main" fillWidth flex={1}>
        {children}
      </Column>
    </Row>
  );
}