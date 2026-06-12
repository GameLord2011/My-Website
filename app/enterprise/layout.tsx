import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Enterprise tooling",
    description: "@GameLord2011's enterprise tooling",
    applicationName: "@GameLord2011's enterprise tooling",
    openGraph: {
        url: "https://gamelord2011.vercel.app/enterprise/",
        siteName: "@GameLord2011 | Enterprise tooling",
    },
    twitter: {
        site: "@GameLord2011 | Enterprise tooling",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
