import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Repos",
    description: "@GameLord2011's repositories",
    applicationName: "@GameLord2011's repositories",
    openGraph: {
        url: "https://gamelord2011.vercel.app/repos",
        siteName: "@GameLord2011 | Repos",
    },
    twitter: {
        site: "@GameLord2011 | Repos",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
