"use client";

import { LogoutButton } from "@/app/login/_components/logoutButton";
import {
  ChevronRight,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  Shield,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/product", icon: LayoutDashboard },
    { name: "Inventaris", href: "/product/inventory", icon: Package },
    { name: "Pengguna", href: "/users", icon: Users, adminOnly: true },
    { name: "Pengaturan", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Tombol Toggle Mobile (Muncul hanya di HP) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-60 p-2 bg-white border rounded-lg md:hidden shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay untuk Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Utama */}
      <aside className={`
        fixed top-0 left-0 z-55 h-screen w-72 
        bg-white border-r border-slate-200 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full p-6">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Package className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              StockMaster
            </span>
          </div>

          {/* Menu Navigasi */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              if (item.adminOnly && user?.role !== "ADMIN") return null;
              
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group
                    ${active 
                      ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} />
                    {item.name}
                  </div>
                  {active && <ChevronRight size={14} />}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout (Bottom Section) */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-slate-100 border flex items-center justify-center text-indigo-600 font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 truncate w-32">{user?.name}</span>
                <span className="text-[10px] uppercase font-bold text-indigo-500 flex items-center gap-1">
                  <Shield size={10} /> {user?.role}
                </span>
              </div>
            </div>
            <LogoutButton />
          </div>
          
        </div>
      </aside>
    </>
  );
}
