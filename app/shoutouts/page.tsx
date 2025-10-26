"use client";

import { VFXProvider } from "react-vfx";
import { VFXImg } from "react-vfx";
import GitHubHoverLink from "components/linkWrapper";
import { useAnimations } from "components/animationContext";
import Image from "next/image";

export default function Shoutouts() {
    const { anims } = useAnimations();

    return (
        <VFXProvider>
            <main className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl">Shoutouts!</h1>
                <br />
                <div className="text-sm">
                    <p>
                        <GitHubHoverLink href="https://github.com/fand">
                            @fand
                        </GitHubHoverLink>{" "}
                        for{" "}
                        <GitHubHoverLink href="https://github.com/fand/vfx-js/tree/main">
                            {anims ? (
                                <>
                                    <VFXImg
                                        loading="eager"
                                        src="/react-vfx.png"
                                        className="hidden h-[1.3rem] overflow-clip dark:inline-block"
                                        shader="rgbShift"
                                        overflow={true}
                                        alt="React-Vfx"
                                        aria-label="React-Vfx"
                                    />
                                    <VFXImg
                                        loading="eager"
                                        src="/react-vfx-light.png"
                                        className="inline-block h-[1.3rem] overflow-clip dark:hidden"
                                        shader="rgbShift"
                                        overflow={true}
                                        alt="React-Vfx"
                                        aria-label="React-Vfx"
                                    />
                                </>
                            ) : (
                                <>
                                    <Image
                                        loading="eager"
                                        src="/react-vfx.png"
                                        className="hidden overflow-clip dark:inline-block"
                                        width={0}
                                        height={0}
                                        style={{
                                            height: "1.3rem",
                                            width: "auto",
                                        }}
                                        alt="React-Vfx"
                                        aria-label="React-Vfx"
                                    />
                                    <Image
                                        loading="eager"
                                        src="/react-vfx-light.png"
                                        className="inline-block overflow-clip dark:hidden"
                                        width={0}
                                        height={0}
                                        style={{
                                            height: "1.3rem",
                                            width: "auto",
                                        }}
                                        alt="React-Vfx"
                                        aria-label="React-Vfx"
                                    />
                                </>
                            )}
                        </GitHubHoverLink>
                        !
                    </p>
                    <br />
                    <p>
                        <GitHubHoverLink href="https://github.com/vincentgarreau">
                            @vincentgarreau
                        </GitHubHoverLink>
                        , and{" "}
                        <GitHubHoverLink href="https://github.com/matteobruni">
                            @matteobruni
                        </GitHubHoverLink>{" "}
                        for{" "}
                        <i>
                            <GitHubHoverLink href="https://github.com/tsparticles/tsparticles">
                                TSParticles
                            </GitHubHoverLink>
                        </i>
                        !
                    </p>
                    <br />
                    <p>
                        <GitHubHoverLink href="https://github.com/facebook">
                            Meta
                        </GitHubHoverLink>
                        ,{" "}
                        <GitHubHoverLink href="https://github.com/microsoft">
                            Microsoft
                        </GitHubHoverLink>
                        , and{" "}
                        <GitHubHoverLink href="https://github.com/vercel">
                            Vercel
                        </GitHubHoverLink>{" "}
                        for making this site possible at all via{" "}
                        <GitHubHoverLink href="https://github.com/vercel/next.js">
                            <svg
                                className="inline-block h-[0.7rem] -translate-y-px dark:invert"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 394 80"
                                aria-label="Next.js logo"
                            >
                                <path
                                    fill="#000"
                                    d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
                                />
                                <path
                                    fill="#000"
                                    d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
                                />
                            </svg>
                        </GitHubHoverLink>
                        !
                    </p>
                    <br />
                    <p>
                        <GitHubHoverLink href="https://github.com/torvalds">
                            @torvalds
                        </GitHubHoverLink>{" "}
                        for{" "}
                        <i>
                            <GitHubHoverLink href="https://github.com/torvalds/linux">
                                Linux
                            </GitHubHoverLink>
                        </i>
                        !
                    </p>
                    <br />
                    <p>
                        <GitHubHoverLink href="https://github.com/willy-jl">
                            @Willy-JL
                        </GitHubHoverLink>
                        ,{" "}
                        <GitHubHoverLink href="https://github.com/sil333033">
                            @Sil333033
                        </GitHubHoverLink>
                        ,{" "}
                        <GitHubHoverLink href="https://github.com/haxsam">
                            @HaxSam
                        </GitHubHoverLink>
                        ,{" "}
                        <GitHubHoverLink href="https://github.com/matthewkukanich">
                            @MatthewKuKanich
                        </GitHubHoverLink>
                        , and{" "}
                        <GitHubHoverLink href="https://github.com/956mb">
                            @956MB
                        </GitHubHoverLink>{" "}
                        for{" "}
                        <i>
                            <GitHubHoverLink href="https://github.com/next-flip/momentum-firmware">
                                Momentum Firmware
                            </GitHubHoverLink>
                        </i>
                        !
                    </p>
                </div>
            </main>
        </VFXProvider>
    );
}
