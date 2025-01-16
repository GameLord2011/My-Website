import type { Metadata } from "next";
import "./globals.scss";

import HPageIs from "@/app/api/HPageIs";

import TSParticles from "@/app/api/TSParticles";

import Link from "next/link";

export const metadata: Metadata = {
  title: "@GameLord2011",
  description: "@GameLord2011's site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
      <noscript className="text-left">Please enable JavaScript to run this app, if you do not know how to enable JavaScript,<br/>then read the section that corresponds to your browser:<ul><li><b>Edge</b>:<br/><ol><li>Click the three dots in the top-right corner.<br/></li><li>Go to <b>Settings</b>.<br/></li><li>Select <b>Cookies and site permissions</b> from the left pane.<br/></li><li>Click on <b>JavaScript</b>.<br/></li><li>Toggle the switch to <b>On</b>.<br/></li></ol></li><li><b>Chrome</b>:<br/><ol><li>Click the three dots in the top-right corner.<br/></li><li>Go to <b>Settings</b>.<br/></li><li>Scroll down and click on <b>Privacy and security</b>.<br/></li><li>Click on <b>Site settings</b>.<br/></li><li>Under <b>Content</b>, click on <b>JavaScript</b>.<br/></li><li>Toggle the switch to <b>Unblock</b>.<br/></li></ol></li><li><b>Safari</b>:<br/><ol><li>Go to <b>Preferences</b> (or press <code>Cmd + ,</code>).<br/></li><li>Go to the <b>Security</b> tab.<br/></li><li>Check the box next to <b>Enable JavaScript</b>.<br/></li></ol></li><li><b>Firefox</b>:<br/><ol><li>Type <code>about:config</code> in the address bar.<br/></li><li>Find <code>javascript.enabled</code>.<br/></li><li>Double-click the preference to change its value to <code>True</code>.</li></ol></li><li><b>Opera</b>:<br/><ol><li>Select <b>Opera</b> from the menu bar, then select Preferences.<br/></li><li>In the left menu pane, select <b>Advanced</b>.<br/></li><li>Select <b>Site Settings</b>.<br/></li><li>Select <b>JavaScript</b>.<br/></li><li>Switch the Toggle to <b>On</b>.<br/></li></ol></li></ul></noscript>
      <nav>
        <div className="dropdown right-full bottom-full sticky">
          <button type='button' className="dropbtn">
          Pages
          </button>
          <div className="dropdown-content">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/test">Test</Link>
          </div>
        </div>
      </nav>
        <TSParticles />
        {children}
        <HPageIs/>
      </body>
    </html>
  );
}
