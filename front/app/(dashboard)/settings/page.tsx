"use client";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsIndex() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user?.role === "patient") {
                router.replace("/settings/personal");
            } else {
                router.replace("/settings/clinic");
            }
        }
    }, [user, loading, router]);

    return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
