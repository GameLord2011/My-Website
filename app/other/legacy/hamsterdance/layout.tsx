import type { Metadata } from "next";

export const metadata: Metadata = {
    description: "@GameLord2011 recreates Hamster Dance",
    applicationName: "@GameLord2011 recreates Hamster Dance",
    openGraph: {
        title: "The Hamster Dance",
        description: "@GameLord2011 recreates Hamster Dance",
        url: "https://gamelord2011.vercel.app/legacy/hamsterdance",
        siteName: "@GameLord2011 recreates Hamster Dance",
    },
    twitter: {
        site: "The Hamster Dance",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
