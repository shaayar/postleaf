"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, } from "react";

import { gsap } from "gsap";

import { Avatar, Background, Button, Column, Fade, Icon, Logo, Option, Row, SmartLink, Text, UserMenu, } from "@once-ui-system/core";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";

const NAV_ITEMS = [
    {
        label: "Home",
        href: "/dashboard",
        icon: "home",
    },
    {
        label: "Write",
        href: "/write",
        icon: "edit",
    },
    {
        label: "Library",
        href: "/library",
        icon: "book",
    },
    {
        label: "Community",
        href: "/community",
        icon: "group",
    },
    {
        label: "Vault",
        href: "/vault",
        icon: "lock",
    },
];

export const Header: React.FC<React.ComponentProps<typeof Row>> = ({
    ...flex
}) => {
    const { profile } = useUser();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    const layerOneRef = useRef<HTMLDivElement>(null);
    const layerTwoRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const menuItemsRef = useRef<HTMLDivElement>(null);

    const plusHRef = useRef<HTMLSpanElement>(null);
    const plusVRef = useRef<HTMLSpanElement>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const logout = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.push("/auth");
    };

    const navigateAndClose = (href: string) => {
        closeMenu();
        router.push(href);
    };

    useLayoutEffect(() => {
        if (
            !layerOneRef.current ||
            !layerTwoRef.current ||
            !panelRef.current
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(layerOneRef.current, {
                xPercent: 100,
            });

            gsap.set(layerTwoRef.current, {
                xPercent: 100,
            });

            gsap.set(panelRef.current, {
                xPercent: 100,
            });

            if (menuItemsRef.current) {
                gsap.set(Array.from(menuItemsRef.current.children), {
                    opacity: 0,
                    y: 32,
                });
            }

            if (plusHRef.current) {
                gsap.set(plusHRef.current, {
                    rotate: 0,
                });
            }

            if (plusVRef.current) {
                gsap.set(plusVRef.current, {
                    rotate: 90,
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const openMenu = useCallback(() => {
        setMenuOpen(true);

        tlRef.current?.kill();

        tlRef.current = gsap.timeline();

        tlRef.current
            .to(layerOneRef.current, {
                xPercent: 0,
                duration: .45,
                ease: "power4.out",
            })
            .to(
                layerTwoRef.current,
                {
                    xPercent: 0,
                    duration: .45,
                    ease: "power4.out",
                },
                "-=.35"
            )
            .to(
                panelRef.current,
                {
                    xPercent: 0,
                    duration: .55,
                    ease: "power4.out",
                },
                "-=.35"
            )
            .to(
                plusHRef.current,
                {
                    rotate: 45,
                    duration: .45,
                },
                0
            )
            .to(
                plusVRef.current,
                {
                    rotate: -45,
                    duration: .45,
                },
                0
            )
            .to(
                menuItemsRef.current?.children ?? [],
                {
                    opacity: 1,
                    y: 0,
                    stagger: .08,
                    duration: .45,
                    ease: "power3.out",
                },
                "-=.2"
            );
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);

        tlRef.current?.kill();

        gsap.to(
            [
                panelRef.current,
                layerTwoRef.current,
                layerOneRef.current,
            ],
            {
                xPercent: 100,
                duration: .3,
                ease: "power3.in",
            }
        );

        gsap.to(plusHRef.current, {
            rotate: 0,
            duration: .3,
        });

        gsap.to(plusVRef.current, {
            rotate: 90,
            duration: .3,
        });

        gsap.set(menuItemsRef.current?.children ?? [], {
            opacity: 0,
            y: 32,
        });
    }, []);

    const toggleMenu = () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    useEffect(() => {
        if (!menuOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };

        const onClick = (e: MouseEvent) => {
            const target = e.target as Node;
            // Ignore clicks on the toggle — its own onClick handles open/close.
            // Otherwise mousedown closes here, then click re-opens via toggleMenu.
            if (menuButtonRef.current?.contains(target)) {
                return;
            }
            if (panelRef.current && !panelRef.current.contains(target)) {
                closeMenu();
            }
        };

        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClick);

        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClick);

            document.body.style.overflow = "";
        };
    }, [menuOpen, closeMenu]);

    return (
        <>
            {/* ---------- Sliding Layers ---------- */}

            <div
                ref={layerOneRef}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "22rem",
                    zIndex: 7,
                }}
            >
                <Background
                    fill
                    background="brand-strong"
                />
            </div>

            <div
                ref={layerTwoRef}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "21rem",
                    zIndex: 8,
                }}
            >
                <Background
                    fill
                    background="accent-strong"
                />
            </div>

            {/* ---------- Menu Panel ---------- */}

            <div
                ref={panelRef}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "20rem",
                    zIndex: 9,
                }}
            >
                <Column
                    fill
                    background="surface"
                    borderLeft="neutral-alpha-weak"
                    padding="32"
                    gap="32"
                >
                    {/* <Logo dark icon="/trademarks/wordmark-dark.svg" href="/" size="s" /> */}
                    {/* <Logo light icon="/trademarks/wordmark-light.svg" href="/" size="s" /> */}

                    <Column
                        ref={menuItemsRef}
                        fillWidth
                        gap="8"
                        marginTop="24"
                    >
                        {NAV_ITEMS.map((item) => (
                            <Button
                                key={item.href}
                                variant="tertiary"
                                size="l"
                                fillWidth
                                prefixIcon={item.icon as any}
                                label={item.label}
                                onClick={() => navigateAndClose(item.href)}
                            />
                        ))}
                    </Column>

                    <Column
                        fillWidth
                        marginTop="l"
                        padding="20"
                        radius="l"
                        border="neutral-alpha-weak"
                        gap="8"
                    >
                        <Text variant="label-default-s">
                            Today's Reflection
                        </Text>

                        <Text
                            variant="body-default-m"
                            onBackground="neutral-medium"
                        >
                            What would tomorrow's you thank today's you for?
                        </Text>
                    </Column>

                    {profile && (
                        <Column
                            fillWidth
                            gap="12"
                            paddingTop="16"
                        >
                            <Row gap="12" vertical="center">
                                <Avatar
                                    src={profile.avatar_url || undefined}
                                    size="m"
                                />

                                <Column gap="2">
                                    <Text variant="label-default-m">
                                        {profile.username}
                                    </Text>

                                    <Text
                                        variant="body-default-s"
                                        onBackground="neutral-medium"
                                    >
                                        View Profile
                                    </Text>
                                </Column>
                            </Row>

                            <Button
                                variant="secondary"
                                prefixIcon="person"
                                label="Profile"
                                onClick={() => navigateAndClose("/profile")}
                            />

                            <Button
                                variant="secondary"
                                prefixIcon="settings"
                                label="Settings"
                                onClick={() => navigateAndClose("/settings")}
                            />

                            <Button
                                variant="danger"
                                prefixIcon="logout"
                                label="Log out"
                                onClick={logout}
                            />
                        </Column>
                    )}
                </Column>
            </div>

            {/* ---------- Header ---------- */}

            <Row
                fillWidth
                padding="8"
                horizontal="center"
                position="absolute"
                zIndex={10}
            >
                <Fade
                    fillWidth
                    position="absolute"
                    pointerEvents="none"
                    top="0"
                    height={6}
                    pattern={{
                        display: true,
                        size: "2",
                    }}
                />

                <Row
                    maxWidth="m"
                    horizontal="between"
                    vertical="center"
                    minHeight="56"
                    paddingLeft="20"
                    paddingRight="12"
                    background="surface"
                    border="neutral-alpha-weak"
                    radius="l"
                    {...flex}
                >
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

                    {profile ? (
                        <Row gap="16" vertical="center">
                            <Button
                                ref={menuButtonRef}
                                variant="tertiary"
                                size="m"
                                onClick={toggleMenu}
                            >
                                <Row gap="8" vertical="center">
                                    <Text variant="label-default-m">
                                        {menuOpen ? "Close" : "Menu"}
                                    </Text>

                                    <Row
                                        position="relative"
                                        width={2}
                                        height={2}
                                        style={{
                                            width: 16,
                                            height: 16,
                                        }}
                                    >
                                        <span
                                            ref={plusHRef}
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: "50%",
                                                width: "100%",
                                                height: 2,
                                                borderRadius: 999,
                                                background: "currentColor",
                                                transform: "translateY(-50%)",
                                            }}
                                        />

                                        <span
                                            ref={plusVRef}
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: "50%",
                                                width: "100%",
                                                height: 2,
                                                borderRadius: 999,
                                                background: "currentColor",
                                                transform: "translateY(-50%) rotate(90deg)",
                                            }}
                                        />
                                    </Row>
                                </Row>
                            </Button>

                            <UserMenu
                                placement="bottom-end"
                                avatarProps={{
                                    src: profile.avatar_url || undefined,
                                }}
                                dropdown={
                                    <Column minWidth={14}>
                                        <Background
                                            position="absolute"
                                            left="0"
                                            right="0"
                                            top="0"
                                            bottom="0"
                                            gradient={{
                                                display: true,
                                                x: 0,
                                                y: -50,
                                                colorStart: "brand-background-strong",
                                                colorEnd: "static-transparent",
                                            }}
                                        />

                                        <Background
                                            position="absolute"
                                            left="0"
                                            right="0"
                                            top="0"
                                            bottom="0"
                                            gradient={{
                                                display: true,
                                                x: 100,
                                                y: -50,
                                                colorStart: "accent-background-strong",
                                                colorEnd: "static-transparent",
                                            }}
                                        />

                                        <Column
                                            fillWidth
                                            gap="4"
                                            padding="4"
                                            radius="l"
                                            border="neutral-alpha-weak"
                                        >
                                            <Column
                                                fillWidth
                                                horizontal="center"
                                                gap="16"
                                                padding="24"
                                            >
                                                <Avatar
                                                    size="l"
                                                    src={profile.avatar_url || undefined}
                                                />

                                                {profile.username && (
                                                    <Text variant="label-default-m">
                                                        {profile.username}
                                                    </Text>
                                                )}
                                            </Column>

                                            <Option
                                                hasPrefix={
                                                    <Icon
                                                        size="s"
                                                        name="person"
                                                        onBackground="neutral-weak"
                                                    />
                                                }
                                                label="Profile"
                                                value="profile"
                                                href="/profile"
                                            />

                                            <Option
                                                hasPrefix={
                                                    <Icon
                                                        size="s"
                                                        name="settings"
                                                        onBackground="neutral-weak"
                                                    />
                                                }
                                                label="Settings"
                                                value="settings"
                                                href="/settings"
                                            />
                                        </Column>

                                        <Column fillWidth padding="4">
                                            <Option
                                                hasPrefix={
                                                    <Icon
                                                        size="s"
                                                        name="logout"
                                                        onBackground="neutral-weak"
                                                    />
                                                }
                                                label="Log out"
                                                value="logout"
                                                onClick={logout}
                                            />
                                        </Column>
                                    </Column>
                                }
                            />
                        </Row>
                    ) : (
                        <Row gap="8" vertical="center">
                            <Button
                                size="s"
                                variant="secondary"
                                label="Log in"
                                href="/auth?state=login"
                            />

                            <Button
                                size="s"
                                label="Sign up"
                                href="/auth?state=signup"
                            />
                        </Row>
                    )}
                </Row>
            </Row>
        </>
    );
};
