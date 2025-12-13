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
}

// Mock de proyectos - reemplazar con datos reales
const projects: Project[] = [
    { id: 1, title: "Podcast 1", category: "redes", image: Proyecto1 },
    { id: 2, title: "Podcast 2", category: "redes", image: Proyecto2 },
    { id: 3, title: "Evento 1", category: "eventos", image: Proyecto3 },
    { id: 4, title: "Evento 2", category: "eventos", image: Proyecto4 },
    { id: 5, title: "Video empresas 1", category: "redes", image: Proyecto5 },
    { id: 6, title: "Video empresas 2", category: "redes", image: Proyecto6 },
    { id: 7, title: "Estrategias 1", category: "redes", image: Proyecto7 },
    { id: 8, title: "Pagina web 1", category: "disenios", image: Proyecto8 },
    { id: 9, title: "Pagina web 2", category: "disenios", image: Proyecto9 },
    { id: 10, title: "Evento 3", category: "eventos", image: Proyecto10 },
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

    // Proyectos a mostrar en la página current
    const start = currentPage * itemsPerPage;
    const pagedProjects = filtered.slice(start, start + itemsPerPage);

    return (
        <div aria-label="Portafolio de proyectos Indeleble" className="relative font-dm-regular min-h-screen bg-black overflow-hidden">
            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 py-12 md:py-16 lg:py-20">
                {/* Título descriptivo */}
                <div className="text-center mb-12 max-w-3xl">
                    <p className="text-white text-sm md:text-base leading-relaxed">
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
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-10 mb-12">
                    {pagedProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-none aspect-square md:aspect-video bg-white/10 cursor-pointer"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white font-semibold">Ver más</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicadores de paginación dinámicos */}
                {totalPages > 1 && (
                    <div className="flex gap-2 justify-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Ir a la página ${i + 1}`}
                                onClick={() => setCurrentPage(i)}
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

