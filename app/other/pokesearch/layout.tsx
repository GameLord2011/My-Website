import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Pokesearch",
    description: "@GameLord2011's Pokemon search engine thing",
    applicationName: "@GameLord2011's Pokemon search engine thing",
    openGraph: {
        url: "https://gamelord2011.vercel.app/other/pokesearch/",
        siteName: "@GameLord2011 | Pokesearch",
    },
    twitter: {
        site: "@GameLord2011 | Pokesearch",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
