"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import Brands from "@/assets/images/Home/Brands/Brands.png";
import Lyratech from "@/assets/images/Home/Brands/Lyratech.png";
import Coorider from "@/assets/images/Home/Brands/Coorider.png";
import PulsoVital from "@/assets/images/Home/Brands/PulsoVital.png";
import ByggirSolutions from "@/assets/images/Home/Brands/ByggirSolutions.png";
import DerivadosDeAlambron from "@/assets/images/Home/Brands/DerivadosDeAlambron.png";

type Testimonial = {
    text: string;
    name: string;
    company: string;
    logo: StaticImageData;
};

function BrandsHome() {
    // --- data ---
    const testimonials: Testimonial[] = [
        {
            text:
                "Trabajar con Indeleble ha sido una experiencia increíble. Desde el primer contacto se nota su profesionalismo, creatividad y compromiso con cada detalle. Su equipo entiende perfectamente las necesidades de la marca y ofrece estrategias innovadoras que realmente generan resultados.",
            name: "Galo",
            company: "Lyra Tech",
            logo: Lyratech,
        },
        {
            text:
                "La atención de Adriana ha sido siempre cercana y personalizada. Escucha con atención nuestras necesidades y responde con soluciones claras y rápidas, lo que genera mucha confianza. Su trato cálido y profesional transmite seguridad y facilita la comunicación. Se siente más como una aliada.",
            name: "Roberto",
            company: "Coorider",
            logo: Coorider,
        },
        {
            text:
                "Con Indeleble llevamos 2 años y siempre cumplen. Nos ayudaron a dar orden y frescura a la marca, y eso se nota en cómo nos perciben los clientes.",
            name: "Laura",
            company: "Pulso Vital",
            logo: PulsoVital,
        },
        {
            text:
                "Lo que más valoramos es que hacen simple lo complejo. Desde que trabajamos con ellos, nuestra comunicación con clientes es mucho más clara.",
            name: "",
            company: "Byggir Solutions",
            logo: ByggirSolutions,
        },
        {
            text:
                "En solo un año mejoraron la forma en la que mostramos nuestros productos. Se metieron a entender nuestro giro y eso marcó la diferencia.",
            name: "Felipe",
            company: "Derivados de Alambrón",
            logo: DerivadosDeAlambron,
        },
    ];

    const LEN = testimonials.length;

    // --- responsive: 1/2/3 visibles ---
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

    // --- clones para loop infinito ---
    const extended = useMemo(
        () => [
            ...testimonials.slice(-visible),
            ...testimonials,
            ...testimonials.slice(0, visible),
        ],
        [testimonials, visible]
    );

    // índice dentro de `extended` (empezamos en el primer real)
    const [index, setIndex] = useState(visible);
    useEffect(() => setIndex(visible), [visible]);

    // refs y estados para animación
    const viewportRef = useRef<HTMLDivElement>(null);
    const [transitionMs, setTransitionMs] = useState(400);
    const dragStartX = useRef<number | null>(null);
    const dragDeltaPx = useRef(0);

    // tamaño de slide en px (en tiempo real)
    const getSlideWidth = () => {
        const vp = viewportRef.current;
        if (!vp) return 1;
        return vp.clientWidth / Math.max(visible, 1);
    };

    // translateX en px = -index*slideWidth + dragDelta
    const translatePx = -(index * getSlideWidth()) + dragDeltaPx.current;

    // autoplay (4s, 1 en 1)
    const intervalRef = useRef<number | null>(null);
    const clearAuto = () => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    const startAuto = () => {
        clearAuto();
        intervalRef.current = window.setInterval(() => {
            setTransitionMs(400);
            setIndex((i) => i + 1);
        }, 4000);
    };
    useEffect(() => {
        startAuto();
        return clearAuto;
    }, [visible]);

    // snap cuando termina transición (si caemos en clones)
    useEffect(() => {
        const onEnd = () => {
            // si nos pasamos al final (clones al final)
            if (index >= visible + LEN) {
                setTransitionMs(0);
                setIndex(visible); // saltamos al primer real
            }
            // si nos pasamos al inicio (clones al inicio)
            if (index < visible) {
                setTransitionMs(0);
                setIndex(visible + LEN - 1); // saltamos al último real
            }
        };

        const t = setTimeout(onEnd, transitionMs + 10);
        return () => clearTimeout(t);
    }, [index, visible, LEN, transitionMs]);

    // drag / swipe
    const pointerDown = (clientX: number) => {
        clearAuto();
        dragStartX.current = clientX;
        dragDeltaPx.current = 0;
        setTransitionMs(0);
    };
    const pointerMove = (clientX: number) => {
        if (dragStartX.current === null) return;
        dragDeltaPx.current = clientX - dragStartX.current;
        // fuerza re-render: cambiar un estado barato
        setTransitionMs((ms) => ms); // NOOP para trigger sin romper ESLint
    };
    const pointerUp = () => {
        if (dragStartX.current === null) return;
        const threshold = getSlideWidth() * 0.25; // 25% del slide
        setTransitionMs(300);
        if (dragDeltaPx.current <= -threshold) {
            setIndex((i) => i + 1);
        } else if (dragDeltaPx.current >= threshold) {
            setIndex((i) => i - 1);
        } // else: vuelve al lugar

        dragStartX.current = null;
        dragDeltaPx.current = 0;
        startAuto();
    };

    // util UI
    const onPrev = () => {
        clearAuto();
        setTransitionMs(300);
        setIndex((i) => i - 1);
        startAuto();
    };
    const onNext = () => {
        clearAuto();
        setTransitionMs(300);
        setIndex((i) => i + 1);
        startAuto();
    };

    return (
        <div className="bg-black text-white font-dm-regular py-16 md:py-20 lg:py-32 px-10 md:px-16 lg:px-20 xl:px-32">
            <h1 className="text-center text-4xl pb-6 md:pb-12 lg:pb-20 md:text-6xl lg:text-7xl xl:text-8xl">
                Marcas con huella INDELEBLE
            </h1>

            {/* logos */}
            <div className="mx-auto max-w-6xl">
                <Image src={Brands} alt="Brands" className="w-full h-auto" />
            </div>

            {/* slider */}
            <div className="relative mx-auto mt-10 md:mt-14 lg:mt-16 max-w-6xl">
                {/* flechas */}
                <button
                    aria-label="Anterior"
                    onClick={onPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 p-2 hover:bg-white/10 transition"
                >
                    <IoIosArrowBack size={20} />
                </button>

                {/* viewport */}
                <div
                    ref={viewportRef}
                    className="mx-8 md:mx-12 lg:mx-16 overflow-hidden select-none"
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
                    {/* track */}
                    <div
                        className="flex items-stretch"
                        style={{
                            transform: `translateX(${translatePx}px)`,
                            transition: `transform ${transitionMs}ms ease`,
                            cursor: dragStartX.current !== null ? "grabbing" : "grab",
                        }}
                    >
                        {extended.map((t, i) => (
                            <div
                                key={`${i}-${t.company}`}
                                // cada slide ocupa exactamente 1/visible del viewport
                                style={{ flex: `0 0 ${100 / Math.max(visible, 1)}%` }}
                                className="px-3 md:px-4"
                            >
                                <div className="h-full rounded-2xl bg-white text-black p-6 md:p-7 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                                    <p className="text-[8px] md:text-xs leading-relaxed">{t.text}</p>
                                    <div className="mt-5 flex items-center gap-3">
                                        <div className="h-8 w-8 md:h-9 md:w-9 rounded-full overflow-hidden bg-black/5 flex items-center justify-center">
                                            <Image src={t.logo} alt={t.company} className="object-contain w-full h-full" />
                                        </div>
                                        <div className="text-xs md:text-sm">
                                            <p className="font-semibold text-gray-900">{t.name}</p>
                                            <p className="text-gray-600">{t.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* flecha der */}
                <button
                    aria-label="Siguiente"
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 p-2 hover:bg-white/10 transition"
                >
                    <IoIosArrowForward size={20} />
                </button>
            </div>
        </div>
    );
}

export default BrandsHome;
