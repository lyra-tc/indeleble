"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowLongRight } from "react-icons/hi2";
import Facebook from "@/assets/images/Footer/Facebook.png";
import WhatsApp from "@/assets/images/Footer/WhatsApp.png";
import Instagram from "@/assets/images/Footer/Instagram.png";
//import { m } from "framer-motion";

const LINKS = [
    { href: "/", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#contacto", label: "Contacto" },
];

function Footer() {
    const phone = "5215555555555";
    const instagram = "https://www.instagram.com/indeleble.mk/";
    const facebook = "https://www.facebook.com/indeleble.886992";
    const mailFooter = "concierge@indeleble.com.mx"; 

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!ok) {
            setStatus("error");
            return;
        }
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000); // auto-hide
    };

    return (
        <footer className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="h-px w-full bg-white border-b-2 mb-10" />

                <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5">
                    {/* 1) Headline */}
                    <div className="font-dm-regular flex flex-col items-center md:items-start">
                        <p className="text-3xl leading-none md:text-3xl xl:text-[35px]">EMPECEMOS</p>
                        <p className="font-dm-italic text-3xl leading-tight md:text-3xl md:pl-4 xl:text-[35px]">
                            A TRABAJAR
                        </p>
                        <p className="text-3xl md:text-3xl xl:text-[35px]">JUNTOS</p>
                    </div>

                    {/* 2) Links */}
                    <nav className="flex flex-col gap-2 text-sm uppercase tracking-wide md:text-sm lg:pl-4 xl:pl-8">
                        {LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="self-start text-white/80 transition-colors hover:text-white">
                                <span
                                  className="
                                  relative inline-block
                                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                                  after:h-[1px] after:w-full after:bg-white
                                  after:origin-left after:scale-x-0 motion-safe:after:transition-transform after:duration-300
                                  hover:after:scale-x-100">
                                    {l.label}
                                </span>
                            </Link>
                        ))}
                    </nav>


                    {/* 3) Contacto + social */}
                    <div className="space-y-4 flex flex-col items-center text-center md:text-left md:items-start">
                        <div className="space-y-1">
                            <a
                                href={`mailto:${mailFooter}`} target="_blank"
                                className="block text-white/90 hover:text-white transition-colors break-all"
                            >
                                {mailFooter}
                            </a>
                            <a
                                href="tel:+525555555555" target="_blank"
                                className="block text-white/60 hover:text-white transition-colors"
                            >
                                +52 55 5555 5555
                            </a>
                        </div>

                        <div className="flex items-center gap-4">
                            <a href={facebook} target="_blank" aria-label="Facebook" className="opacity-90 hover:opacity-100 transition-opacity">
                                <Image src={Facebook} alt="Facebook" className="w-[30px]" />
                            </a>
                            <a href={instagram} target="_blank" aria-label="Instagram" className="opacity-90 hover:opacity-100 transition-opacity">
                                <Image src={Instagram} alt="Instagram" className="w-[40px]" />
                            </a>
                            <a href={`https://wa.me/${phone}`} target="_blank" aria-label="WhatsApp" className="opacity-90 hover:opacity-100 transition-opacity">
                                <Image src={WhatsApp} alt="WhatsApp" className="w-[40px]" />
                            </a>
                        </div>
                    </div>

                    {/* 4) Mapa */}
                    <div className="space-y-4">
                        <div className="w-full overflow-hidden rounded-xl">
                            <div className="aspect-[4/3]">
                                <iframe
                                    title="Ubicación"
                                    className="h-full w-full"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3732.4636421199352!2d-100.44693756103516!3d20.691389083862305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3573c9b7e46a5%3A0x8766a48f3d080c46!2sBL%20Comcenters%20Juriquilla%202!5e0!3m2!1ses!2sde!4v1768604314191!5m2!1ses!2sde"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5) Correo */}
                    <div className="flex flex-col justify-start">
                        <form onSubmit={onSubmit} className="mt-4 max-w-xs">
                            <div className="flex items-center gap-2 border-b border-white pb-2">
                                <label htmlFor="footer-email" className="sr-only">
                                    Tu correo
                                </label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    inputMode="email"
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-sm placeholder-white/40 outline-none"
                                    aria-invalid={status === "error"}
                                />
                                <button
                                    type="submit"
                                    aria-label="Enviar"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                                >
                                    <HiArrowLongRight className="text-base" />
                                </button>
                            </div>
                        </form>

                        {/* Mensaje de enviado */}
                        <div className="mt-2 min-h-[1.25rem]" aria-live="polite">
                            {status === "success" && (
                                <p className="text-xs text-white/70">Enviado, nos pondremos en contacto.</p>
                            )}
                            {status === "error" && (
                                <p className="text-xs text-white/60">Revisa tu correo, parece inválido.</p>
                            )}
                        </div>

                        <p className="mt-4 text-sm text-white/70 max-w-xs">
                            Ingresa tu correo y nos pondremos en contacto contigo
                        </p>
                    </div>


                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
                    © {new Date().getFullYear()} Indeleble. Todos los derechos reservados. <a href="http://lyratech.com.mx" className="relative inline-block
                                  after:content-[''] after:absolute after:left-0 after:-bottom-0
                                  after:h-[1px] after:w-full after:bg-white/40
                                  after:origin-left after:scale-x-0 motion-safe:after:transition-transform after:duration-300
                                  hover:after:scale-x-100">Desarrollado por Lyra Tech</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
