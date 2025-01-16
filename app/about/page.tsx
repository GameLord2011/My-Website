import Link from "next/link";

export default function About() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">About This Site</h1>
            <br/>
            <h1 className="text-xl">What To Do When:</h1>
            <br/>
            <div className="text-left float-left" title="I Like This">
                <h2 className="text-lg">You like this site, and wish your&#39;s was like this.</h2>
                <br/>
                <p>
                    If you wish your site were something like this, then you can use this site as a base!<br/>
                    Steps to make this site your own:
                </p>
                <ol className="list-[lower-greek] list-inside">
                        <li>
                            First make a github account!
                        </li>
                        <li>
                            After that, go to this websites <Link title="https://www.github.com/gamelord2011/gamelord2011.gihtub.io" href="https://github.com/gamelord2011/gamelord2011.github.io">repo</Link> &#40;That&#39;s right, IT&#39;S FOSS!&#41; and click the fork button.
                        </li>
                    </ol>
            </div>
        </main>
    );
}