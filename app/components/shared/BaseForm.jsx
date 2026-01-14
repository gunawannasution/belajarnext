"use client"

import { useState } from "react"

/**
 * ============================================================
 * BASE FORM
 * ============================================================
 *
 * Komponen ini adalah:
 * - Pembungkus FORM HTML
 * - Penanggung jawab lifecycle submit
 *
 * Komponen ini BUKAN:
 * - Validator bisnis
 * - Pengelola database
 * - Pengelola field state satu per satu
 *
 * ============================================================
 * KONTRAK onSubmit (WAJIB DIPATUHI PARENT)
 * ============================================================
 *
 * onSubmit(payload) HARUS mengembalikan:
 *
 * {
 *   success: boolean,
 *   message?: string,
 *   data?: any
 * }
 *
 * ============================================================
 */
export function BaseForm({
    onSubmit,
    children,
    buttonText = "Simpan",
    /**
     * Jika true:
     * - payload dikirim sebagai FormData
     * - WAJIB untuk upload file sungguhan
     */
    rawFormData = false,
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const payload = rawFormData
            ? formData
            : Object.fromEntries(formData.entries())

        try {
            const result = await onSubmit(payload)

            if (result?.success === false) {
                setError(result.message || "Terjadi kesalahan")
            }
        } catch (err) {
            console.error("[BaseForm]", err)
            setError("Terjadi kesalahan sistem")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="
                space-y-6
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
            "
        >
            {children}

            {error && (
                <div
                    role="alert"
                    className="
                        rounded-lg
                        border border-red-200
                        bg-red-50
                        px-4 py-3
                        text-sm
                        text-red-700
                    "
                >
                    {error}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        inline-flex items-center justify-center
                        rounded-lg
                        bg-blue-600
                        px-6 py-2.5
                        text-sm font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:ring-offset-2
                        disabled:cursor-not-allowed
                        disabled:bg-gray-400
                    "
                >
                    {loading ? "Memproses..." : buttonText}
                </button>
            </div>
        </form>
    )
}

/**
 * ============================================================
 * INPUT FIELD
 * ============================================================
 *
 * Digunakan untuk:
 * - text
 * - email
 * - number
 * - password
 *
 * FormData hanya membaca input yang punya "name"
 */
export function InputField({ label, name, type = "text", ...props }) {
    return (
        <div className="space-y-1">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className="
                    block w-full
                    rounded-lg
                    border border-gray-300
                    px-3 py-2
                    text-sm
                    shadow-sm
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-1
                    focus:ring-blue-500
                "
                {...props}
            />
        </div>
    )
}

/**
 * ============================================================
 * TEXTAREA FIELD
 * ============================================================
 *
 * Digunakan untuk teks panjang:
 * - deskripsi
 * - catatan
 * - alamat
 */
export function TextAreaField({ label, name, ...props }) {
    return (
        <div className="space-y-1">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                className="
                    block w-full
                    rounded-lg
                    border border-gray-300
                    px-3 py-2
                    text-sm
                    shadow-sm
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-1
                    focus:ring-blue-500
                "
                {...props}
            />
        </div>
    )
}

/**
 * ============================================================
 * SELECT FIELD
 * ============================================================
 *
 * options = [{ value: "1", label: "Admin" }]
 */
export function SelectField({ label, name, options = [], ...props }) {
    return (
        <div className="space-y-1">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                id={name}
                name={name}
                className="
                    block w-full
                    rounded-lg
                    border border-gray-300
                    bg-white
                    px-3 py-2
                    text-sm
                    shadow-sm
                    focus:border-blue-500
                    focus:ring-1
                    focus:ring-blue-500
                "
                {...props}
            >
                <option value="">Pilih {label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

/**
 * ============================================================
 * CHECKBOX FIELD
 * ============================================================
 *
 * FormData result:
 * - checked   → "on"
 * - unchecked → undefined
 *
 * Konversi ke boolean dilakukan di parent
 */
export function CheckboxField({ label, name, ...props }) {
    return (
        <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
                type="checkbox"
                id={name}
                name={name}
                className="
                    h-4 w-4
                    rounded
                    border-gray-300
                    text-blue-600
                    focus:ring-blue-500
                "
                {...props}
            />
            {label}
        </label>
    )
}

/**
 * ============================================================
 * RADIO FIELD
 * ============================================================
 *
 * options = [
 *   { value: "pria", label: "Laki-laki" },
 *   { value: "wanita", label: "Perempuan" }
 * ]
 */
export function RadioField({ label, name, options = [], ...props }) {
    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <div className="flex gap-6">
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className="flex items-center gap-2 text-sm text-gray-700"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            className="
                                h-4 w-4
                                border-gray-300
                                text-blue-600
                                focus:ring-blue-500
                            "
                            {...props}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    )
}

/**
 * ============================================================
 * FILE FIELD
 * ============================================================
 *
 * Catatan penting:
 * - Gunakan rawFormData={true} di BaseForm
 * - Jangan convert ke object
 */
export function FileField({ label, name, ...props }) {
    return (
        <div className="space-y-1">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type="file"
                id={name}
                name={name}
                className="
                    block w-full
                    text-sm text-gray-600
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-blue-50
                    file:px-4
                    file:py-2
                    file:text-sm
                    file:font-medium
                    file:text-blue-700
                    hover:file:bg-blue-100
                "
                {...props}
            />
        </div>
    )
}
