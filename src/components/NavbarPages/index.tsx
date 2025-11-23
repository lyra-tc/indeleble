"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/Logo/logo-light.png";
import MobileMenu from "../Navbar/MobileMenu";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const onChange = () => setIsMobile(mq.matches);
        onChange();
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);
    return isMobile;
}

const LINKS = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#contacto", label: "Contacto" },
];

function Navbar() {
    const isMobile = useIsMobile();

    const [openDesktop, setOpenDesktop] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);
    const [spinning, setSpinning] = useState(false);

    // resetea el spin después de la anim (0.10s * 3 ≈ 300ms)
    useEffect(() => {
        if (!spinning) return;
        const id = setTimeout(() => setSpinning(false), 400);
        return () => clearTimeout(id);
    }, [spinning]);

    // lock scroll cuando el menú móvil esté abierto
    useEffect(() => {
        if (openMobile) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [openMobile]);

    const handleLogoClick = () => {
        setSpinning(true);
        if (isMobile) {
            setOpenMobile(true);
        } else {
            setOpenDesktop((v) => !v);
        }
    };

    return (
        <div>
            {/* Logo fijo */}
            <nav aria-label="Logo" className="fixed z-50 top-[max(0px,env(safe-area-inset-top))] left-[max(0px,env(safe-area-inset-left))] p-4 md:p-8">
                <button onClick={handleLogoClick} aria-label="Abrir menú principal" className="block focus:outline-none">
                    <Image
                        src={Logo}
                        alt="Logo"
                        priority
                        className="w-12 md:w-16 h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                    />
                </button>
            </nav>

            {/* Botón de Inicio */}
            <div className="fixed z-50 top-5 right-3 md:top-10 md:right-10">
                <Link href="/">
                    <button className="bg-black border border-black text-white px-6 py-2 md:px-10 md:py-3 md:text-xl font-dm-regular rounded-xl transition-all duration-200 hover:bg-white hover:text-black hover:border-black hover:scale-95">
                        Regresar a inicio
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default Navbar;
