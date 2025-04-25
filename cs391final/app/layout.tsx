import type { Metadata } from "next";
import "@fontsource/titillium-web/300.css";
import "@fontsource/titillium-web/400.css";
import "@fontsource/titillium-web/600.css";
import "@fontsource/titillium-web/700.css";
import "./globals.css";
import F1ThemeProvider from './components/F1ThemeProvider';

export const metadata: Metadata = {
  title: "F1 Race Data",
  description: "Display F1 race data using Open F1 API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <F1ThemeProvider>
          {children}
        </F1ThemeProvider>
      </body>
    </html>
  );
}