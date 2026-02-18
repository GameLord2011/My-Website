import styles from "styles/hamsterdance.module.scss";
import Image from "next/image";
import Link from "next/link";
import HamsterDanceAudio from "components/hamsterDanceAudio";
import { Fragment } from "react";

export default function Page() {
    return (
        <div className={styles.container}>
            <HamsterDanceAudio />
            <center>
                <br />
                <h1 className="text-3xl">THE HAMPSTER DANCE</h1>
                <h3 className="text-lg">dance the night away</h3>
                <br />
            </center>
            <dt>
                <center>
                    {/* Some recursive mapping stuff */}
                    {[...Array(2)].map((_, i) => (
                        // I did not know that you could assign keys to these.
                        <Fragment key={i}>
                            {[...Array(5)].map((_, j) => (// j because i is passed down
                                <Image
                                    alt="dancing hamster(s)"
                                    width={144}
                                    height={48}
                                    key={j}
                                    src="/anin.gif"
                                />
                            ))}
                            {[...Array(12)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={60}
                                    height={70}
                                    key={j}
                                    src="/hamu.gif"
                                />
                            ))}
                        </Fragment>
                    ))}
                    {[...Array(3)].map((_, i) => (
                        <Fragment key={i}>
                            {[...Array(5)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={144}
                                    height={48}
                                    key={j}
                                    src="/anin.gif"
                                />
                            ))}
                            {[...Array(14)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={53}
                                    height={74}
                                    key={j}
                                    src="/hamwalk.gif"
                                />
                            ))}
                            {[...Array(10)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={144}
                                    height={48}
                                    key={j}
                                    src="/anin.gif"
                                />
                            ))}
                            {[...Array(12)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={60}
                                    height={70}
                                    key={j}
                                    src="/hamu.gif"
                                />
                            ))}
                            {[...Array(5)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={144}
                                    height={48}
                                    key={j}
                                    src="/anin.gif"
                                />
                            ))}
                            {[...Array(12)].map((_, j) => (
                                <Image
                                    alt="dancing hamster(s)"
                                    width={60}
                                    height={70}
                                    key={j}
                                    src="/gerbil.gif"
                                />
                            ))}
                        </Fragment>
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <Image
                            alt="dancing hamster(s)"
                            width={144}
                            height={48}
                            key={i}
                            src="/anin.gif"
                        />
                    ))}
                    {[...Array(14)].map((_, i) => (
                        <Image
                            alt="dancing hamster(s)"
                            width={53}
                            height={74}
                            key={i}
                            src="/hamwalk.gif"
                        />
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <Image
                            alt="dancing hamster(s)"
                            width={144}
                            height={48}
                            key={i}
                            src="/anin.gif"
                        />
                    ))}
                </center>
            </dt>
            <br />
            <center className="text-2xl">
                <br />
                Go back to the <Link href="/other/legacy">legacy</Link> page
            </center>
            <br />
        </div>
    );
}
