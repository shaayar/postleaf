"use client";

import { ReactNode } from "react";

import {
    Column,
    Row,
} from "@once-ui-system/core";

import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({
    children,
}: AppLayoutProps) {
    return (
        <Row
            fill
            background="page"
        >
            {/* Sidebar */}

            <Sidebar />

            {/* Main */}

            <Column fill fillHeight >
                <AppHeader />

                <Column fill padding="32" overflow="auto" >
                    {children}
                </Column>
            </Column>
        </Row>
    );
}