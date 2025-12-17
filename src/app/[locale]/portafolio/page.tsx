import React from "react";
import Navbar from "@/components/NavbarPages";
import Hero from "@/components/PortfolioPage/HeroPortfolio";
import PortFolioComponent from "@/components/PortfolioPage/PortfolioComponent";
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
