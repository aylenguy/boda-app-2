"use client";

import ConfirmModal from "./ConfirmModal";
import TriviaSection from "./TriviaSection";
import GiftModal from "./GiftModal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  MapPin,
  Camera,
  Music4,
  HeartHandshake,
  Sparkles,
  Gift,
  Play,
  Pause,
  Church,
  PartyPopper,
  Wine,
  Utensils,
  Disc3,
} from "lucide-react";

const weddingDate = new Date("2026-07-24T18:00:00");

function useCountdown(targetDate: Date) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
      <span className="text-[28px] font-light leading-none tracking-tight text-[#7f98b6] sm:text-5xl md:text-7xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[9px] uppercase tracking-[0.14em] text-[#7f98b6] sm:mt-3 sm:text-xs md:text-sm">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="hidden text-3xl font-light leading-none text-[#7f98b6] sm:block md:text-6xl">
      :
    </span>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#d6dde7] bg-white/85 shadow-sm md:mb-5 md:h-14 md:w-14">
        {icon}
      </div>

      <h2 className="text-center text-xl font-light uppercase tracking-[0.2em] text-[#7f98b6] sm:text-2xl md:text-3xl md:tracking-[0.25em]">
        {children}
      </h2>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/72 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm md:rounded-[28px] md:p-6">
      <div className="mb-4 flex items-center justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4dbe4] bg-[#f7f9fc] md:h-12 md:w-12">
          {icon}
        </div>
      </div>

      <h3 className="text-center text-xs uppercase tracking-[0.22em] text-[#8ea1b9] md:text-sm md:tracking-[0.24em]">
        {title}
      </h3>

      <div className="mt-4 text-center text-[#5f6470]">{children}</div>
    </div>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[26px] border border-white/70 bg-white/72 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm md:rounded-[30px] md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const countdown = useCountdown(weddingDate);

  const countdownItems = useMemo(
    () => [
      { value: countdown.days, label: "Días" },
      { value: countdown.hours, label: "Horas" },
      { value: countdown.minutes, label: "Minutos" },
      { value: countdown.seconds, label: "Segundos" },
    ],
    [countdown]
  );

  useEffect(() => {
    if (!entered || !audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.play().catch(() => {
        setMusicPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [entered, musicPlaying]);

  const toggleMusic = () => {
    setMusicPlaying((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen text-[#5f6470]">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/boda.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(247,247,245,1))]" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-[#7f98b6] sm:text-[11px] md:text-xs md:tracking-[0.5em]">
                Invitación
              </p>

              <h1 className="text-3xl font-light uppercase tracking-[0.12em] text-[#7f98b6] sm:text-4xl md:text-6xl md:tracking-[0.14em]">
                Candela &amp; Tomás
              </h1>

              <p className="mt-6 max-w-2xl text-xs uppercase tracking-[0.12em] text-[#7f98b6] sm:text-sm md:text-xl md:tracking-[0.14em]">
                El camino es más divertido si lo recorremos juntos
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => setEntered(true)}
                className="mt-10 border border-[#7f98b6] bg-[#7f98b6] px-8 py-3 text-sm uppercase tracking-[0.08em] text-white transition hover:bg-[#6f89a6] sm:px-10 md:text-lg"
              >
                Ingresar
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            key="card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen"
          >
            <div className="absolute inset-0 bg-white/20" />

            <button
              onClick={toggleMusic}
              className="fixed right-3 top-3 z-50 flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#7f98b6] shadow-md backdrop-blur-sm transition hover:bg-white sm:right-4 sm:top-4 sm:px-4 sm:text-[11px]"
            >
              {musicPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {/* HERO */}
            <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden sm:h-[56vh] md:h-[68vh]">
              <Image
                src="/images/hero.png"
                alt="Candela y Tomás"
                fill
                priority
                className="object-cover object-center"
              />

<div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="max-w-4xl"
                >
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/85 sm:text-[11px] md:text-xs md:tracking-[0.55em]">
                    Nuestra boda
                  </p>

                  <h1 className="mt-4 text-3xl font-light uppercase tracking-[0.1em] text-white sm:text-5xl md:text-7xl md:tracking-[0.12em]">
                    Candela &amp; Tomás
                  </h1>

                  <p className="mt-4 text-sm uppercase tracking-[0.34em] text-white/85 sm:text-[18px] md:tracking-[0.55em]">
                    24.07.2026
                  </p>
                </motion.div>
              </div>
            </section>

            {/* COUNTDOWN */}
            <section className="relative z-10 mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 md:py-24">
              <div className="mx-auto mt-2 flex w-full max-w-5xl items-center justify-between gap-2 sm:gap-4 md:gap-8">
                {countdownItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:gap-4 md:gap-8"
                  >
                    <CountdownItem value={item.value} label={item.label} />
                    {index < countdownItems.length - 1 ? <Separator /> : null}
                  </div>
                ))}
              </div>
            </section>

            {/* CUÁNDO Y DÓNDE */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-[url('/images/fondo-boda-hd.png')] bg-cover bg-center py-14 md:py-16"
            >
              <div className="absolute inset-0 bg-white/70" />

              <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center">
                  <SectionTitle
                    icon={<MapPin size={22} className="text-[#7f98b6]" />}
                  >
                    Cuándo y dónde
                  </SectionTitle>
                </div>

                <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
                  <InfoCard
                    icon={<Church size={20} className="text-[#7f98b6]" />}
                    title="Ceremonia"
                  >
                    <p className="text-base md:text-xl">
                      24 de julio de 2026 · 18:00 hs
                    </p>
                    <p className="mt-2 text-sm md:text-base">
                      Primera Iglesia 
                    </p>
                    <p className="text-sm md:text-base">Rosario</p>

                    <a
                      href="https://maps.google.com/?q=San+Martín+1558"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block border border-[#7f98b6] px-5 py-2 text-[11px] uppercase tracking-[0.14em] text-[#7f98b6] transition hover:bg-[#7f98b6] hover:text-white md:text-xs md:tracking-[0.16em]"
                    >
                      Ver ubicación
                    </a>
                  </InfoCard>

                  <InfoCard
                    icon={<PartyPopper size={20} className="text-[#7f98b6]" />}
                    title="Fiesta"
                  >
                    <p className="text-base md:text-xl">
                      24 de julio de 2026 · 21:00 hs
                    </p>
                    <p className="mt-2 text-sm md:text-base">Salón Los Sueños</p>
                    <p className="text-sm md:text-base">Rosario</p>

                    <a
                      href="https://maps.google.com/?q=Mendoza+5130"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block border border-[#7f98b6] px-5 py-2 text-[11px] uppercase tracking-[0.14em] text-[#7f98b6] transition hover:bg-[#7f98b6] hover:text-white md:text-xs md:tracking-[0.16em]"
                    >
                      Ver ubicación
                    </a>
                  </InfoCard>
                </div>
              </div>
            </motion.section>

            {/* ITINERARIO */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-white/58 py-16 md:py-20"
            >
              <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                <SectionTitle
                  icon={<Disc3 size={22} className="text-[#7f98b6]" />}
                >
                  Itinerario
                </SectionTitle>

                <div className="mx-auto mt-8 h-px w-32 bg-[#c7c1a8] md:w-44" />

                <div className="mt-12 md:mt-16">
                  {[
                    {
                      icon: (
                        <Church
                          size={38}
                          strokeWidth={1.2}
                          className="text-[#8ea1b9] md:h-11 md:w-11"
                        />
                      ),
                      title: "Ceremonia",
                      hour: "18:00 hs",
                    },
                    {
                      icon: (
                        <Wine
                          size={38}
                          strokeWidth={1.2}
                          className="text-[#8ea1b9] md:h-11 md:w-11"
                        />
                      ),
                      title: "Recepción",
                      hour: "20:30 hs",
                    },
                    {
                      icon: (
                        <Utensils
                          size={38}
                          strokeWidth={1.2}
                          className="text-[#8ea1b9] md:h-11 md:w-11"
                        />
                      ),
                      title: "Cena",
                      hour: "22:00 hs",
                    },
                    {
                      icon: (
                        <Disc3
                          size={38}
                          strokeWidth={1.2}
                          className="text-[#8ea1b9] md:h-11 md:w-11"
                        />
                      ),
                      title: "Fiesta",
                      hour: "00:00 hs",
                    },
                  ].map((item, index, arr) => (
                    <div key={item.title} className="flex flex-col items-center">
                      <div className="flex flex-col items-center py-10 md:py-14">
                        <div className="mb-5 md:mb-6">{item.icon}</div>

                        <h3 className="text-xl font-light uppercase tracking-[0.08em] text-[#7f98b6] md:text-3xl">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-lg font-light uppercase tracking-[0.04em] text-[#7f98b6] md:mt-5 md:text-2xl">
                          {item.hour}
                        </p>
                      </div>

                      {index < arr.length - 1 ? (
                        <div className="h-px w-32 bg-[#c7c1a8] md:w-44" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* RSVP */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-[url('/images/fondo-boda-hd.png')] bg-cover bg-center py-14 md:py-16"
            >
              <div className="absolute inset-0 bg-white/70" />

              <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
                <SectionTitle
                  icon={<HeartHandshake size={22} className="text-[#7f98b6]" />}
                >
                  Confirmar asistencia
                </SectionTitle>

                <SectionCard className="mx-auto mt-8 max-w-2xl md:mt-10">
                  <p className="mx-auto max-w-xl text-sm text-[#6b6b6b] md:text-base">
                    Por favor, confirmá tu asistencia antes del 10 de julio de
                    2026.
                  </p>

                  <button
                    onClick={() => setOpenModal(true)}
                    className="mt-8 inline-block bg-[#7f98b6] px-8 py-3 text-sm uppercase tracking-[0.16em] text-white transition hover:bg-[#6f89a6]"
                  >
                    Confirmar
                  </button>
                </SectionCard>
              </div>

              <ConfirmModal open={openModal} onClose={() => setOpenModal(false)} />
            </motion.section>

            {/* DRESS CODE */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-white/58 py-16 md:py-20"
            >
              <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
                <SectionTitle
                  icon={<Sparkles size={22} className="text-[#7f98b6]" />}
                >
                  Dress Code
                </SectionTitle>

                <SectionCard className="mt-8 md:mt-10">
                  <p className="text-base font-light uppercase tracking-[0.08em] text-[#7f98b6] md:text-3xl">
                    Elegante
                  </p>

                  <p className="mx-auto mt-5 max-w-3xl text-xs font-light uppercase tracking-[0.05em] text-[#5f6470] sm:text-sm md:mt-6 md:text-lg md:tracking-[0.06em]">
                    El blanco es un color hermoso, pero en nuestra boda es
                    exclusivo para la novia
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-3 md:mt-10 md:gap-6">
                    <span className="h-11 w-6 rounded-full bg-[#ddd2c2] md:h-14 md:w-8" />
                    <span className="h-11 w-6 rounded-full bg-[#d6c3a1] md:h-14 md:w-8" />
                    <span className="h-11 w-6 rounded-full bg-[#cfc4ad] md:h-14 md:w-8" />
                    <span className="h-11 w-6 rounded-full bg-[#c7af86] md:h-14 md:w-8" />
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#8ea1b9] md:mt-8 md:text-base md:tracking-[0.22em]">
                    Paleta sugerida
                  </p>
                </SectionCard>
              </div>
            </motion.section>

            {/* GALERÍA */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-[url('/images/fondo-boda-hd.png')] bg-cover bg-center py-14 md:py-16"
            >
              <div className="absolute inset-0 bg-white/70" />

              <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center">
                  <SectionTitle
                    icon={<Camera size={22} className="text-[#7f98b6]" />}
                  >
                    Nuestros momentos
                  </SectionTitle>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
                  {[
                    "/images/nosotros-1.jpg",
                    "/images/nosotros-2.jpg",
                    "/images/nosotros-3.jpg",
                    "/images/nosotros-4.jpg",
                    "/images/nosotros-5.jpg",
                    "/images/nosotros-6.jpg",
                  ].map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={src}
                        alt={`Foto ${index + 1}`}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* REGALO */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-white/58 py-14 md:py-16"
            >
              <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                <SectionTitle
                  icon={<Gift size={22} className="text-[#7f98b6]" />}
                >
                  Regalo
                </SectionTitle>

                <SectionCard className="mt-8 md:mt-10">
                  <p className="mx-auto max-w-2xl text-sm text-[#6b6b6b] md:text-base">
                    Lo más importante para nosotros es contar con tu presencia.
                    Pero si querés hacernos un regalo, podés colaborar con nuestra
                    nueva etapa.
                  </p>

                  <button
                    onClick={() => setOpenGiftModal(true)}
                    className="mt-8 inline-block border border-[#7f98b6] px-6 py-3 text-sm uppercase tracking-[0.16em] text-[#7f98b6] transition hover:bg-[#7f98b6] hover:text-white"
                  >
                    Regalar
                  </button>
                </SectionCard>
              </div>

              <GiftModal
                open={openGiftModal}
                onClose={() => setOpenGiftModal(false)}
              />
            </motion.section>

            {/* TRIVIA */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <TriviaSection />
            </motion.section>

            {/* MÚSICA */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full bg-white/58 py-14 md:py-16"
            >
              <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                <SectionTitle
                  icon={<Music4 size={22} className="text-[#7f98b6]" />}
                >
                  Música
                </SectionTitle>

                <SectionCard className="mt-8 md:mt-10">
                  <p className="mx-auto max-w-2xl text-sm text-[#6b6b6b] md:text-base">
                    Queremos bailar, cantar y disfrutar con ustedes. Contanos qué
                    canciones no pueden faltar en nuestra noche.
                  </p>

                  <a
                    href="https://forms.gle/tu-link"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block border border-[#7f98b6] px-6 py-3 text-sm uppercase tracking-[0.16em] text-[#7f98b6] transition hover:bg-[#7f98b6] hover:text-white"
                  >
                    Sugerir canción
                  </a>
                </SectionCard>
              </div>
            </motion.section>

            {/* FOOTER */}
            <section className="relative z-10 bg-white px-6 pb-12 pt-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#9aa9bd] sm:text-xs md:tracking-[0.28em]">
                Candela &amp; Tomás · 24.07.2026
              </p>
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}