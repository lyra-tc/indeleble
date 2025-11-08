"use client";

import React from "react";
import { FiArrowDownRight } from "react-icons/fi"
import Link from "next/link";

function FormsHome() {
    return (
        <div id="contacto" className="flex flex-col justify-center items-center text-center px-6 py-20 bg-white font-dm-regular">
            <div className="flex items-center gap-2 mb-4 text-sm tracking-wide text-black">
                <FiArrowDownRight className="text-black" />
                <p className="uppercase font-medium text-lg lg:text-xl">Talento Indeleble</p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black max-w-3xl leading-snug mb-8">
                Diseñado para mentes que convierten ideas en creatividad, estrategia y resultados.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coming-soon" target="_blank" rel="noopener noreferrer">
                    <button className="md:text-lg uppercase bg-black text-white px-8 py-3 rounded-full text-sm tracking-widest transition-all duration-200 hover:bg-white hover:text-black hover:scale-95 border border-black">
                        Proveedores
                    </button>
                </Link>
                <Link href="/coming-soon" target="_blank" rel="noopener noreferrer">
                    <button className="md:text-lg uppercase bg-white text-black border border-black px-8 py-3 rounded-full text-sm tracking-widest transition-all duration-200 hover:bg-black hover:text-white hover:scale-95">
                        Freelancers
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default FormsHome;
