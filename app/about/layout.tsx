import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | About",
    description: "@GameLord2011 about page",
    applicationName: "@GameLord2011 about page",
    openGraph: {
        title: "@GameLord2011 | About",
        url: "https://gamelord2011.vercel.app/about",
        siteName: "@GameLord2011 about page",
    },
    twitter: {
        site: "@GameLord2011 | About",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
