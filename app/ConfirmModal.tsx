"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ConfirmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [asistencia, setAsistencia] = useState("si");
  const [alergia, setAlergia] = useState("no");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[30px] bg-white px-8 py-10 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute right-5 top-5 text-[#9aa9bd] transition hover:text-[#7f98b6]"
              >
                <X size={20} />
              </button>

              <h2 className="text-center text-lg uppercase tracking-[0.4em] text-[#2f2f2f] md:text-xl">
                Confirmá tu asistencia
              </h2>

              <p className="mt-3 text-center text-sm text-[#6b6b6b]">
                Seleccioná tu nombre y elegí el menú.
              </p>

              <div className="mt-8">
                <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                  Nombre y apellido
                </p>

                <input
                  type="text"
                  placeholder="Ingresá tu nombre"
                  className="w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-sm outline-none focus:border-[#7f98b6]"
                />
              </div>

              <div className="mt-8 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                  Asistencia
                </p>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center justify-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="asistencia"
                      checked={asistencia === "si"}
                      onChange={() => setAsistencia("si")}
                    />
                    Voy a asistir
                  </label>

                  <label className="flex items-center justify-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="asistencia"
                      checked={asistencia === "no"}
                      onChange={() => setAsistencia("no")}
                    />
                    No podré asistir
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                  Menú
                </p>

                <select className="w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-sm outline-none focus:border-[#7f98b6]">
                  <option>Seleccioná una opción</option>
                  <option>Carne</option>
                  <option>Vegetariano</option>
                  <option>Vegano</option>
                </select>
              </div>

              <div className="mt-8 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                  ¿Tenés alguna alergia o restricción alimentaria?
                </p>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center justify-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="alergia"
                      checked={alergia === "no"}
                      onChange={() => setAlergia("no")}
                    />
                    No
                  </label>

                  <label className="flex items-center justify-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="alergia"
                      checked={alergia === "si"}
                      onChange={() => setAlergia("si")}
                    />
                    Sí
                  </label>
                </div>
              </div>

              <button className="mt-10 w-full rounded-full bg-[#7f98b6] py-4 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-[#6f89a6]">
                Confirmar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}