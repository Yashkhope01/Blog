import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
<<<<<<< HEAD
  title: " Blog ",
=======
  title: "My Blog - MERN Stack",
>>>>>>> 465bf704b39e16a55f1a925871e01ca8b697f44d
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
