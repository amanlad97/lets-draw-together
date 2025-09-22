import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { UserContext } from "./provider/provider";

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
      <body className="bg-black overflow-hidden">
        <UserContext>
          <Navbar />
          {children}
        </UserContext>
      </body>
    </html>
  );
}
