"use client";

import { Github, Package, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Sisi Kiri: Brand & Copyright */}
          <div className="flex items-center gap-2 text-slate-500">
            <Package className="h-5 w-5 text-indigo-600" />
            <p className="text-sm">
              © {currentYear} <span className="font-semibold text-slate-900">StockMaster</span>. 
              Semua hak dilindungi.
            </p>
          </div>

          {/* Sisi Tengah: Status Sistem (Enterprise Look) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Operational
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              v1.0.4-stable
            </div>
          </div>

          {/* Sisi Kanan: Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Bantuan</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privasi</a>
            <a href="https://github.com" target="_blank" className="hover:text-slate-900 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
