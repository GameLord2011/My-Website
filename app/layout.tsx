import type { Metadata } from "next";
import { Viewport } from "next";
import Background from "components/backGround";
import Navbar from "components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SettingsProvider from "components/settingsProvider";
import { Cascadia_Mono } from "next/font/google";
import "styles/globals.scss";

const cascadiaMono = Cascadia_Mono({
    subsets: ["latin"],
    preload: true,
    fallback: ["monospace"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://gamelord2011.vercel.app"),
    alternates: {
        canonical: "/",
    },
    title: "@GameLord2011",
    description: "@GameLord2011's site",
    generator: "NextJS",
    applicationName: "@GameLord2011's site",
    creator: "@GameLord2011",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    authors: [
        {
            name: "@GameLord2011",
            url: "https://github.com/gamelord2011",
        },
    ],
    openGraph: {
        images: [
            {
                url: "/opengraph.png",
                width: 2480,
                height: 1200,
            },
        ],
        title: "@GameLord2011",
        description: "@GameLord2011's site",
        url: "https://gamelord2011.vercel.app",
        type: "website",
        siteName: "@GameLord2011",
    },
    twitter: {
        card: "summary_large_image",
        site: "@GameLord2011",
        creator: "@GameLord2011",
        images: [
            {
                url: "/opengraph.png",
                width: 2480,
                height: 1200,
            },
        ],
    },
    manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    minimumScale: 1,
    colorScheme: "dark light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <script
                    // Letting a looks-o-mainack near dangerouslySetInnerHTML and suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        // prettier-ignore-next-line
                        __html: `(function(){try{const a=localStorage.getItem("theme"),b=window.matchMedia("(prefers-color-scheme: dark)").matches,c=a||(b?"dark":"light");document.documentElement.classList.add(c);}catch(e){document.documentElement.classList.add("dark");console.error(\`[GAMELORD'S THEMECODE]: error: \$\{e\}\`);}})();`,
                    }}
                />
            </head>
            <body
                className={`${cascadiaMono.className} antialiased transition-all duration-500 ease-in-out`}
            >
                <noscript>
                    <style>{`.yescript {display: none;}`}</style>
                </noscript>
                <noscript className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
                    Please enable JavaScript to run this site.
                </noscript>
                <div className="yescript">
                    <SpeedInsights />
                    <SettingsProvider>
                        <Navbar />
                        <Background />
                        {children}
                    </SettingsProvider>
                </div>
            </body>
        </html>
    );
}
