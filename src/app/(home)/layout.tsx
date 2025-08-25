import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`w-screen h-screen ${inter.className}`}>
      <CookiesProvider>{children}</CookiesProvider>
    </main>
  );
}
