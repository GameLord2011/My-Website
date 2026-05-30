import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "@GameLord2011 | Guestbook",
    description: "@GameLord2011's site guestbook",
    applicationName: "@GameLord2011's site guestbook",
    openGraph: {
        url: "https://gamelord2011.vercel.app/guestbook",
        siteName: "@GameLord2011 | Guestbook",
    },
    twitter: {
        site: "@GameLord2011 | Guestbook",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
