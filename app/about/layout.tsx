import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://gamelord2011.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "@GameLord2011 | About",
  description: "@GameLord2011 about page",
  generator: "NextJS",
  applicationName: "@GameLord2011 ablot page",
  creator: "@GameLord2011",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: "@GameLord2011", url: "https://github.com/gamelord2011" }],
  icons: [
    { rel: "icon", url: "/64X64png.png" },
    { rel: "apple-touch-icon", url: "/512X512square.png" },
  ],
  openGraph: {
    images: [{ url: "/512X512square.png", width: 512, height: 512 }],
    title: "@GameLord2011 | About",
    description: "@GameLord2011's site",
    url: "https://gamelord2011.vercel.app/about",
    type: "website",
    siteName: "@GameLord2011 about page",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GameLord2011 | About",
    creator: "@GameLord2011",
    images: [{ url: "/512X512square.png", width: 512, height: 512 }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
