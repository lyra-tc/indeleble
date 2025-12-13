import React from "react";
import Navbar from "@/components/NavbarPages";
import Hero from "@/components/PortFolioPage/HeroPortfolio";
import PortFolioComponent from "@/components/PortFolioPage/PortfolioComponent";
import Footer from "@/components/Footer";

export default function PortFolioPage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <PortFolioComponent />
            <Footer />
        </div>
    );
}
