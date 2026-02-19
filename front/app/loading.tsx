import { FiLoader } from "react-icons/fi";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50/50 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FiLoader className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                </div>
                <p className="text-slate-500 text-sm font-bold animate-pulse">Loading System...</p>
            </div>
        </div>
    );
}
