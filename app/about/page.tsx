import Link from "next/link";

export default function About() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">About This Site</h1>
            <br/>
            <h1 className="text-xl">What To Do When:</h1>
            <br/>
            <div className="text-left float-left md:text-sm sm:text-xs w-screen md:w-1/2 sm:w-1/3">
                <h2 title="I Like This" className="text-lg">You like this site, and wish your&#39;s was like this.</h2>
                <br/>
                <p>
                    If you wish your site were something like this, then you can use this site as a base!<br/>
                    Steps to make this site your own:
                </p>
                <ol className="list-[lower-greek] list-inside">
                        <li>
                            First make a <Link title='GitHub' href="https://gihtub.com/">github</Link> account!
                        </li>
                        <li>
                            After that, go to this website&#39;s <Link title="https://www.github.com/gamelord2011/gamelord2011.gihtub.io/" href="https://github.com/gamelord2011/gamelord2011.github.io">repo</Link> &#40;That&#39;s right, IT&#39;S FOSS!&#41; and click the fork button.
                        </li>
                        <li>
                            Next, install <Link title='Git' href='https://git-scm.com/'>git</Link> & <Link title='Node Js' href='https://nodejs.org/en/'>node.js</Link> on your computer.
                        </li>
                        <li>
                            Then open Windows Terminal, or your favorite terminal, and type <code>git clone https://github.com/&#60;your_user_name&#62;/gamelord2011.gihtub.io</code>
                        </li>
                        <li>
                            Type <code>cd gamelord2011.github.io</code>
                        </li>
                        <li>
                            Then <code>npm i -g pnpm</code>
                        </li>
                        <li>
                            Install dependencies, <code>pnpm i</code>
                        </li>
                        <li>
                            Modify the files to your liking.
                        </li>
                        <li>
                            And lastly, type <code>pnpm dev</code> to preview the site.
                        </li>
                    </ol>
            </div>
        </main>
    );
}
