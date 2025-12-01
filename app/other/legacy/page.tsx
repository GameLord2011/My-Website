import Link from "next/link";

export default function Page() {
    return (
        <main className="text-center">
            <h1 className="text-xl">Legacy Sites Recreated</h1>
            <br />
            <p>
                These are recreations of sites that may bring nostalga to people
                born before the year 2000
            </p>
            <br />
            <ul>
                <li>
                    <Link href="/other/legacy/hamsterdance">
                        The Hamsterdance
                    </Link>
                </li>
            </ul>
            <br />
            <p className="text-yellow-500">
                <strong>WARNING</strong>: May cause feelings of nostalga, deep
                longing for the past, and/or may bring back cherished childhood
                memories.
            </p>
        </main>
    );
}
