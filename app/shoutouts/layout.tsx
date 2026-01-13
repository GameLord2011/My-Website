import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://gamelord2011.vercel.app"),
    alternates: {
        canonical: "/",
    },
    title: "@GameLord2011 | Shoutouts",
    description: "@GameLord2011's shoutouts",
    generator: "NextJS",
    applicationName: "@GameLord2011's shoutouts",
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
        title: "@GameLord2011 | Shoutouts",
        description: "@GameLord2011's site",
        url: "https://gamelord2011.vercel.app/shoutouts",
        type: "website",
        siteName: "@GameLord2011 | Shoutouts",
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
        site: "@GameLord2011 | Shoutouts",
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
