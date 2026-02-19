'use client'

import { useEffect } from 'react'
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto">
                    <FiAlertCircle className="w-10 h-10 text-danger" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-800">Something went wrong!</h2>
                    <p className="text-slate-500 text-sm">{error.message || "An unexpected error occurred while processing your request."}</p>
                </div>

                <button
                    onClick={reset}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                >
                    <FiRefreshCw className="w-4 h-4" /> Try again
                </button>
            </div>
        </div>
    )
}
