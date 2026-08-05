"use client";

import { ReactNode, useState } from "react";

import { Column, Row, } from "@once-ui-system/core";

// import Sidebar from "./Sidebar";
import Sidebar from "@/app/(app)/components/Sidebar";
import Header from "@/app/(app)/components/Header";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({
    children,
}: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <Row
            fill
            fillWidth
            background="page"
            style={{ minHeight: "100vh", height: "100vh", overflowX: "hidden" }}
        >
            {/* Main */}

            <Column fillHeight flex={1} as="main" minWidth={0}>
                <Header
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen((current) => !current)}
                />

                <Column fill padding="32" overflow="auto" >
                    {children}
                </Column>
            </Column>

            {/* Sidebar */}

            {sidebarOpen ? (
                <Sidebar onClose={() => setSidebarOpen(false)} />
            ) : null}
        </Row>
    );
}
