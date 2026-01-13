import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://gamelord2011.vercel.app"),
    alternates: {
        canonical: "/",
    },
    title: "@GameLord2011 | Legacy",
    description: "@GameLord2011 recreates legacy sites",
    generator: "NextJS",
    applicationName: "@GameLord2011 recreates legacy sites",
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
        title: "@GameLord2011 | Legacy",
        description: "@GameLord2011's site",
        url: "https://gamelord2011.vercel.app/legacy",
        type: "website",
        siteName: "@GameLord2011 recreates legacy sites",
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
        site: "@GameLord2011 | Leagacy",
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
    return <>{children}</>;
}
