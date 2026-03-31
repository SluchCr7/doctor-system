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
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ paddingLeft: '288px' }}>
                <Topbar />
                <main className="flex-1 overflow-x-hidden">
                    <div className="mx-auto max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
