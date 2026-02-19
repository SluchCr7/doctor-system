"use client";

/**
 * ModalContext — Centralized Modal State Manager
 *
 * Usage: import { useModal } from "@/context/ModalContext"
 * Then call: openModal("ADD_PATIENT", { someData: "..." })
 * Close from anywhere: closeModal()
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ── Modal Type Registry ───────────────────────────────────────────────────────
export type ModalType =
    | "ADD_PATIENT"
    | "EDIT_PATIENT"
    | "DELETE_CONFIRMATION"
    | "ADD_APPOINTMENT"
    | "RESCHEDULE_APPOINTMENT"
    | "ADD_MEDICAL_RECORD"
    | "WRITE_PRESCRIPTION"
    | "PRINT_PRESCRIPTION"
    | "PAYMENT"
    | "VIEW_HISTORY";

// ── Typed Props Per Modal ─────────────────────────────────────────────────────
export interface DeleteConfirmationProps {
    title?: string;
    description?: string;
    onConfirm: () => void;
}

export interface EditPatientProps {
    initialData: Record<string, any>;
}

export interface PaymentProps {
    patientId: string;
    patientName: string;
    amount: number;
    invoiceId?: string;
}

export interface ViewHistoryProps {
    patientId: string;
    patientName: string;
}

export interface PrintPrescriptionProps {
    patientName: string;
    medications: any[];
}

export interface MedicalRecordProps {
    patientName?: string;
}

export interface PrescriptionProps {
    patientName?: string;
}

export interface AppointmentProps {
    initialData?: Record<string, any>;
}

// ── Union of all possible modal props ─────────────────────────────────────────
export type ModalProps =
    | DeleteConfirmationProps
    | EditPatientProps
    | PaymentProps
    | ViewHistoryProps
    | PrintPrescriptionProps
    | MedicalRecordProps
    | PrescriptionProps
    | AppointmentProps
    | Record<string, any>;

// ── Context type ──────────────────────────────────────────────────────────────
interface ModalContextType {
    isOpen: boolean;
    modalType: ModalType | null;
    modalProps: ModalProps;
    openModal: (type: ModalType, props?: ModalProps) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [modalProps, setModalProps] = useState<ModalProps>({});

    const openModal = useCallback((type: ModalType, props: ModalProps = {}) => {
        setModalType(type);
        setModalProps(props);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Delay clearing props to allow exit animations to play
        setTimeout(() => {
            setModalType(null);
            setModalProps({});
        }, 200);
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, modalType, modalProps, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a <ModalProvider>");
    }
    return context;
};
