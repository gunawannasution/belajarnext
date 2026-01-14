/**
 * ============================================================
 * TABLE (ENTERPRISE STANDARD)
 * ============================================================
 *
 * Table ini:
 * - Tidak tahu data apa
 * - Tidak tahu API
 * - Tidak tahu pagination
 *
 * Hanya:
 * - render data
 * - konsisten secara visual
 */
/**
 /**
 * ============================================================
 * TABLE — ENTERPRISE PREMIUM (SaaS GRADE)
 * ============================================================
 *
 * Rasa desain:
 * - Calm
 * - Confident
 * - High-end dashboard
 */
export function Table({ columns, data }) {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]
            "
        >
            <table className="min-w-full text-sm">
                {/* ================= HEADER ================= */}
                <thead>
                    <tr
                        className="
                            bg-linear-to-b
                            from-gray-50
                            to-white
                        "
                    >
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="
                                    px-6 py-4
                                    text-left
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-500
                                    border-b
                                    border-gray-200
                                "
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* ================= BODY ================= */}
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="
                                    px-6 py-16
                                    text-center
                                "
                            >
                                <div className="mx-auto max-w-sm space-y-2">
                                    <div className="text-sm font-medium text-gray-700">
                                        Tidak ada data
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Data akan muncul setelah Anda menambahkan
                                        item baru
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}

                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="
                                group
                                transition
                                hover:bg-linear-to-r
                                hover:from-gray-50
                                hover:to-white
                            "
                        >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={col.key}
                                    className={`
                                        px-6 py-4
                                        text-gray-700
                                        whitespace-nowrap
                                        ${colIndex === columns.length - 1
                                            ? "text-right"
                                            : ""}
                                    `}
                                >
                                    {col.render
                                        ? col.render(row)
                                        : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
