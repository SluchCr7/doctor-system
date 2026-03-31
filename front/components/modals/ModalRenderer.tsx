"use client";

/**
 * ModalRenderer — Global Modal Mount Point
 *
 * Reads from ModalContext and renders the appropriate modal.
 * All modals are lazy-loaded here to keep bundles small.
 * This component is mounted once in the root layout.
 */

import React from "react";
import { useModal } from "@/context/ModalContext";

// ── Modal Imports ─────────────────────────────────────────────────────────────
import AddPatientModal from "./AddPatientModal";
import AddMedicalRecordModal from "./AddMedicalRecordModal";
import BookAppointmentModal from "./BookAppointmentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import PrintPrescriptionModal from "./PrintPrescriptionModal";
import WritePrescriptionModal from "./WritePrescriptionModal";
import PaymentModal from "./PaymentModal";
import ViewHistoryModal from "./ViewHistoryModal";

export const ModalRenderer = () => {
    const { isOpen, modalType, modalProps, closeModal } = useModal();

    if (!modalType) return null;

    // Each case passes only the props relevant to that modal, ensuring
    // no stale data bleeds from one modal to the next.
    switch (modalType) {
        case "ADD_PATIENT":
            return (
                <AddPatientModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    onSubmit={(data: any) => {
                        console.log("Patient submitted:", data);
                        closeModal();
                    }}
                />
            );

        case "EDIT_PATIENT":
            return (
                <AddPatientModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    initialData={modalProps as any}
                    onSubmit={(data: any) => {
                        console.log("Patient updated:", data);
                        closeModal();
                    }}
                />
            );

        case "ADD_APPOINTMENT":
        case "RESCHEDULE_APPOINTMENT":
            return (
                <BookAppointmentModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    initialData={modalType === "RESCHEDULE_APPOINTMENT" ? (modalProps as any).initialData : undefined}
                    onSuccess={(modalProps as any)?.onSuccess}
                />
            );

        case "ADD_MEDICAL_RECORD":
            return (
                <AddMedicalRecordModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    patientName={(modalProps as any).patientName}
                    onSubmit={(data: any) => {
                        console.log("Medical record submitted:", data);
                        closeModal();
                    }}
                />
            );

        case "WRITE_PRESCRIPTION":
            return (
                <WritePrescriptionModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    patientName={(modalProps as any).patientName}
                    onSubmit={(data: any) => {
                        console.log("Prescription submitted:", data);
                        closeModal();
                    }}
                />
            );

        case "PRINT_PRESCRIPTION":
            return (
                <PrintPrescriptionModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    patientName={(modalProps as any).patientName ?? "Unknown Patient"}
                    medications={(modalProps as any).medications ?? []}
                />
            );

        case "DELETE_CONFIRMATION": {
            const p = modalProps as any;
            return (
                <DeleteConfirmationModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    onConfirm={() => {
                        p.onConfirm?.();
                        closeModal();
                    }}
                    title={p.title}
                    description={p.description}
                />
            );
        }

        case "PAYMENT":
            return (
                <PaymentModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    {...(modalProps as any)}
                />
            );

        case "VIEW_HISTORY":
            return (
                <ViewHistoryModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    {...(modalProps as any)}
                />
            );

        default:
            return null;
    }
};
