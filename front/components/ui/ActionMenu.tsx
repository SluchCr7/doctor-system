"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiEllipsisVertical } from "react-icons/hi2";
import clsx from "clsx";

export interface ActionMenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
    disabled?: boolean;
}

interface ActionMenuProps {
    items: ActionMenuItem[];
    align?: "left" | "right";
    trigger?: React.ReactNode;
}

export const ActionMenu = ({ items, align = "right", trigger }: ActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Calculate position when opening
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;

            // Default: position below trigger
            let top = rect.bottom + scrollY + 4;
            let left = align === "right"
                ? rect.right - 192 // 192px is w-48
                : rect.left;

            // Simple bounds check (very basic)
            if (left < 10) left = 10;
            if (window.innerWidth - left < 200) left = window.innerWidth - 210;

            setPosition({ top, left });
        }
    }, [isOpen, align]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", () => setIsOpen(false)); // Close on scroll
            window.addEventListener("resize", () => setIsOpen(false)); // Close on resize
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsOpen(false));
            window.removeEventListener("resize", () => setIsOpen(false));
        };
    }, [isOpen]);

    return (
        <>
            <button
                ref={triggerRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className={clsx(
                    "p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                    isOpen && "bg-primary/5 text-primary"
                )}
            >
                {trigger || <HiEllipsisVertical className="w-5 h-5 pointer-events-none" />}
            </button>

            {/* Portal to body to avoid z-index/overflow issues */}
            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -4 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                position: "absolute",
                                top: position.top,
                                left: position.left,
                                zIndex: 9999
                            }}
                            className="bg-white rounded-xl shadow-lg border border-slate-100 w-48 py-1.5 origin-top-right overflow-hidden focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {items.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!item.disabled) {
                                            item.onClick();
                                            setIsOpen(false);
                                        }
                                    }}
                                    disabled={item.disabled}
                                    className={clsx(
                                        "w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors",
                                        item.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50",
                                        item.danger
                                            ? "text-red-600 hover:bg-red-50"
                                            : "text-slate-600 hover:text-slate-900"
                                    )}
                                >
                                    {item.icon && <span className={clsx("text-lg", item.danger ? "text-red-500" : "text-slate-400")}>{item.icon}</span>}
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
