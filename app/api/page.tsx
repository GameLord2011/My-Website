import Link from "next/link";

// This page is an EASTER EGG!

export default function Page() {
    return(
        <main>
            <p className="text-center">
                You wern&#39;t supposed to find this page!
                <br/>
                <Link href="/" className="text-emerald-800 dark:text-emerald-400">
                    Go Home?
                </Link>
            </p>
        </main>
    )
}
