"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const waLink = (serviceName: string) => {
    const phone = "5214426767225";
    const text = encodeURIComponent(`Hola, me interesa el servicio de "${serviceName}". ¿Podemos agendar una llamada?`);
    return `https://wa.me/${phone}?text=${text}`;
};

type Service = { title: string; bullets: string[]; popular?: boolean };

const SERVICES: Service[] = [
    {
        title: "Videos Estratégicos de Alto Impacto",
        popular: true,
        bullets: [
            "Capturamos atención en segundos y permanecemos en la memoria.",
            "Cada toma y transición responde a una estrategia clara: qué decir, cómo y por qué.",
            "Guion, dirección, ritmo y narrativa para elevar percepción y convertir.",
            "No es contenido: es posicionamiento en movimiento.",
        ],
    },
    {
        title: "Contenido Vivo para Eventos y Activaciones",
        bullets: [
            "Tu evento se convierte en relato, presencia y marca.",
            "Capturamos esencia: energía, momentos clave, interacciones y propósito.",
            "Contenido que amplifica tu mensaje y extiende tu impacto.",
            "Eventos que no solo se recuerdan: se reviven.",
        ],
    },
    {
        title: "Posicionamiento y Dirección de Marca Personal (Speakers & Líderes)",
        bullets: [
            "Convertimos tu mensaje en influencia.",
            "Discurso visual y narrativo claro, poderoso y reconocible.",
            "Definimos identidad, tono, propuesta y diferencia.",
            "Tu nombre se vuelve marca; tu voz, referencia; tu presencia, autoridad.",
        ],
    },
    {
        title: "Podcast",
        bullets: [
            "Creación y producción completa del podcast.",
            "Desarrollo de concepto, guion y línea editorial.",
            "Grabación, edición y optimización de audio.",
	        "Estrategia de distribución para posicionar la voz de la marca.",
        ],
    },
    {
        title: "Estrategia para redes sociales",
        bullets: [
            "Diseño de estrategia digital alineada a objetivos.",
            "Creación de contenido de valor y storytelling.",
            "Optimización para crecimiento orgánico y engagement.",
            "Construcción y fortalecimiento de comunidad."
        ],
    },
    {
        title: "Diseño de página web",
        bullets: [
            "Desarrollo de sitios modernos y funcionales.",
            "Diseño alineado a la identidad visual de la marca.",
            "Arquitectura pensada para conversión y experiencia de usuario.",
            "Implementación de secciones claras y navegación intuitiva."
        ],
    },
    {
        title: "Organización y creación de eventos",
        bullets: [
            "Conceptualización creativa del evento.",
            "Planeación, logística y producción integral.",
            "Creación de experiencias memorables y alineadas a la marca.",
            "Fortalecimiento de relaciones y posicionamiento con la audiencia."
        ],
    },
];

