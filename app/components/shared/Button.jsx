"use client"

import clsx from "clsx"

/**
 * ============================================================
 * BUTTON (ENTERPRISE STANDARD)
 * ============================================================
 *
 * Prinsip desain:
 * - Satu sumber kebenaran untuk style tombol
 * - Variants (primary, secondary, danger, ghost)
 * - State: loading, disabled
 *
 * Button TIDAK:
 * - submit form kecuali type="submit"
 * - tahu soal API / server
 */
export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    type = "button",
    className,
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={clsx(
                // Base style
                "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",

                // Size
                {
                    "px-3 py-1.5 text-sm": size === "sm",
                    "px-4 py-2 text-sm": size === "md",
                    "px-6 py-2.5 text-base": size === "lg",
                },

                // Variant
                {
                    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
                        variant === "primary",

                    "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400":
                        variant === "secondary",

                    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
                        variant === "danger",

                    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400":
                        variant === "ghost",
                },

                className
            )}
            {...props}
        >
            {loading ? "Memproses..." : children}
        </button>
    )
}
