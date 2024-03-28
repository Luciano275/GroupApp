import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import ModalGroup from "@/components/ui/ModalGroup";
import { auth } from '@/auth'
import GlobalError from "@/components/GlobalError";
import { GlobalErrorProvider } from "@/components/providers/GlobalErrorProvider";
import { Loading, LoadingProvider } from "@/components/providers/LoadingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "App de grupos con Next Auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {;

  const userId = (await auth())?.user?.id

  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <LoadingProvider>
            <Loading />
            
            <GlobalErrorProvider>
              <GlobalError />
              <ModalGroup userId={userId || ''} />
              {children}
            </GlobalErrorProvider>
          </LoadingProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
