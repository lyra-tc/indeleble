"use client";

import React from "react";
import { FiArrowDownRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
//import Portafolio from "@/assets/images/Home/Portafolio/PortafolioImage.png";
import Portafolio from "@/assets/images/Home/Portafolio/Portafolio.jpg";
import TopLeft from "@/assets/images/Home/Portafolio/TopLeft.png";
import BottomRight from "@/assets/images/Home/Portafolio/BottomRight.png";

function PortafolioHome() {
    return (
        <section id="portafolio" className="relative overflow-hidden bg-black font-dm-regular">
            {/* decoraciones */}
            <Image
                src={TopLeft}
                alt="Decoración superior"
                className="pointer-events-none select-none absolute -top-10 -left-10 w-64 md:w-96 opacity-70"
                priority
            />
            <Image
                src={BottomRight}
                alt="Decoración inferior"
                className="pointer-events-none select-none absolute -bottom-14 -right-14 w-64 md:w-96 opacity-70"
                priority
            />

            {/* contenedor */}
            <div className="relative mx-auto max-w-6xl px-6 py-12 md:px-20 md:py-16 lg:py-20">
                <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-2 md:items-center">
                    {/* copy */}
                    <div className="order-2 md:order-1">
                        <div className="mb-5 flex items-center justify-center gap-2 text-xs md:text-sm tracking-[0.18em] text-white/90">
                            <FiArrowDownRight className="text-white" />
                            <span className="uppercase md:text-sm lg:text-lg">Enfocado en resultados</span>
                        </div>

                        <h2 className="text-white text-center font-medium leading-tight text-3xl md:text-2xl lg:text-[42px] lg:leading-snug">
                            Estrategia, diseño y resultados. Conoce nuestro trabajo.
                        </h2>

                        <div className="mt-8 flex items-center justify-center">
                            <Link href="/coming-soon" target="_blank" rel="noopener noreferrer"
                                  className="inline-block">
                                <button
                                    className="uppercase inline-flex items-center justify-center
                                          rounded-full border border-white bg-white text-black
                                          tracking-[0.18em] transition-all duration-200
                                          hover:bg-black hover:text-white hover:scale-95
                                          h-10 md:h-9 lg:h-12 px-10 md:px-14
                                          min-w-[260px] sm:min-w-[300px] md:min-w-[240px] lg:min-w-[380px]
                                          w-full max-w-[420px] text-lg md:text-base lg:text-xl">
                                    Portafolio
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* imagen */}
                    <div className="order-1 md:order-2 flex w-full justify-center">
                        <div className="w-full max-w-[540px]">
                            <Image
                                src={Portafolio}
                                alt="Equipo trabajando"
                                className="w-full h-auto rounded-2xl md:rounded-3xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* línea separadora opcional como en el mock */}
            <div className="h-px w-full bg-white/20" />
        </section>
    );
}

export default PortafolioHome;
