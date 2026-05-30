import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Legacy",
    description: "@GameLord2011 recreates legacy sites",
    applicationName: "@GameLord2011 recreates legacy sites",
    openGraph: {
        title: "@GameLord2011 | Legacy",
        url: "https://gamelord2011.vercel.app/legacy",
        siteName: "@GameLord2011 recreates legacy sites",
    },
    twitter: {
        site: "@GameLord2011 | Leagacy",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
