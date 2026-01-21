"use client";

import { LogoutButton } from "@/app/login/_components/logoutButton";
import { LayoutDashboard, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ user }) {
  const pathname = usePathname();

  // Helper untuk menandai link yang sedang aktif
  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Sisi Kiri: Logo & Navigasi */}
          <div className="flex items-center gap-8">
            <Link href="/product" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Gunawan
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/product" active={isActive("/product")}>
                <LayoutDashboard className="h-4 w-4" />
                Produk
              </NavLink>
              {/* Tampilkan menu user hanya jika role-nya ADMIN */}
              {user?.role === "ADMIN" && (
                <NavLink href="/users" active={isActive("/users")}>
                  <Users className="h-4 w-4" />
                  Pengguna
                </NavLink>
              )}
            </nav>
          </div>

          {/* Sisi Kanan: Info User & Logout */}
          <div className="flex items-center gap-4 border-l pl-6 border-slate-100">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-900 leading-none">
                {user?.name || "Guest"}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 mt-1">
                {user?.role || "Visitor"}
              </span>
            </div>
            
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

// Sub-komponen untuk link navigasi agar kode lebih bersih
function NavLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? "bg-slate-100 text-indigo-600" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}
