"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const preguntas = [
  {
    pregunta: "¿Dónde nos conocimos?",
    opciones: [
      "En el colegio",
      "En la casa de Cami",
      "En una fiesta de egresados",
    ],
    correcta: "En la casa de Cami",
  },
  {
    pregunta: "¿Quién dijo te amo primero?",
    opciones: ["Candela", "Tomás", "Los dos"],
    correcta: "Tomás",
  },
  {
    pregunta: "¿Cuál fue nuestro primer viaje?",
    opciones: ["Bariloche", "Mendoza", "Mar del Plata"],
    correcta: "Mendoza",
  },
];

export default function TriviaSection() {
  const [step, setStep] = useState<number | null>(null);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [score, setScore] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const actual = step !== null ? preguntas[step] : null;

  const handleSelect = (op: string) => {
    if (mostrarResultado || !actual) return;

    setSeleccion(op);
    setMostrarResultado(true);

    if (op === actual.correcta) {
      setScore((prev) => prev + 1);
    }
  };

  const next = () => {
    if (step === null) return;

    if (step === preguntas.length - 1) {
      setFinalizado(true);
      return;
    }

    setStep(step + 1);
    setSeleccion(null);
    setMostrarResultado(false);
  };

  const reiniciarTrivia = () => {
    setStep(null);
    setSeleccion(null);
    setMostrarResultado(false);
    setScore(0);
    setFinalizado(false);
  };

  const porcentaje = Math.round((score / preguntas.length) * 100);

  const mensajeFinal =
    porcentaje === 100
      ? "Ok… esto ya es sospechoso, nos conocés demasiado bien ✨"
      : porcentaje >= 67
      ? "Muy bien, se nota que prestaste atención 🤍"
      : porcentaje >= 34
      ? "Nada mal… pero todavía te falta un poquito 🤭"
      : "Mmm… tenemos que contarte mejor nuestra historia 😅";

  return (
   <motion.section
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
  className="relative z-10 w-full px-6 py-16 bg-[url('/images/fondo-boda-hd.png')] bg-cover bg-center"
>
  {/* overlay */}
  <div className="absolute inset-0 bg-white/80" />

  {/* CONTENIDO */}
  <div className="relative z-10 mx-auto max-w-xl text-center">

    <div className="mb-6 flex justify-center">
      <div className="rounded-full border border-[#d6dde7] bg-[#f7f9fc] p-5">
        <Sparkles className="text-[#7f98b6]" size={24} />
      </div>
    </div>

    {step === null && !finalizado ? (
      <>
        <h2 className="text-2xl font-light uppercase tracking-[0.16em] text-[#7f98b6] md:text-3xl">
          ¿Cuánto nos conocés?
        </h2>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#8ea1b9]">
          Juguemos un poco
        </p>

        <button
          onClick={() => setStep(0)}
          className="mt-10 w-full rounded-full bg-[#7f98b6] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#6f89a6]"
        >
          Iniciar trivia
        </button>
      </>
    ) : finalizado ? (
      <>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8ea1b9]">
          Resultado final
        </p>

        <h3 className="mt-4 text-2xl font-light text-[#7f98b6] md:text-3xl">
          Nos conocés {porcentaje}% ✨
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#5f6470] md:text-base">
          {mensajeFinal}
        </p>

        <div className="mt-8 h-[8px] w-full overflow-hidden rounded-full bg-[#dfe6ef]">
          <div
            className="h-full rounded-full bg-[#7f98b6] transition-all duration-700"
            style={{ width: `${porcentaje}%` }}
          />
        </div>

        <p className="mt-4 text-sm text-[#8ea1b9]">
          Respuestas correctas: {score} de {preguntas.length}
        </p>

        <button
          onClick={reiniciarTrivia}
          className="mt-10 w-full rounded-full bg-[#7f98b6] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#6f89a6]"
        >
          Volver a jugar
        </button>
      </>
    ) : (
      <>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8ea1b9]">
          Pregunta {step! + 1} de {preguntas.length}
        </p>

        <div className="mt-6 h-[6px] w-full overflow-hidden rounded-full bg-[#dfe6ef]">
          <div
            className="h-full bg-[#7f98b6] transition-all duration-500"
            style={{
              width: `${(((step ?? 0) + 1) / preguntas.length) * 100}%`,
            }}
          />
        </div>

        <h3 className="mt-6 text-xl font-light text-[#7f98b6] md:text-2xl">
          {actual?.pregunta}
        </h3>

        <div className="mt-8 space-y-3">
          {actual?.opciones.map((op) => {
            const isSelected = seleccion === op;
            const isCorrect = op === actual.correcta;

            let style =
              "border-[#d9e1ea] bg-white text-[#5f6470] hover:bg-[#f7f9fc]";

            if (mostrarResultado && isSelected) {
              style = isCorrect
                ? "border-[#7f98b6] bg-[#eef3f8] text-[#5f6470]"
                : "border-[#e0c9c9] bg-[#f8eaea] text-[#a94442]";
            }

            if (mostrarResultado && !isSelected && isCorrect) {
              style = "border-[#d6dde7] bg-[#f7f9fc] text-[#5f6470]";
            }

            return (
              <button
                key={op}
                onClick={() => handleSelect(op)}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition ${style}`}
              >
                {op}
              </button>
            );
          })}
        </div>

        {mostrarResultado && seleccion && (
          <p className="mt-6 text-sm text-[#5f6470]">
            {seleccion === actual?.correcta
              ? "✨ Correcto"
              : `Incorrecto. Era: ${actual?.correcta}`}
          </p>
        )}

        {mostrarResultado && (
          <button
            onClick={next}
            className="mt-8 w-full rounded-full bg-[#7f98b6] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#6f89a6]"
          >
            {step === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
          </button>
        )}
      </>
    )}
  </div>
</motion.section>

  );
}