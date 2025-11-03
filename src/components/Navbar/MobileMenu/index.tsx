"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

interface MobileMenuProps {
    onClose: () => void;
    links: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, links }) => {
    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/90"
                onClick={onClose}
                aria-hidden
            />

            <div className="relative h-full w-full flex flex-col items-center justify-center text-white font-montserrat">
                <button
                    className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] text-3xl"
                    onClick={onClose}
                    aria-label="Cerrar menú"
                >
                    <IoClose />
                </button>

                <nav className="flex w-4/5 max-w-xs flex-col gap-6 text-center text-xl font-semibold">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={onClose}
                            className="border-b border-white/25 pb-2 hover:opacity-90 font-dm-regular"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>

        </div>
    );
};

export default MobileMenu;
