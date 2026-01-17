import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assistant Manager",
  description: "Sistema de gestión de asistentes virtuales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary-600 rounded-lg" />
                    <h1 className="text-xl font-bold text-gray-900">
                      Assistant Manager
                    </h1>
                  </div>
                  <nav className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-sm font-medium text-gray-700 hover:text-primary-600"
                    >
                      Asistentes
                    </Link>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-primary-600"
                    >
                      Documentación
                    </a>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-primary-600"
                    >
                      Configuración
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-white border-t border-gray-200 mt-12">
              <div className="container mx-auto px-4 py-6">
                <p className="text-center text-sm text-gray-500">
                  © 2024 Assistant Manager. Todos los derechos reservados.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
