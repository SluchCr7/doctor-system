import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 ml-64 min-h-screen flex flex-col">
                <Topbar />
                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
