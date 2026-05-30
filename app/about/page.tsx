import Link from "next/link";
import Age from "age-ts";

export default function About() {
    return (
        <main className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-2xl">About Me</h1>
                <h2 className="p-5 text-xl">Hi, I'm @GameLord2011</h2>
                <p className="jio2:w-1/2 w-full translate-x-1/2">
                    I am a <Age /> year old developer. I mainly use windows. I
                    do a lot of programming in{" "}
                    <Link href={"https://www.typescriptlang.org/"}>
                        TypeScript
                    </Link>{" "}
                    and <Link href={"https://rust-lang.org/"}>Rust</Link>. I
                    have done some programming in{" "}
                    <Link href={"https://www.java.com/"}>Java</Link> for{" "}
                    <Link href={"https://www.minecraft.net/"}>Minecraft</Link>{" "}
                    using <Link href={"https://fabricmc.net/"}>Fabric</Link> and{" "}
                    <Link href={"https://neoforged.net/"}>NeoForge</Link>.
                </p>
            </div>
        </main>
    );
}
