"use client";

import React from "react";
import Image from "next/image";
import TopRight from "@/assets/images/Forms/HeroForms/TopRight.png";

function HeroForms() {
    return (
        <div aria-label="Hero Forms" className="relative inset-0 overflow-hidden min-h-[90vh] lg:min-h-screen bg-white">

            <Image
                src={TopRight}
                alt="Decoración superior"
                className="pointer-events-none select-none absolute top-0 right-0 w-72 md:w-[500px]"
                priority
            />

            {/* Contenido centrado */}
            <div className="absolute inset-0 grid place-items-center px-4">
                <div className="flex flex-col items-center text-center">
                    <h1 className="mt-1 font-dm-regular text-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                        Formularios
                    </h1>
                    <p className="mt-1 font-dm-regular text-black text-sm md:text-lg lg:text-xl xl:text-2xl">
                        Conecta con nosotros como proveedor o freelancer.
                    </p>
                </div>
            </div>


        </div>
    );
}

export default HeroForms;
