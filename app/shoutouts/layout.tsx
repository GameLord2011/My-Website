import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Shoutouts",
    description: "@GameLord2011's shoutouts",
    applicationName: "@GameLord2011's shoutouts",
    openGraph: {
        title: "@GameLord2011 | Shoutouts",
        url: "https://gamelord2011.vercel.app/shoutouts",
        siteName: "@GameLord2011 | Shoutouts",
    },
    twitter: {
        site: "@GameLord2011 | Shoutouts",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
