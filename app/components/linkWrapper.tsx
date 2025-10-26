"use client";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Link from "next/link";
import GitHubCard from "components/ghCard";

export default function GitHubHoverLink({
    href,
    children,
    ...props
}: React.ComponentProps<typeof Link>) {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (show && linkRef.current) {
            const rect = linkRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
            });
        }
    }, [show]);

    return (
        <>
            <span
                className="relative"
                onMouseEnter={() => {
                    clearTimeout(timeout.current as NodeJS.Timeout);
                    setShow(true);
                }}
                onMouseLeave={() => {
                    timeout.current = setTimeout(() => setShow(false), 200);
                }}
            >
                <Link href={href} {...props} ref={linkRef}>
                    {children}
                </Link>
            </span>
            {show &&
                typeof window !== "undefined" &&
                window.innerWidth >= 700 && (
                    <GitHubCard url={href as string} position={position} />
                )}
        </>
    );
}
