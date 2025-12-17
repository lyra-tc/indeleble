"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/Logo/logo-light.png";

function Navbar() {

    return (
        <div>
            {/* Logo fijo */}
            <nav aria-label="Logo" className="fixed z-50 top-[max(0px,env(safe-area-inset-top))] left-[max(0px,env(safe-area-inset-left))] p-4 md:p-8">
                <Link href="/">
                    <button className="block focus:outline-none">
                        <Image
                            src={Logo}
                            alt="Logo"
                            priority
                            className="w-12 md:w-16 h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                        />
                    </button>
                </Link>
            </nav>

            {/* Botón de Inicio */}
            <div className="fixed z-50 top-5 right-3 md:top-10 md:right-10">
                <Link href="/">
                    <button
                        className="bg-black border border-black text-white px-6 py-2 md:px-10 md:py-3 md:text-xl font-dm-regular rounded-xl transition-all duration-200 hover:bg-white hover:text-black hover:border-black hover:scale-95">
                        Regresar a inicio
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default Navbar;
