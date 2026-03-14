import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Re: Write",
  description:
    "Convert one long piece of content into multiple social media formats using AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} bg-neutral-950 text-neutral-50 min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
