import Link from "next/link";

export default function Links() {
    return(
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">Links</h1>
            <br/>
            <p>This is a collection of links to my stuff.</p>
            <br/>
            <ul className="list-disc list-inside float-left text-left">
                <li>
                    My <Link href="https://github.com/gamelord2011">GitHub Profile</Link>.
                </li>
                <li>
                    My <Link href="https://mycoolstuff.great-site.net/page%201.html">First website</Link> &#40;multiple parts broken&#41;.
                </li>
                <li>
                    My <Link href="https://gravatar.com/gamelord2011">Gravatar</Link>.
                </li>
                <li>
                    My <Link href="https://meta.stackexchange.com/users/1680335/gamelord2011">Stack Exchange</Link>.
                </li>
                <li>
                    My <Link href="https://community.fandom.com/wiki/User:GameLord2011">Fandom</Link> & <Link href="https://minecraft.wiki/User:GameLord2011">Minecraft Wiki</Link> profiles.
                </li>
                <li>
                    My <Link href="https://codepen.io/GameLord2011">Codepen</Link>.
                </li>
                <li>
                    My <Link href="https://namemc.com/profile/GameLord2011.1">Minecraft Account</Link> &#40;NameMc&#41;.
                </li>
                <li>
                    My <Link href="https://open.spotify.com/user/314llvydsquwri3bo53dcwx2vffa">Spotify</Link>.
                </li>
            </ul>
        </main>
    );
}