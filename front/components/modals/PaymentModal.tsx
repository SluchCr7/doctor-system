"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
    FiCreditCard, FiDollarSign, FiCheckCircle,
    FiUser, FiHash, FiCalendar
} from "react-icons/fi";

import financialService from "@/services/financialService";
import toast from "react-hot-toast";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId?: string;
    patientName?: string;
    amount?: number;
    invoiceId?: string;
    onSuccess?: () => void;
}

type PaymentStep = "form" | "success";

const PaymentModal = ({
    isOpen,
    onClose,
    patientId = "",
    patientName = "Unknown Patient",
    amount = 0,
    invoiceId = "",
    onSuccess,
}: PaymentModalProps) => {
    const [step, setStep] = useState<PaymentStep>("form");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        method: "Cash",
        notes: "",
        discount: "0",
    });

    const discount = parseFloat(formData.discount) || 0;
    const finalAmount = Math.max(0, amount - discount);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await financialService.pay({
                invoiceId: invoiceId && invoiceId !== "manual" ? invoiceId : undefined,
                amount: finalAmount,
                paymentMethod: formData.method,
                description: formData.notes || undefined
            });
            setIsLoading(false);
            setStep("success");
        } catch (err: any) {
            setIsLoading(false);
            toast.error(err.response?.data?.message || "Failed to process payment");
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep("form");
            setFormData({ method: "Cash", notes: "", discount: "0" });
        }, 300);
    };

    const handleDone = () => {
        onSuccess?.();
        handleClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={step === "success" ? "Payment Complete" : "Process Payment"}
            description={step === "success" ? undefined : `Recording payment for ${patientName}`}
            size="md"
        >
            {step === "success" ? (
                /* ── Success State ─────────────────────────────────────── */
                <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                        <FiCheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Payment Recorded!</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            ${finalAmount.toFixed(2)} received via {formData.method}
                        </p>
                    </div>
                    <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-5 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Patient</span>
                            <span className="font-semibold text-slate-800">{patientName}</span>
                        </div>
                        {invoiceId && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Invoice</span>
                                <span className="font-semibold text-slate-800">{invoiceId}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Method</span>
                            <span className="font-semibold text-slate-800">{formData.method}</span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                            <span className="text-slate-700 font-semibold">Total Paid</span>
                            <span className="font-bold text-emerald-600 text-base">${finalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button onClick={handleDone} className="w-full">Done</Button>
                </div>
            ) : (
                /* ── Form State ────────────────────────────────────────── */
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Patient / Invoice Info */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 text-slate-500">
                                <FiUser className="w-4 h-4" />
                                <span>Patient</span>
                            </div>
                            <span className="font-semibold text-slate-800">{patientName}</span>
                        </div>
                        {invoiceId && (
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <FiHash className="w-4 h-4" />
                                    <span>Invoice</span>
                                </div>
                                <span className="font-semibold text-slate-800">{invoiceId}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-2 text-slate-500">
                                <FiDollarSign className="w-4 h-4" />
                                <span>Original Amount</span>
                            </div>
                            <span className="font-bold text-slate-800">${amount.toFixed(2)}</span>
                        </div>
                    </div>

                    <Select
                        label="Payment Method"
                        options={[
                            { label: "Cash", value: "Cash" },
                            { label: "Credit Card", value: "Credit Card" },
                            { label: "Debit Card", value: "Debit Card" },
                            { label: "Insurance", value: "Insurance" },
                            { label: "Bank Transfer", value: "Bank Transfer" },
                        ]}
                        value={formData.method}
                        onChange={e => handleChange("method", e.target.value)}
                    />

                    <Input
                        label="Discount / Waiver ($)"
                        type="number"
                        min="0"
                        max={amount.toString()}
                        step="0.01"
                        placeholder="0.00"
                        leftIcon={<FiDollarSign />}
                        value={formData.discount}
                        onChange={e => handleChange("discount", e.target.value)}
                    />

                    {/* Final Amount Preview */}
                    <div className="flex justify-between items-center bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
                        <span className="text-sm font-semibold text-slate-700">Total to Collect</span>
                        <span className="text-xl font-bold text-primary">${finalAmount.toFixed(2)}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Notes (Optional)</label>
                        <textarea
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all resize-none placeholder:text-slate-400"
                            rows={2}
                            placeholder="Any additional payment notes..."
                            value={formData.notes}
                            onChange={e => handleChange("notes", e.target.value)}
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <Button variant="ghost" type="button" onClick={handleClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            leftIcon={<FiCreditCard />}
                        >
                            Confirm Payment
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default PaymentModal;
