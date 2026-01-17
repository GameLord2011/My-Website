"use client";

import Link from "next/link";
import Age from "age-ts";

export default function About() {

    return (
        <main className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-2xl">About Me</h1>
                <h2 className="text-xl p-5">Hi, I'm @GameLord2011</h2>
                <p className="w-full jio2:w-1/2 place-self-center">
                    I am a <Age /> year old developer. I mainly use windows.
                    I listen to music on spotify and I play a lot of{" "}
                    <Link href="https://www.minecraft.net/">Minecraft</Link> &lpar;
                    <Link href="https://namemc.com/profile/GameLord2011.1">
                        my profile
                    </Link>
                    &rpar; and <Link href="https://fortnite.com/">Fortnite</Link> &lpar;
                    <Link href="https://fortnitetracker.com/profile/all/TRGameLord2011">
                        my Fortnite profile
                    </Link>
                    &rpar;. I also love the{" "}
                    <Link href="https://www.marvel.com/">Marvel</Link> and{" "}
                    <Link href="https://starwars.com/">Star Wars</Link> movies.
                    I am a big fan of{" "}
                    <Link href="https://en.wikipedia.org/wiki/Free_and_open-source_software">F.O.S.S.</Link> and{" "}
                    <Link href="https://www.github.com/">GitHub</Link>! I use
                    VSCode and Wdit for programming. 
                </p>
            </div>
        </main>
    );
}
