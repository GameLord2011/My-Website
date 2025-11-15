"use client";

import { startTransition } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import Link from "next/link";
import { isMobileCheck } from "components/isMobile";
import { isbot } from "isbot";
import { useAnimations } from "components/settingsProvider";

export default function HPageIs() {
    const { anims } = useAnimations();

    const isMobile = isMobileCheck();
    const [isClient, setIsClient] = useState(false);
    const [bot, setBot] = useState(false);

    useLayoutEffect(() => {
        startTransition(() => {
            setIsClient(true);
            setBot(isbot(navigator.userAgent));
        });
    }, []);

    if (!isClient || !anims) return null;

    return (
        <>
            {!isMobile && !bot && (
                <div>
                    <Link href="https://github-readme-stats.vercel.app/">
                        <div className="bg-svgimg fixed right-0 bottom-0 m-0 block h-[195px] w-[467px] p-0" />
                    </Link>
                </div>
            )}
            {isMobile && !bot && (
                <div>
                    <Link href="https://github-readme-stats.vercel.app/">
                        <div className="bg-svgimg minsvgw:block fixed right-0 bottom-0 m-0 hidden h-[195px] w-[467px] p-0" />
                    </Link>
                </div>
            )}
        </>
    );
}
