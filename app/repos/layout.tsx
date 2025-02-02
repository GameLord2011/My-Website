import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://gamelord2011.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "@GameLord2011 | Repos",
  description: "@GameLord2011's repositories",
  generator: "NextJS",
  applicationName: "@GameLord2011's repositories",
  creator: "@GameLord2011",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: "@GameLord2011", url: "https://github.com/gamelord2011" }],
  openGraph: {
    title: "@GameLord2011",
    description: "@GameLord2011's site",
    url: "https://gamelord2011.vercel.app/repos",
    type: "website",
    siteName: "@GameLord2011 | Repos",
    images: [
      {
        url: "/opengraph.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GameLord2011 | Repos",
    creator: "@GameLord2011",
    images: [
      {
        url: "/opengraph.png",
        width: 512,
        height: 512,
      },
    ],
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
