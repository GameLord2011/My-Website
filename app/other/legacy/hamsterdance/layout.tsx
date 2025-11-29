import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://gamelord2011.vercel.app"),
    alternates: {
        canonical: "/",
    },
    title: "The Hamster Dance",
    description: "@GameLord2011 recreates Hamster Dance",
    generator: "NextJS",
    applicationName: "@GameLord2011 recreates Hamster Dance",
    creator: "@GameLord2011",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    authors: [
        { name: "@GameLord2011", url: "https://github.com/gamelord2011" },
    ],
    openGraph: {
        title: "The Hamster Dance",
        description: "@GameLord2011 recreates Hamster Dance",
        url: "https://gamelord2011.vercel.app/legacy/hamsterdance",
        type: "website",
        siteName: "@GameLord2011 recreates Hamster Dance",
        images: [
            {
                url: "/opengraph.png",
                width: 512,
                height: 512,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "The Hamster Dance",
        creator: "@GameLord2011",
        images: [
            {
                url: "/opengraph.png",
                width: 512,
                height: 512,
            },
        ],
    },
    manifest: "/manifest.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>;
}
