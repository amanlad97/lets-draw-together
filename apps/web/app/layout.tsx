import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@repo/ui/Navbar";

export const metadata: Metadata = {
  title: "let's draw together",
  description: "A place where we all can come together and draw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
