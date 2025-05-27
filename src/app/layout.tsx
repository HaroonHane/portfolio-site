import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { NavigationProvider } from "@/context/navigation-context";
import { Layout } from "@/components/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haroon Aawan - Web Developer Portfolio",
  description: "Professional portfolio of Haroon Aawan, a web developer specializing in creating beautiful and responsive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NavigationProvider>
            <Layout>{children}</Layout>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
