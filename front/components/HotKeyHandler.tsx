"use client";

import { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

export default function HotKeyHandler() {
  const { openModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K for Quick Search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openModal("QUICK_SEARCH");
      }
      
      // CMD+O for Appointments
      if ((e.metaKey || e.ctrlKey) && e.key === "o") {
        e.preventDefault();
        openModal("ADD_APPOINTMENT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal]);

  return null;
}
