"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { motion } from "framer-motion";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Entry",
    description = "This action is permanent and cannot be undone. Are you sure you wish to proceed?",
    isLoading = false
}: DeleteConfirmationModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
            <div className="flex flex-col items-center text-center py-6">
                <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-lg shadow-red-100/50"
                >
                    <HiOutlineExclamationTriangle className="w-10 h-10 text-red-500" />
                </motion.div>
                
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    {title}
                </h3>
                
                <p className="text-base text-slate-500 font-medium mb-10 max-w-[280px] mx-auto leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col gap-3 w-full">
                    <Button
                        size="lg"
                        variant="ghost"
                        onClick={onClose}
                        className="w-full rounded-2xl font-bold text-slate-400 hover:text-slate-600 h-14"
                        disabled={isLoading}
                    >
                        Keep Entry
                    </Button>
                    <Button
                        size="lg"
                        onClick={onConfirm}
                        className="w-full rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-200/50 h-14"
                        isLoading={isLoading}
                    >
                        Yes, Delete Permanently
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;
