import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";

export default function Layout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isAuthRoute = location.pathname.startsWith("/auth");

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <HashLink smooth to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
              </svg>
              <span className="inline-block font-bold">DeployMaster</span>
            </HashLink>
            {!isAuthRoute && (
              <nav className="hidden md:flex gap-6">
                <HashLink
                  smooth
                  to="#features"
                  className="flex items-center text-lg font-semibold text-muted-foreground sm:text-sm"
                >
                  Features
                </HashLink>
                <HashLink
                  smooth
                  to="#pricing"
                  className="flex items-center text-lg font-semibold text-muted-foreground sm:text-sm"
                >
                  Pricing
                </HashLink>
                <HashLink
                  smooth
                  to="#contact"
                  className="flex items-center text-lg font-semibold text-muted-foreground sm:text-sm"
                >
                  Contact
                </HashLink>
              </nav>
            )}
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button size="sm" className="hidden md:flex">
                  Sign Up
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 px-0"
              >
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && !isAuthRoute && (
        <div className="md:hidden bg-background/95 border-t">
          <nav className="flex flex-col gap-4 p-4">
            <HashLink
              smooth
              to="#features"
              className="text-lg font-semibold text-muted-foreground"
            >
              Features
            </HashLink>
            <HashLink
              to="#pricing"
              className="text-lg font-semibold text-muted-foreground"
            >
              Pricing
            </HashLink>
            <HashLink
              to="#contact"
              className="text-lg font-semibold text-muted-foreground"
            >
              Contact
            </HashLink>
            <Link
              to="/auth/login"
              className="text-lg font-semibold text-muted-foreground"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="text-lg font-semibold text-muted-foreground"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
      <Outlet />
      <main className="flex-grow mt-3">{children}</main>
      <section id="contact">
        <footer className="border-t bg-muted/50">
          <div className="container flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:py-0">
            <div className="flex flex-1 items-center ml-9 justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <Link to="/">Terms</Link>
              <Link to="/">Privacy</Link>
              <Link to="/">FAQ</Link>
            </div>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              <p>© 2023 DeployMaster. All rights reserved.</p>
            </div>
            <div className="flex flex-1 items-center justify-center md:justify-end mr-5 gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/your-linkedin-profile-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <a
                  href="https://www.instagram.com/your-instagram-profile-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <a
                  href="https://github.com/your-github-profile-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
