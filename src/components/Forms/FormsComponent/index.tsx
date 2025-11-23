"use client";

import React, { useState } from "react";
import Image from "next/image";
import TopLeft from "@/assets/images/Forms/FormsComponent/BottomLeft.png";

const tabs = {
    proveedores: "Proveedores",
    freelancers: "Freelancers",
} as const;

type TabKey = keyof typeof tabs;

function FormsComponent() {
    const [activeTab, setActiveTab] = useState<TabKey>("proveedores");

    // Solo para dejar preparado el cambio de endpoint
    const apiEndpoint =
        activeTab === "proveedores"
            ? "/api/providers" //
            : "/api/freelancers";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        console.log("Endpoint a usar:", apiEndpoint);
        console.log("Payload:", payload);
    };

    return (
        <div aria-label="Formulario Provedores y Freelancers Indeleble" className="relative font-dm-regular min-h-screen bg-white overflow-hidden">
            {/* Decoración bottom-left */}
            <div className="pointer-events-none absolute bottom-0 left-0">
                <Image
                    src={TopLeft}
                    alt="Decoración inferior izquierda"
                    className="w-72 md:w-[500px]"
                    priority
                />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 py-12 md:py-16 lg:py-20">
                {/* Switch Proveedores / Freelancers */}
                <div className="w-full max-w-xl">
                    <div className="relative mx-auto flex h-16 items-center rounded-full border border-black px-1">
                        {/* Slider negro */}
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-1/2 rounded-full bg-black transition-transform duration-300 ease-out ${
                                activeTab === "freelancers" ? "translate-x-full" : ""
                            }`}
                        />

                        <button
                            type="button"
                            onClick={() => setActiveTab("proveedores")}
                            className={`relative z-10 flex-1 text-center text-base md:text-2xl font-medium transition-colors duration-200 ${
                                activeTab === "proveedores"
                                    ? "text-white"
                                    : "text-black/70 hover:text-black"
                            }`}
                        >
                            {tabs.proveedores}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("freelancers")}
                            className={`relative z-10 flex-1 text-center text-base md:text-2xl font-medium transition-colors duration-200 ${
                                activeTab === "freelancers"
                                    ? "text-white"
                                    : "text-black/70 hover:text-black"
                            }`}
                        >
                            {tabs.freelancers}
                        </button>
                    </div>
                </div>

                {/* Formulario */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-12 w-full max-w-4xl space-y-10 py-10 md:py-20"
                >
                    {/* grid 1 columna en mobile, 2 columnas en tablet+ */}
                    <div className="grid gap-10 md:grid-cols-2">
                        {/* Nombre / Empresa */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Nombre o Empresa *
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Ej. John Doe"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        {/* Área o servicio */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Área o servicio *
                            </label>
                            <input
                                name="serviceArea"
                                type="text"
                                placeholder="Ej. diseño, video, marketing"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        {/* Correo */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Correo electrónico *
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Ej. johndoe@gmail.com"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        {/* Link / portafolio */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Link o portafolio
                            </label>
                            <input
                                name="portfolio"
                                type="url"
                                placeholder="Ej. link"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                            />
                        </div>

                        {/* Teléfono / WhatsApp */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Teléfono o WhatsApp *
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Ej. +52 442 636 12453"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        {/* Descripción del servicio */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-black">
                                Descripción del Servicio *
                            </label>
                            <input
                                name="serviceDescription"
                                type="text"
                                placeholder="Ej. Descripción del Servicio"
                                className="w-full border-0 border-b border-black/60 bg-transparent pb-1 text-black placeholder:text-black/40 focus:border-black focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Botón Enviar */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="rounded-xl bg-black border px-10 py-3 md:px-12 md:py-4 md:text-2xl text-lg font-semibold tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-black hover:border-black hover:scale-95"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormsComponent;

