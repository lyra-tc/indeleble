"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Proyecto1 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_1.jpg";
import Proyecto2 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_2.jpg";
import Proyecto3 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_3.jpg";
import Proyecto4 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_4.jpeg";
import Proyecto5 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_5.jpg";
import Proyecto6 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_6.jpeg";
import Proyecto7 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_7.png";
import Proyecto8 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_8.png";
import Proyecto9 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_9.png";
import Proyecto10 from "@/assets/images/Portfolio/PortfolioComponent/Proyecto_10.jpg";
import type { CSSProperties } from "react";

const categories = {
    todos: "Todos",
    disenios: "Diseños",
    eventos: "Eventos",
    redes: "Redes",
} as const;

type CategoryKey = keyof typeof categories;

interface Project {
    id: number;
    title: string;
    category: CategoryKey;
    image: StaticImageData;
    link: string;
}

const projects: Project[] = [
    { id: 1, title: "Podcast 1", category: "redes", image: Proyecto1, link: "https://www.instagram.com/reel/DJ2RuNOpjlZ/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { id: 2, title: "Podcast 2", category: "redes", image: Proyecto2, link: "https://www.instagram.com/reel/DM0p7w8RHWj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 3, title: "Evento 1", category: "eventos", image: Proyecto3, link: "https://www.instagram.com/reel/DJSnXvqpkIw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 4, title: "Evento 2", category: "eventos", image: Proyecto4, link: "https://www.instagram.com/reel/DIPAaTNR_6M/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 5, title: "Video empresas 1", category: "redes", image: Proyecto5, link: "https://www.instagram.com/reel/DM2imRSO2dV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 6, title: "Video empresas 2", category: "redes", image: Proyecto6, link: "https://www.instagram.com/reel/DKZ7Pa6O9gc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 7, title: "Estrategias 1", category: "redes", image: Proyecto7, link: "https://www.instagram.com/reel/DHWwKr0JZM0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { id: 8, title: "Pagina web 1", category: "disenios", image: Proyecto8, link: "https://lyratech.com.mx/" },
    { id: 9, title: "Pagina web 2", category: "disenios", image: Proyecto9, link: "https://coorider.com/" },
    { id: 10, title: "Evento 3", category: "eventos", image: Proyecto10, link: "https://www.instagram.com/reel/DOy0lL7Ca4y/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
];

function PortfolioComponent() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

    // Nuevo estado para paginación
    const itemsPerPage = 8; // Mostrar 8 elementos por página (4 filas si hay 2 columnas)
    const [currentPage, setCurrentPage] = useState(0);

    // Filtrado por categoría (sin paginar)
    const filtered = activeCategory === "todos"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Calcular número de páginas
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // Ajustar currentPage si la categoría cambia o si el número de páginas cambia
    useEffect(() => {
        setCurrentPage(0);
    }, [activeCategory]);

    useEffect(() => {
        if (currentPage >= totalPages) {
            setCurrentPage(Math.max(0, totalPages - 1));
        }
    }, [totalPages, currentPage]);

    // AUTO-SLIDE cada 6s
    useEffect(() => {
        if (totalPages <= 1) return;

        const id = window.setInterval(() => {
        setCurrentPage(prev => (prev + 1) % totalPages);
        }, 6000);

        return () => window.clearInterval(id);
    }, [totalPages]);

    //Helper para que cuando el usuario haga click, no choque con el interval
    const goToPage = (i: number) => {
        setCurrentPage(i);
    };

    // Proyectos a mostrar en la página current
    const start = currentPage * itemsPerPage;
    const pagedProjects = filtered.slice(start, start + itemsPerPage);

    // Agrupar en filas de 2
    const rows: (Project | null)[][] = [];
    for (let i = 0; i < pagedProjects.length; i += 2) {
        const a = pagedProjects[i] ?? null;
        const b = pagedProjects[i + 1] ?? null;
        rows.push([a, b]);
    }

    const getRowRatios = (rowIndex: number) => {
        const cycle = rowIndex % 3;
        if (cycle === 0) return [1, 1]; // iguales
        if (cycle === 1) return [3, 1]; // izquierda más grande
        return [1, 3]; // derecha más grande
    };

    return (
        <div aria-label="Portafolio de proyectos Indeleble" className="relative font-dm-regular min-h-screen bg-black overflow-hidden">
            <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center px-4 py-12 md:py-16 lg:py-20">
                {/* Título descriptivo */}
                <div className="text-center mb-12 max-w-3xl">
                    <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
                        Trabajos de los que estamos orgullosos: proyectos de branding, campañas digitales y diseños de imagen corporativa que reflejan nuestro compromiso con la creatividad y la excelencia.
                    </p>
                </div>

                {/* Categorías - Switch */}
                <div className="w-full max-w-4xl mb-16">
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key as CategoryKey)}
                                className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300 border ${
                                    activeCategory === key
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-white border-white/30 hover:border-white"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de proyectos paginado */}
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
                    <div className="flex flex-col gap-6 md:gap-7 lg:gap-10">
                        {rows.map((row, rowIndex) => {
                            const [left, right] = row;
                            const [r1, r2] = getRowRatios(rowIndex);

                            return (
                                <div
                                    key={rowIndex}
                                    className="grid grid-cols-1 gap-4 sm:gap-6 md:[grid-template-columns:var(--cols)]"
                                    style={{ "--cols": `${r1}fr ${r2}fr` } as CSSProperties}
                                >
                                    {/* LEFT */}
                                    {left ? (
                                        <a
                                            href={left.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative overflow-hidden bg-white/10 block w-full
                         h-56 sm:h-64 md:h-72 lg:h-72"
                                        >
                                            <Image
                                                src={left.image}
                                                alt={left.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <p className="text-white font-semibold border-2 border-white py-2 px-4 rounded-full">
                                                    Ver más
                                                </p>
                                            </div>
                                        </a>
                                    ) : (
                                        // En mobile/md no mostramos el hueco; en lg sí para conservar la rejilla
                                        <div aria-hidden className="hidden md:block h-72"/>
                                    )}

                                    {/* RIGHT */}
                                    {right ? (
                                        <a
                                            href={right.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative overflow-hidden bg-white/10 block w-full
                         h-56 sm:h-64 md:h-72 lg:h-72"
                                        >
                                            <Image
                                                src={right.image}
                                                alt={right.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <p className="text-white font-semibold border-2 border-white py-2 px-4 rounded-full">
                                                    Ver más
                                                </p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div aria-hidden className="hidden lg:block h-72"/>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Indicadores de paginación dinámicos */}
                {totalPages > 1 && (
                    <div className="flex gap-2 justify-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Ir a la página ${i + 1}`}
                                onClick={() => goToPage(i)}
                                className={`transition-all duration-300 rounded-full ${
                                    i === currentPage ? "bg-white w-8 h-2 rounded-md" : "bg-white/40 w-2 h-2"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PortfolioComponent;

