"use client";

import React from "react";
import Phone1 from "@/assets/images/Home/AboutUs/Phone1.png";
import Phone2 from "@/assets/images/Home/AboutUs/Phone2.png";
import Image from "next/image";


function AboutUsHome() {

    return (
        <div className="bg-black text-white font-dm-regular pb-10" id="nosotros">
            <h1 className="text-center text-4xl pt-16 pb-16 md:text-6xl lg:text-7xl xl:text-8xl xl:pt-28 xl:pb-36">
                Nosotros
            </h1>

            <div className="flex flex-col gap-y-10 md:flex-row justify-between items-center md:px-16 lg:px-20 xl:px-32 lg:gap-10">
                <div className="md:w-1/2 md:order-1">
                    <div className="flex flex-col items-center justify-center px-10 gap-y-10">
                        <p className="text-lg lg:text-xl">
                            En INDELEBLE construimos marcas con identidad, intención y visión.
                            Sabemos que hoy no basta con estar presentes; una marca debe ser clara, estratégica y
                            memorable.
                            Trabajamos con empresas que piensan en grande y buscan elevar su valor, conectar con su
                            audiencia y consolidar una presencia auténtica y poderosa.
                        </p>
                        <div className="">
                            <Image src={Phone1} alt="Phone"/>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 md:order-0">
                    <div className="flex flex-col items-center justify-center px-10 gap-y-10">
                        <p className="text-lg lg:text-xl md:order-1">
                            Combinamos estrategia, creatividad y dirección de marca para convertir esencia en impacto
                            y posicionamiento en crecimiento real.
                            No hacemos marketing para todos.
                            Hacemos marcas que trascienden.
                        </p>
                        <div className="md:order-0">
                            <Image src={Phone2} alt="Phone"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUsHome;