function ServicesHome() {
    const [visible, setVisible] = useState(1);
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setVisible(3);
            else if (w >= 768) setVisible(2);
            else setVisible(1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const LEN = SERVICES.length;
    const extended = useMemo(
        () => [...SERVICES.slice(-visible), ...SERVICES, ...SERVICES.slice(0, visible)],
        [visible]
    );

    const [index, setIndex] = useState(visible);
    useEffect(() => setIndex(visible), [visible]);

    const intervalRef = useRef<number | null>(null);
    const clearAuto = () => { if (intervalRef.current !== null) { window.clearInterval(intervalRef.current); intervalRef.current = null; } };
    const startAuto = () => { clearAuto(); intervalRef.current = window.setInterval(() => { setTransitionMs(400); setIndex(i => i + 1); }, 3000); };
    useEffect(() => { startAuto(); return clearAuto; }, [visible]);

    const viewportRef = useRef<HTMLDivElement>(null);
    const [transitionMs, setTransitionMs] = useState(400);
    const dragStartX = useRef<number | null>(null);
    const dragDeltaPx = useRef(0);

    const getSlideWidth = () => (viewportRef.current ? viewportRef.current.clientWidth / Math.max(visible, 1) : 1);
    const translatePx = -(index * getSlideWidth()) + dragDeltaPx.current;

    useEffect(() => {
        const t = setTimeout(() => {
            if (index >= visible + LEN) { setTransitionMs(0); setIndex(visible); }
            if (index < visible) { setTransitionMs(0); setIndex(visible + LEN - 1); }
        }, transitionMs + 10);
        return () => clearTimeout(t);
    }, [index, visible, LEN, transitionMs]);

    const pointerDown = (x: number) => { clearAuto(); dragStartX.current = x; dragDeltaPx.current = 0; setTransitionMs(0); };
    const pointerMove = (x: number) => { if (dragStartX.current !== null) { dragDeltaPx.current = x - dragStartX.current; setTransitionMs(ms => ms); } };
    const pointerUp = () => {
        if (dragStartX.current === null) return;
        const threshold = getSlideWidth() * 0.25;
        setTransitionMs(300);
        if (dragDeltaPx.current <= -threshold) setIndex(i => i + 1);
        else if (dragDeltaPx.current >= threshold) setIndex(i => i - 1);
        dragStartX.current = 0; dragDeltaPx.current = 0; startAuto();
    };

    const onPrev = () => { clearAuto(); setTransitionMs(300); setIndex(i => i - 1); startAuto(); };
    const onNext = () => { clearAuto(); setTransitionMs(300); setIndex(i => i + 1); startAuto(); };
    const realIndex = ((index - visible) % LEN + LEN) % LEN;

    return (
        <div className="bg-black text-white font-dm-regular py-16 md:py-20 lg:py-16 px-10 md:px-16 lg:px-20 xl:px-32" id="servicios">
            {/* Título más ABAJO */}
            <h1 className="text-center text-7xl pt-8 -mb-7 lg:pt-0 lg:-mb-10 md:text-8xl lg:text-9xl xl:-mb-12 xl:text-[150px]">
                Servicios
            </h1>

            <div className="relative mx-auto max-w-6xl">
                {/* Flechas */}
                <button aria-label="Anterior" onClick={onPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 p-2 hover:bg-white/10 transition">
                    <IoIosArrowBack size={20} />
                </button>
                <button aria-label="Siguiente" onClick={onNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 p-2 hover:bg-white/10 transition">
                    <IoIosArrowForward size={20} />
                </button>

                {/* Viewport */}
                <div
                    ref={viewportRef}
                    className="mx-6 md:mx-10 lg:mx-12 overflow-hidden select-none"
                    onMouseDown={(e) => pointerDown(e.clientX)}
                    onMouseMove={(e) => pointerMove(e.clientX)}
                    onMouseUp={pointerUp}
                    onMouseLeave={() => { pointerUp(); startAuto(); }}
                    onTouchStart={(e) => pointerDown(e.touches[0].clientX)}
                    onTouchMove={(e) => pointerMove(e.touches[0].clientX)}
                    onTouchEnd={pointerUp}
                    onTouchCancel={pointerUp}
                    onMouseEnter={clearAuto}
                >
                    {/* Track */}
                    <div
                        className="flex items-stretch will-change-transform"
                        style={{
                            transform: `translateX(${translatePx}px)`,
                            transition: `transform ${transitionMs}ms ease`,
                            cursor: dragStartX.current ? "grabbing" : "grab",
                        }}
                    >
                        {extended.map((svc, i) => {
                            const isPopular = Boolean(svc.popular);
                            return (
                                <div key={`${i}-${svc.title}`} style={{ flex: `0 0 ${100 / Math.max(visible, 1)}%` }} className="px-3 md:px-4">
                                    {/* Card glassy */}
                                    <div className="relative h-full rounded-2xl overflow-hidden">
                                        {/* base glassy */}
                                        <div className="absolute inset-0 rounded-2xl opacity-95 bg-white/10 backdrop-blur-md border border-white/10" />
                                        {/* glow popular */}
                                        {isPopular && <div className="absolute inset-0 rounded-2xl ring-1 ring-[#2C6CEC]/30 pointer-events-none" />}
                                        {/* overlay azul 12% */}
                                        {isPopular && <div className="absolute inset-0 rounded-2xl bg-[#79AEEB1F] pointer-events-none" />}

                                        {/* contenido */}
                                        <div className="relative p-6 md:p-7 lg:p-8">
                                            {/* TAG popular dentro (no se corta) */}
                                            {isPopular && (
                                                <span className="absolute top-4 right-4 rounded-md bg-[#2C6CEC] text-white text-[10px] font-medium px-3 py-1 shadow">
                          MÁS POPULAR
                        </span>
                                            )}

                                            {/* título: font-medium */}
                                            <h3 className="text-2xl md:text-[26px] font-medium leading-snug mb-5">
                                                {svc.title}
                                            </h3>

                                            <ul className="space-y-3 list-disc pl-4 marker:text-white/70 text-sm md:text-[15px] leading-relaxed">
                                                {svc.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                                            </ul>

                                            {/* botón menos redondo + texto NEGRO siempre */}
                                            <div className="mt-7">
                                                <a
                                                    href={waLink(svc.title)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={[
                                                        "inline-flex items-center gap-2 rounded-[30px] px-6 py-3 text-xs md:text-sm tracking-[0.18em] uppercase transition-all duration-200",
                                                        isPopular
                                                            ? "bg-[#2C6CEC] text-black hover:brightness-110"
                                                            : "border border-white bg-white text-black hover:bg-black hover:text-white",
                                                    ].join(" ")}
                                                >
                                                    Contratar ahora <FaArrowRight />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {Array.from({ length: LEN }).map((_, i) => {
                        const active = i === realIndex;
                        return (
                            <button
                                key={i}
                                aria-label={`Ir a slide ${i + 1}`}
                                onClick={() => {
                                    clearAuto();
                                    setTransitionMs(300);
                                    setIndex(visible + i);
                                    startAuto();
                                }}
                                className={[
                                    "h-2.5 rounded-full transition-all",
                                    active ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                                ].join(" ")}
                            />
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default ServicesHome;
