import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PinturaExpress | Pintura de Bicicletas Profesional",
  description: "Presupuesto online d'especialistes en pintura de bicicletes. Personalitza la teva bicicleta amb acabats professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
