import Link from "next/link";

export default function Page() {
    return(
        <main>
            <p className="text-center">
                You wern&#39;t supposed to find this page!
                <Link href="/" className="text-emerald-800 dark:text-emerald-400">
                    Go Home?
                </Link>
            </p>
        </main>
    )
}