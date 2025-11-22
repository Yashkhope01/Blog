import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Blog - MERN Stack",
  description: "A full-stack blog application built with MERN stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
