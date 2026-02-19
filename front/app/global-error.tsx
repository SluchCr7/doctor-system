'use client'

import { useEffect } from 'react'
import { FiAlertOctagon } from 'react-icons/fi'

export default function GlobalError({
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
        <html>
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center space-y-8 border border-slate-100">
                        <div className="w-24 h-24 bg-danger/10 rounded-full flex items-center justify-center mx-auto animate-bounce">
                            <FiAlertOctagon className="w-12 h-12 text-danger" />
                        </div>

                        <div>
                            <h1 className="text-4xl font-black mb-4 text-slate-900">System Critical Error</h1>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                A critical system error has occurred. Our team has been notified. Please try reloading the application.
                            </p>
                            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-left overflow-hidden">
                                <code className="text-xs text-danger font-mono block break-words">
                                    {error.message}
                                </code>
                            </div>
                        </div>

                        <button
                            onClick={() => reset()}
                            className="w-full py-4 bg-gradient-to-r from-danger to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-danger/30 transition-all transform hover:-translate-y-1"
                        >
                            Restart Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
