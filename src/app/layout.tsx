import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/libs/redux/StoreProvider";
import { Template } from "@/components/Template";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserContextProvider } from "@/Contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'OLX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <StoreProvider>
            <Template>
              <Header />
              {children}
              <Footer />
            </Template>
          </StoreProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
