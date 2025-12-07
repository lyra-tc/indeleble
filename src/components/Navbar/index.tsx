"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/Logo/logo-dark.png";
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
                        className={`w-12 md:w-16 h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:animate-[spin-once_0.10s_linear_3]
                        ${spinning ? "animate-[spin-once_0.10s_linear_3]" : ""}`}
                    />
                </button>
            </nav>

            {/* Menú centrado */}
            <nav aria-label="Primary"
                className={`
                  hidden md:flex fixed z-40
                  top-6 md:top-10 left-1/2 -translate-x-1/2
                  w-[94vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw]
                  items-center justify-center gap-8 md:gap-10 lg:gap-12
                  text-white
                  ${openDesktop  ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                  transition-all duration-200`}>
                {LINKS.map((l, i) => (
                    <Link key={l.href} href={l.href} className="relative py-1 text-sm md:text-lg lg:text-xl xl:text-2xl group font-dm-regular">
                        <span
                            className={`
                            ${openDesktop ? "animate-menu-in" : ""}
                          `}
                            style={{ animationDelay: `${i * 70}ms` }}
                        >
                          {l.label}
                        </span>

                        {/* underline de botones */}
                        <span className=" pointer-events-none absolute left-0 -bottom-0 h-[2px] md:h-[2px] w-0 bg-white transition-[width] duration-300 ease-out group-hover:w-full"/>
                    </Link>
                ))}
            </nav>

            {/* Menú móvil (solo cuando openMobile === true) */}
            <div className="md:hidden">
                {openMobile && (
                    <MobileMenu onClose={() => setOpenMobile(false)} links={LINKS} />
                )}
            </div>

        </div>
    );
}

export default Navbar;
