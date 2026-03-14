import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d4a853]/10 flex items-center justify-center">
          <Search className="w-10 h-10 text-[#d4a853]" />
        </div>
        <h1 className="font-display text-6xl font-bold text-[#d4a853] mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-[#a1a1aa] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-gold inline-flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
