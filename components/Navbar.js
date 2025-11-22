"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

const Navbar = ({ footerRef }) => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    setProgress(20);
    setTimeout(() => setProgress(40), 100);
    setTimeout(() => setProgress(100), 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setProgress(0), 50);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <LoadingBar color="#933ce6" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          My Blog
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            About
          </Link>
          <Link href="/blog" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Blog
          </Link>
          <Link href="/contact" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
            Contact
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-blue-500">
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-2"> 
            <ModeToggle />
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Hi, {user?.name}
                </span>
                <Button className="mx-1" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="mx-1" variant="outline">Login</Button>
              </Link>
            )}
          </div> 
        </div>
        <div className="md:hidden flex items-center">
          <Sheet className="mr-4">  
            <SheetTrigger>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4">My Blog</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                    {isAdmin && <Link href="/admin">Admin</Link>}
                    <div>
                      {isAuthenticated ? (
                        <>
                          <p className="text-sm mb-2">Hi, {user?.name}</p>
                          <Button className="mx-1 text-xs" variant="outline" onClick={handleLogout}>
                            Logout
                          </Button>
                        </>
                      ) : (
                        <Link href="/login">
                          <Button className="mx-1 text-xs" variant="outline">Login</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <ModeToggle />  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;