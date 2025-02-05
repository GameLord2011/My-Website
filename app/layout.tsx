import type { Metadata } from "next";
import "./globals.scss";
import TSParticles from "api/TSParticles";
import Navbar from "api/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  authors: [{ name: "@GameLord2011", url: "https://github.com/gamelord2011" }],
  openGraph: {
    images: [
      {
        url: "/opengraph.png",
        width: 512,
        height: 512,
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
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <SpeedInsights />
        <noscript>
          <style>{`.yescript{display:none;}`}</style>
        </noscript>
        <noscript className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
          Please enable JavaScript to run this site, if you do not know how to
          enable JavaScript,
          <br />
          then read the section that corresponds to your browser:
          <ul>
            <li>
              <b>Edge</b>:
              <br />
              <ol>
                <li>
                  Click the three dots in the top-right corner.
                  <br />
                </li>
                <li>
                  Go to <b>Settings</b>.<br />
                </li>
                <li>
                  Select <b>Cookies and site permissions</b> from the left pane.
                  <br />
                </li>
                <li>
                  Click on <b>JavaScript</b>.<br />
                </li>
                <li>
                  Toggle the switch to <b>On</b>.<br />
                </li>
              </ol>
            </li>
            <li>
              <b>Chrome</b>:
              <br />
              <ol>
                <li>
                  Click the three dots in the top-right corner.
                  <br />
                </li>
                <li>
                  Go to <b>Settings</b>.<br />
                </li>
                <li>
                  Scroll down and click on <b>Privacy and security</b>.<br />
                </li>
                <li>
                  Click on <b>Site settings</b>.<br />
                </li>
                <li>
                  Under <b>Content</b>, click on <b>JavaScript</b>.<br />
                </li>
                <li>
                  Toggle the switch to <b>Unblock</b>.<br />
                </li>
              </ol>
            </li>
            <li>
              <b>Safari</b>:
              <br />
              <ol>
                <li>
                  Go to <b>Preferences</b> &#40;or press <code>Cmd + ,</code>
                  &#41;.
                  <br />
                </li>
                <li>
                  Go to the <b>Security</b> tab.
                  <br />
                </li>
                <li>
                  Check the box next to <b>Enable JavaScript</b>.<br />
                </li>
              </ol>
            </li>
            <li>
              <b>Firefox</b>:
              <br />
              <ol>
                <li>
                  Type <code>about:config</code> in the address bar.
                  <br />
                </li>
                <li>
                  Find <code>javascript.enabled</code>.<br />
                </li>
                <li>
                  Double-click the preference to change its value to{" "}
                  <code>True</code>.
                </li>
              </ol>
            </li>
            <li>
              <b>Opera</b>:
              <br />
              <ol>
                <li>
                  Select <b>Opera</b> from the menu bar, then select
                  Preferences.
                  <br />
                </li>
                <li>
                  In the left menu pane, select <b>Advanced</b>.<br />
                </li>
                <li>
                  Select <b>Site Settings</b>.<br />
                </li>
                <li>
                  Select <b>JavaScript</b>.<br />
                </li>
                <li>
                  Switch the Toggle to <b>On</b>.<br />
                </li>
              </ol>
            </li>
          </ul>
        </noscript>
        <div className="yescript">
          <Navbar />
          <TSParticles />
          {children}
        </div>
      </body>
    </html>
  );
}
