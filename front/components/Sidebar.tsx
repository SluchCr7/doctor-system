"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineCalendar,
    HiOutlineClipboardDocumentList,
    HiOutlineDocumentText,
    HiOutlineCurrencyDollar,
    HiOutlineChartBar,
    HiOutlineCog6Tooth,
    HiChevronDown,
    HiOutlineSquares2X2,
    HiOutlineUserCircle,
    HiOutlineBeaker,
} from "react-icons/hi2";
import { FiActivity } from "react-icons/fi";
import { clinicDoctor } from "@/data/mockData";

const menuItems = [
    {
        title: "Dashboard",
        path: "/",
        icon: <HiOutlineHome className="w-5 h-5" />,
    },
    {
        title: "Patients",
        path: "/patients",
        icon: <HiOutlineUsers className="w-5 h-5" />,
        submenu: [
            { title: "All Patients", path: "/patients" },
            { title: "Add Patient", path: "/patients/new" },
        ],
    },
    {
        title: "Appointments",
        path: "/appointments",
        icon: <HiOutlineCalendar className="w-5 h-5" />,
        submenu: [
            { title: "Calendar View", path: "/appointments/calendar" },
            { title: "Appointment List", path: "/appointments" },
            { title: "Waiting List", path: "/appointments/waiting" },
        ],
    },
    {
        title: "Billing & Payments",
        path: "/billing",
        icon: <HiOutlineCurrencyDollar className="w-5 h-5" />,
        submenu: [
            { title: "Invoices", path: "/billing" },
            { title: "Create Invoice", path: "/billing/create" },
            { title: "Payment History", path: "/billing/history" },
        ],
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <HiOutlineChartBar className="w-5 h-5" />,
        submenu: [
            { title: "Revenue Summary", path: "/reports/revenue" },
            { title: "Appointment Stats", path: "/reports/appointments" },
            { title: "Patient Growth", path: "/reports/growth" },
        ],
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <HiOutlineCog6Tooth className="w-5 h-5" />,
        submenu: [
            { title: "Doctor Profile", path: "/settings/doctor" },
            { title: "Clinic Information", path: "/settings/clinic" },
            { title: "Working Hours", path: "/settings/hours" },
            { title: "User Roles", path: "/settings/roles" },
            { title: "Data Backup", path: "/settings/backup" },
        ],
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (title: string) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 shrink-0">
                <div className={`flex items-center gap-3 transition-all duration-200 overflow-hidden ${isCollapsed ? "w-0 opacity-0" : "opacity-100"}`}>
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                        <FiActivity className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-slate-800 tracking-tight whitespace-nowrap">ClinicDoc</span>
                </div>

                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                            <FiActivity className="w-5 h-5" />
                        </div>
                    </div>
                )}

                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors"
                        aria-label="Collapse sidebar"
                    >
                        <HiOutlineSquares2X2 className="w-5 h-5" />
                    </button>
                )}

                {isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="absolute -right-3 top-5 bg-white border border-slate-200 rounded-full p-0.5 shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-all"
                        aria-label="Expand sidebar"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Doctor Profile Quick Card */}
            {!isCollapsed && (
                <Link href="/settings/account" className="mx-3 mt-4 mb-1 p-3 rounded-xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100/60 transition-colors flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow shrink-0">
                        <img src={clinicDoctor.image} alt={clinicDoctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-700 truncate group-hover:text-primary transition-colors">{clinicDoctor.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{clinicDoctor.specialty}</p>
                    </div>
                    <HiOutlineUserCircle className="w-4 h-4 text-slate-300 ml-auto shrink-0" />
                </Link>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path + "/"));
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isSubmenuOpen = openSubmenu === item.title;

                    return (
                        <div key={item.title}>
                            {hasSubmenu ? (
                                <div className="mb-0.5">
                                    <button
                                        onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                            ? "bg-primary/5 text-primary font-medium"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                        title={isCollapsed ? item.title : undefined}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`shrink-0 ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}>
                                                {item.icon}
                                            </span>
                                            {!isCollapsed && <span className="text-sm">{item.title}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <HiChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSubmenuOpen ? "rotate-180" : ""}`}
                                            />
                                        )}
                                    </button>

                                    {/* Submenu */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSubmenuOpen && !isCollapsed ? "max-h-52 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}>
                                        <div className="pl-10 space-y-0.5">
                                            {item.submenu!.map((sub) => (
                                                <Link
                                                    key={sub.path}
                                                    href={sub.path}
                                                    className={`block py-2 px-3 text-sm rounded-lg transition-colors ${pathname === sub.path
                                                        ? "text-primary font-semibold bg-primary/5"
                                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={item.path}
                                    title={isCollapsed ? item.title : undefined}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group mb-0.5 ${isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <span className={`shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}`}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span className="text-sm">{item.title}</span>}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="px-4 py-4 border-t border-slate-100 shrink-0">
                    <p className="text-[10px] text-slate-400 text-center">
                        ClinicDoc &copy; {new Date().getFullYear()} • Single-Doctor Edition
                    </p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
