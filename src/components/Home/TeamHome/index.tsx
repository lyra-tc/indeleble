"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import AdrianaRamirez from "@/assets/images/Home/Team/AdrianaRamirez.png";
import AnekenZaldivar from "@/assets/images/Home/Team/AnekenZaldivar.png";
import YankoAguilar from "@/assets/images/Home/Team/YankoAguilar.png";
import ButtonIcon from "@/assets/images/Home/Team/Button.png";
import XButton from "@/assets/images/Home/Team/XButton.png";

type Member = {
    src: StaticImageData;
    alt: string;
    name: string;
    desc: string;
};

const TEAM: Member[] = [
    {
        src: AdrianaRamirez,
        alt: "Adriana Ramírez",
        name: "Adriana Ramírez",
        desc:
            "Licenciada en Administración con especialización en Mercadotecnia, con 4 años de experiencia en la creación de contenido visual y audiovisual incluyendo experiencias en Asia que enriquecieron mi visión global en producción y comunicación.",
    },
    {
        src: AnekenZaldivar,
        alt: "Aneken Zaldívar",
        name: "Aneken Zaldívar",
        desc:
            "Apasionada de las ventas y la publicidad, con más de 20 años de experiencia en industrias como la automotriz, inmobiliaria, financiera y de comunicación. Su trayectoria le ha permitido desarrollar una visión integral del mercado, combinando estrategias de posicionamiento con un enfoque en resultados. Hoy, como líder de proyectos de comunicación y publicidad, aporta innovación y compromiso para ayudar a marcas a conectar y alcanzar sus objetivos comerciales.",
    },
    {
        src: YankoAguilar,
        alt: "Yanko Aguilar",
        name: "Yanko Aguilar",
        desc:
            "Empresario e inversionista con 20 años de experiencia en finanzas, marketing, emprendimiento y estructuración de negocios. Founder y Co-Founder de diversas empresas dentro del sector financiero, tecnologíco, de consultoría y de marketing. Miembro de múltiples consejos de administración y speaker de temas como Innovación, emprendimiento, finanzas, inversiones, tecnología y sostenibilidad.",
    },
];

// Card reutilizable con overlays
function TeamCard({ m }: { m: Member }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative overflow-hidden rounded-3xl">
            {/* Imagen base */}
            <Image
                src={m.src}
                alt={m.alt}
                className="w-full h-auto select-none"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
            />

            {/* Botón arriba derecha*/}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={`Abrir perfil de ${m.name}`}
                    className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full
                     bg-white/80 hover:bg-white transition-colors shadow-md"
                >
                    <Image src={ButtonIcon} alt="" className="h-9 w-9 md:h-10 md:w-10" aria-hidden />
                </button>
            )}

            {/* Nombre en pill glass*/}
            {!open && (
                <div
                    className="absolute left-4 bottom-4 rounded-full border border-white/20
                     bg-white/10 px-4 py-2 text-lg md:text-xs lg:text-lg xl:text-xl
                     text-white backdrop-blur-md shadow-sm font-dm-regular"
                >
                    {m.name}
                </div>
            )}

            {/* Overlay abierto */}
            {open && (
                <div
                    className="absolute inset-0 bg-black/55 backdrop-blur-[1px] text-white
                     flex flex-col"
                >
                    {/* XButton */}
                    <div className="p-3 self-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label={`Cerrar perfil de ${m.name}`}
                            className="inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
                        >
                            <Image src={XButton} alt="" className="h-9 w-9 md:h-10 md:w-10" aria-hidden />
                        </button>
                    </div>

                    {/* Texto centrado */}
                    <div className="px-6 md:px-8 lg:px-10 pb-6 w-full h-full -mt-8 flex items-center justify-center">
                        <p className="text-center leading-relaxed text-xs md:text-[8px] lg:text-xs xl:text-lg">
                            {m.desc}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function TeamHome() {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);

    // Auto slide cada 4s
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const stopAuto = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
    };
    const startAuto = () => {
        stopAuto();
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % TEAM.length);
        }, 4000);
    };
    useEffect(() => {
        const mq = typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)") : null;
        const handle = () => {
            stopAuto();
            if (mq && !mq.matches) startAuto();
        };
        handle();
        mq?.addEventListener("change", handle);
        return () => {
            stopAuto();
            mq?.removeEventListener("change", handle);
        };
    }, []);

    const goTo = (i: number) => setIndex(Math.max(0, Math.min(TEAM.length - 1, i)));
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        stopAuto();
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
        if (touchStartX.current == null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
        const threshold = 40;
        if (touchDeltaX.current <= -threshold) next();
        if (touchDeltaX.current >= threshold) prev();
        touchStartX.current = null;
        touchDeltaX.current = 0;
        startAuto();
    };

    return (
        <div className="bg-black text-white font-dm-regular pb-10" id="equipo">
            <h1 className="text-left text-4xl pt-16 pb-8 lg:pb-12 md:text-6xl lg:text-7xl xl:text-8xl xl:pb-16 px-10 md:px-16 lg:px-20 xl:px-32">
                Equipo
            </h1>

            {/* Móvil: slider */}
            <div className="px-10 md:px-16 lg:px-20 xl:px-32 md:hidden">
                <div
                    className="relative overflow-hidden rounded-lg"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {TEAM.map((m, i) => (
                            <div key={i} className="min-w-full">
                                <TeamCard m={m} />
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                        {TEAM.map((_, i) => {
                            const active = i === index;
                            return (
                                <button
                                    key={i}
                                    aria-label={`Ir al slide ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    className={`h-2.5 rounded-full transition-all ${
                                        active ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* md+: layout*/}
            <div className="px-10 md:px-16 lg:px-20 xl:px-32 hidden md:flex flex-col md:flex-row gap-12">
                {TEAM.map((m, i) => (
                    <div key={i} className="flex-1">
                        <TeamCard m={m} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamHome;
