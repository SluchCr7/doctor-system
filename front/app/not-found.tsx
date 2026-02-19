import Link from 'next/link'
import { FiAlertTriangle } from 'react-icons/fi'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                    <FiAlertTriangle className="w-10 h-10 text-warning" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
                    <p className="text-slate-500">Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
                >
                    Return to Dashboard
                </Link>
            </div>
        </div>
    )
}
