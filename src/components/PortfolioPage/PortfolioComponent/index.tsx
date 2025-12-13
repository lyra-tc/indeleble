"use client";

import React, { useState } from "react";
import Image from "next/image";

const categories = {
    todos: "Todos",
    diseños: "Diseños",
    eventos: "Eventos",
    redes: "Redes",
} as const;

type CategoryKey = keyof typeof categories;

interface Project {
    id: number;
    title: string;
    category: CategoryKey;
    image: string;
}

// Mock de proyectos - reemplazar con datos reales
const projects: Project[] = [
    { id: 1, title: "Diseño de marca", category: "diseños", image: "/images/project1.jpg" },
    { id: 2, title: "The First Collection", category: "diseños", image: "/images/project2.jpg" },
    { id: 3, title: "Pre-Black Friday Sale", category: "eventos", image: "/images/project3.jpg" },
    { id: 4, title: "Your Marketing is not working", category: "redes", image: "/images/project4.jpg" },
    { id: 5, title: "Art Collection", category: "diseños", image: "/images/project5.jpg" },
    { id: 6, title: "Workspace Setup", category: "diseños", image: "/images/project6.jpg" },
    { id: 7, title: "3 SIGNS Your Marketing", category: "redes", image: "/images/project7.jpg" },
    { id: 8, title: "Pre-Black Friday Sale", category: "eventos", image: "/images/project8.jpg" },
];

function PortfolioComponent() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");

    const filteredProjects = activeCategory === "todos" 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

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

                {/* Grid de proyectos */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-lg aspect-square md:aspect-video bg-white/10 cursor-pointer"
                        >
                            <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-white/60 text-sm">{project.title}</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white font-semibold">{project.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicadores de paginación (opcional) */}
                <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                        <button
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === 0 ? "bg-white w-8" : "bg-white/40"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PortfolioComponent;

