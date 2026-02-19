"use client";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <FiCheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-2">Operation Successful</h2>
                    <p className="text-slate-500">The action has been completed successfully.</p>
                </div>

                <Link
                    href="/"
                    className="inline-block w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
                >
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}
