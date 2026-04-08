"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function GiftModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

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
            className="fixed inset-0 z-[9998] bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute right-5 top-5 text-[#a7b2c2] transition hover:text-[#7f98b6]"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d6dde7] bg-[#f7f9fc]">
                  <Gift size={28} className="text-[#7f98b6]" />
                </div>

                <h2 className="text-2xl font-light uppercase tracking-[0.18em] text-[#7f98b6] md:text-3xl">
                  Regalo
                </h2>
 <div className="mt-8 rounded-[24px] border border-[#e6ebf1] bg-[#fafbfd] p-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8ea1b9]">
                  Alias
                </p>
                <p className="mt-2 text-base text-[#5f6470]">xxxx</p>

                <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[#8ea1b9]">
                  Titular
                </p>
                <p className="mt-2 text-base text-[#5f6470]">Candela Tomás</p>
              </div>

                <p className="mt-5 text-sm leading-relaxed text-[#5f6470] md:text-base">
                  Gracias por acompañarnos en este momento tan especial.
                </p>

                <button className="mt-8 rounded-full bg-[#7f98b6] px-8 py-3 text-sm uppercase tracking-[0.16em] text-white transition hover:bg-[#6f89a6]">
                  Copiar alias
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}