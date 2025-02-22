"use client";

import React from "react";
import Logo from "./Logo/page";
import { Loader, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useRegisterDialog } from "@/hooks/use-register.dialog";
import { useLoginDialog } from "@/hooks/use-login.dialog";
import useCurrentUser from "@/hooks/api/user-current-user";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const { onOpen: onRegisterOpen } = useRegisterDialog();
  const { onOpen: onLoginOpen } = useLoginDialog();
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { data: userData, isPending: isLoading} = useCurrentUser();
  const user = userData?.user;

  const handleSell = () => {
    if (!user) {
      onLoginOpen();
      return;
    }
    router.push("/my-shop/add-listing")
  }

  return (
    <header className="w-full bg-primary sticky top-0 z-50 h-16 md:h-20 lg:h-24 shadow-sm">
      <nav className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-between ml-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl mr-4">
              <form className="w-full">
                <div className="relative">
                  <input
                    type="search"
                    name="keyword"
                    autoComplete="off"
                    placeholder="Search for cars"
                    className="w-full h-10 pl-4 pr-10 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <div className="hidden xl:flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  Service & Repair
                </Link>
                <Link
                  href="/pricing"
                  className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
                >
                  Pricing
                </Link>
              </div>

              <Separator
                orientation="vertical"
                className="h-6 bg-white/40 mx-4"
              />

              {/* Auth Buttons */}

              {isLoading ? (
                <Loader  className="w-5 h-5 animate-spin text-white"/>
              ) : !user ? (
                <div></div>
              ) : (
                <Button
                  onClick={onLogout}
                  className="text-white hover:bg-white/60 hover:text-white"
                >
                  Logout
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={onLoginOpen}
                  className="text-white hover:bg-white/60 hover:text-white"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onRegisterOpen}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Register
                </Button>
              </div>

              {/* Sell Car Button */}
              <Button className="bg-green-600 hover:bg-green-700 text-white ml-4">
                <Plus className="mr-2 h-4 w-4"
                 onClick={handleSell}/>
                Sell Car
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            <div className="px-4 space-y-4">
              <input
                type="search"
                placeholder="Search for cars"
                className="w-full h-10 px-4 border rounded-lg"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />

              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-900 hover:bg-gray-100 p-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block text-gray-900 hover:bg-gray-100 p-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Service & Repair
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-900 hover:bg-gray-100 p-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100"
                  onClick={() => {
                    onLoginOpen();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100"
                  onClick={() => {
                    onRegisterOpen();
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </Button>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Sell Car
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;