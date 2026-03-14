"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Roam & Roar"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="font-display text-2xl font-bold text-white tracking-wide">
              ROAM & ROAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#zones"
              className="text-sm font-medium text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
            >
              Safari Zones
            </Link>
            <Link href="/booking" className="btn-gold text-sm">
              Book Safari
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#262626] py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-[#a1a1aa] hover:text-[#d4a853]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#zones"
                className="text-sm font-medium text-[#a1a1aa] hover:text-[#d4a853]"
                onClick={() => setIsMenuOpen(false)}
              >
                Safari Zones
              </Link>
              <Link
                href="/booking"
                className="btn-gold text-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Safari
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
