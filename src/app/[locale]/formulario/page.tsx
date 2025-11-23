import React from "react";
import Navbar from "@/components/NavbarPages";
import Hero from "@/components/Forms/HeroForms";
import FormsComponent from "@/components/Forms/FormsComponent";
import Footer from "@/components/Footer";

export default function ComingSoonPage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <FormsComponent />
            <Footer />
        </div>
    );
}
