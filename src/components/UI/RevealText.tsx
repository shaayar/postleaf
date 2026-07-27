"use client";

import {
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    opacity?: number;
    start?: string;
    end?: string;
    className?: string;
}

export default function RevealText({
    children,
    delay = 0,
    y = 9,
    opacity = 0.3,
    start = "top 65%",
    end = "top 25%",
    className,
}: RevealTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                {
                    opacity,
                    y,
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        end,
                        scrub: true,
                    },
                    delay,
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [delay, y, opacity, start, end]);

    return (
        <div ref={ref} className={className}>
            {isValidElement(children)
                ? cloneElement(children as ReactElement)
                : children}
        </div>
    );
}