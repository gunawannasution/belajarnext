// app/product/loading.js
export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Skeleton untuk Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-md" />
          <div className="h-4 w-64 bg-slate-100 animate-pulse rounded-md" />
        </div>
        <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg" />
      </div>

      {/* Skeleton untuk DataTable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Header Tabel */}
          <div className="h-10 w-full bg-slate-100 animate-pulse rounded-md" />
          {/* Baris-baris Tabel (buat 5 baris) */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-slate-50/50 animate-pulse rounded-md border-b border-slate-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
