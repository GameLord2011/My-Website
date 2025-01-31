import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://gamelord2011.vercel.app/shoutouts"),
  alternates: {
    canonical: "/",
  },
  title: "@GameLord2011 | Shoutouts",
  description: "@GameLord2011's shoutouts",
  generator: "NextJS",
  applicationName: "@GameLord2011's shoutouts",
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
    title: "@GameLord2011 | Shoutouts",
    description: "@GameLord2011's site",
    url: "https://gamelord2011.vercel.app",
    type: "website",
    siteName: "@GameLord2011 | Shoutouts",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GameLord2011 | Shoutouts",
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
