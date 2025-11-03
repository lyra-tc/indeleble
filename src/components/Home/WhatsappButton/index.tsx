"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppFloating() {
    const phone = "5214426767225";
    return (
        <Link
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="fixed z-50 bottom-6 right-6 md:bottom-6 md:right-6"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center transition-transform hover:scale-105 hover:shadow-2xl">
            <FaWhatsapp className="h-12 w-auto text-white" />
          </span>
        </Link>
    );
}

export default WhatsAppFloating;