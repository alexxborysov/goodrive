import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DefaultLayout } from "~/kernel/layouts/default";
import { WithProviders } from "~/kernel/providers/with-providers";
import "~/kernel/styling/main.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = (): Metadata => {
  const robots = {
    staging: { index: false, follow: false },
    production: { index: true, follow: true },
  };

  return {
    title: "goodrive",
    description: "goodrive application",
    robots: robots[process.env.NEXT_PUBLIC_ENV],
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WithProviders>
          <DefaultLayout>{children}</DefaultLayout>
        </WithProviders>
      </body>
    </html>
  );
}
