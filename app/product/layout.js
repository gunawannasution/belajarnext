// app/product/layout.js
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { cookies } from "next/headers";

export default async function ProductLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  
  let user = null;
  if (session) {
    try {
      user = JSON.parse(session.value);
    } catch (e) {
      user = null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar user={user} />
      
      {/* md:ml-72 memberikan ruang agar konten tidak tertutup sidebar di desktop */}
      <div className="md:ml-72 flex flex-col min-h-screen">
        <main className="grow p-4 md:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
