import "@radix-ui/themes/styles.css";
import "@/app/theme-config.css";
import "@/app/globals.css";

import { Theme }                    from "@radix-ui/themes";

import type { Metadata }            from "next";
import { Inter }                    from "next/font/google";

import NavBar                       from "./NavBar";


const inter = Inter({
	subsets  : ["latin"],
	display  : "swap",
	variable : "--font-inter",
});

export const metadata: Metadata = {
  title       : "Issue Tracker",
  description : "Track all issue from day to day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <Theme accentColor="cyan" radius="large" scaling="110%">          
          <NavBar></NavBar>
          <main className="container-fluid p-3">
            {children}
          </main>
          {/* <ThemePanel></ThemePanel> */}
        </Theme>
      </body>
    </html>
  );
}
