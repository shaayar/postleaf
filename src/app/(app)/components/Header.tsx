"use client";

import { Button, Logo, Row, Text } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { appNav, accountNav } from "@/lib/navigation";

interface AppHeaderProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Header({
    sidebarOpen,
    onToggleSidebar,
}: AppHeaderProps) {
    const pathname = usePathname();

    // Combine all navigation items to map paths to labels
    const allNav = [...appNav, ...accountNav];
    const currentPage = allNav.find((item) => item.href === pathname);
    const pageTitle = currentPage?.label || "Dashboard";

    return (
        <Row
            fillWidth
            minHeight="80"
            horizontal="between"
            vertical="center"
            paddingX="24"
            paddingY="16"
            border="neutral-alpha-weak"
            background="surface"
        >
            {/* Left */}

            <Row gap="32" vertical="center">
                <Logo
                    dark
                    icon="/trademarks/wordmark-dark.svg"
                    href="/"
                    size="s"
                />

                <Logo
                    light
                    icon="/trademarks/wordmark-light.svg"
                    href="/"
                    size="s"
                />
            </Row>

            {/* Center */}

            <Row vertical="center">
                <Text variant="heading-strong-l">
                    {pageTitle}
                </Text>
            </Row>

            {/* Right */}

            <Row vertical="center" gap="12">
                <Button
                    prefixIcon={sidebarOpen ? "chevronRight" : "chevronLeft"}
                    label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                    onClick={onToggleSidebar}
                    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                />
                <Button
                    variant="secondary"
                    prefixIcon="edit"
                    href="/profile/edit"
                    label="Edit Profile"
                />
            </Row>
        </Row>
    );
}
