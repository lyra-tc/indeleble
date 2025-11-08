"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";

type Props = {
    title?: string;
    subtitle?: string;
    launchDate?: string; // ISO opcional, activa el countdown
};

const ComingSoon: React.FC<Props> = ({
                                         title = "PRÓXIMAMENTE",
                                         subtitle = "Algo elegante está por caer. Creatividad con estrategia y resultados.",
                                         launchDate,
                                     }) => {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>();
    const target = useMemo(() => (launchDate ? new Date(launchDate).getTime() : null), [launchDate]);

    useEffect(() => {
        if (!target) return;
        const t = setInterval(() => {
            const diff = Math.max(0, target - Date.now());
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);
            setTimeLeft({ d, h, m, s });
        }, 1000);
        return () => clearInterval(t);
    }, [target]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-black text-white">
            {/* fondo sutil premium */}
            <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(1200px_circle_at_50%_-10%,rgba(255,255,255,0.09),transparent_60%),radial-gradient(900px_circle_at_100%_120%,rgba(255,255,255,0.06),transparent_50%)]" />

            {/* contenedor centrado */}
            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
                <div className="w-full text-center">
                    {/* tag */}
                    <div className="mx-auto mb-6 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-gray-200">
                        <FiArrowDownRight className="shrink-0" />
                        <span className="uppercase">Talento Indeleble</span>
                    </div>

                    {/* título */}
                    <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {title}
                    </h1>

                    {/* subtítulo */}
                    <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-gray-300">
                        {subtitle}
                    </p>

                    {/* countdown */}
                    {timeLeft && (
                        <div className="mx-auto mt-10 flex items-center justify-center gap-4 text-center">
                            {(["d", "h", "m", "s"] as const).map((k) => (
                                <div key={k} className="min-w-[72px] rounded-2xl border border-white/20 px-4 py-3">
                                    <div className="text-2xl md:text-3xl font-semibold tabular-nums">{timeLeft[k]}</div>
                                    <div className="mt-1 text-[10px] md:text-xs uppercase tracking-widest text-gray-400">
                                        {k === "d" ? "DÍAS" : k === "h" ? "HRS" : k === "m" ? "MIN" : "SEG"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* nota inferior */}
                    <div className="mx-auto mt-10 max-w-xl border-t border-white/10 pt-6 text-[11px] tracking-wide text-gray-400">
                        © {new Date().getFullYear()} Indeleble. Todos los derechos reservados. <a href="http://lyratech.com.mx" target="_blank" className="relative inline-block
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[1px] after:w-full after:bg-white/40
                                  after:origin-left after:scale-x-0 motion-safe:after:transition-transform after:duration-300
                                  hover:after:scale-x-100">Desarrollado por Lyra Tech</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComingSoon;
