"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackgroundImage1 from "../../../assets/images/Home/Hero/Background2.png";
import BackgroundImage2 from "../../../assets/images/Home/Hero/Background1.png";
import BackgroundImage3 from "../../../assets/images/Home/Hero/Background2.png";
import BackgroundImage4 from "../../../assets/images/Home/Hero/Background3.jpeg";
import Titulo from "../../../assets/images/Home/Hero/Titulo.png";

const BG_IMAGES = [BackgroundImage1, BackgroundImage2, BackgroundImage3, BackgroundImage4];

function HeroHome() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % BG_IMAGES.length);
        }, 2000);
        return () => clearInterval(id);
    }, []);

    return (
        <div aria-label="Hero Home" className="relative inset-0 overflow-hidden min-h-[90vh] lg:min-h-screen" id="inicio">

            {/* Slider Background */}
            <div className="absolute inset-0">
                {BG_IMAGES.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        alt={`Fondo ${i + 1}`}
                        fill
                        priority={i === 0}
                        className={`select-none pointer-events-none transition-opacity duration-700 ease-out ${
                            i === index ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ objectFit: "fill" }}
                        sizes="100vw"
                    />
                ))}
            </div>

            {/* Contenido centrado */}
            <div className="absolute inset-0 grid place-items-center px-4">
                <div className="flex flex-col items-center text-center">
                    <Image
                        src={Titulo}
                        alt="Título"
                        priority
                        className="
                            h-auto
                            w-[90vw] md:w-[90vw] xl:w-[1000px]   /* el ancho que quieras en XL */
                            max-w-none xl:max-w-none            /* quita el límite que te bloqueaba */
                            drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]
                          "
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 90vw, 1000px"
                    />
                    <p className="mt-1 uppercase tracking-[1px] md:tracking-[2px] lg:tracking-[3px] text-white text-[12px] md:text-2xl lg:text-3xl xl:text-4xl">
                        La Inteligencia detrás de las ventas
                    </p>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute inset-x-0 bottom-16 flex items-center justify-center gap-2">
                {BG_IMAGES.map((_, i) => {
                    const active = i === index;
                    return (
                        <button
                            key={i}
                            aria-label={`Ir al slide ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className={`h-2.5 w-2.5 rounded-full transition-all
                ${active ? "w-6 bg-white" : "bg-white/50 hover:bg-white/70"}`}
                        />
                    );
                })}
            </div>

        </div>
    );
}

export default HeroHome;
