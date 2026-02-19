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
    HiOutlineUserGroup,
    HiOutlineCog6Tooth,
    HiChevronDown,
    HiChevronRight,
    HiOutlineSquares2X2
} from "react-icons/hi2";
import { FiActivity } from "react-icons/fi";

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
        title: "Medical Records",
        path: "/medical-records",
        icon: <HiOutlineClipboardDocumentList className="w-5 h-5" />,
        submenu: [
            { title: "All Records", path: "/medical-records" },
            { title: "Create Record", path: "/medical-records/create" },
        ],
    },
    {
        title: "Prescriptions",
        path: "/prescriptions",
        icon: <HiOutlineDocumentText className="w-5 h-5" />,
        submenu: [
            { title: "Prescription History", path: "/prescriptions" },
            { title: "Create Prescription", path: "/prescriptions/create" },
        ],
    },
    {
        title: "Billing",
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
            { title: "Revenue Report", path: "/reports/revenue" },
            { title: "Appointment Report", path: "/reports/appointments" },
            { title: "Patient Analytics", path: "/reports/analytics" },
        ],
    },
    {
        title: "Staff",
        path: "/staff",
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        submenu: [
            { title: "Staff List", path: "/staff" },
            { title: "Add Staff", path: "/staff/add" },
            { title: "Roles & Permissions", path: "/staff/roles" },
        ],
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <HiOutlineCog6Tooth className="w-5 h-5" />,
        submenu: [
            { title: "Clinic Info", path: "/settings/clinic" },
            { title: "Working Hours", path: "/settings/hours" },
            { title: "Notifications", path: "/settings/notifications" },
            { title: "Security", path: "/settings/security" },
            { title: "Account", path: "/settings/account" },
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
            className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                <div className={`flex items-center gap-3 transition-opacity duration-200 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        <FiActivity className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-slate-800 tracking-tight">ClinicDoc</span>
                </div>

                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                            <FiActivity className="w-5 h-5" />
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors ${isCollapsed ? "hidden" : "block"}`}
                >
                    <HiOutlineSquares2X2 className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="h-[calc(100vh-4rem)] overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isSubmenuOpen = openSubmenu === item.title;

                    return (
                        <div key={item.title}>
                            {hasSubmenu ? (
                                <div className="mb-1">
                                    <button
                                        onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/5 text-primary font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}>
                                                {item.icon}
                                            </span>
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <HiChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSubmenuOpen ? "transform rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {/* Submenu Items */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSubmenuOpen && !isCollapsed ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"
                                        }`}>
                                        <div className="pl-10 space-y-1">
                                            {item.submenu!.map((sub) => (
                                                <Link
                                                    key={sub.path}
                                                    href={sub.path}
                                                    className={`block py-2 px-3 text-sm rounded-lg transition-colors ${pathname === sub.path
                                                        ? "text-primary font-medium bg-primary/5"
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
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group mb-1 ${isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}`}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span>{item.title}</span>}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
