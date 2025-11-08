import React from "react";
import Navbar from "@/components/Navbar";
import WhatsappButton from "@/components/Home/WhatsappButton";
import Hero from "@/components/Home/HeroHome";
import AboutUs from "@/components/Home/AboutUsHome";
import Team from "../../components/Home/TeamHome";
import PortafolioHome from "../../components/Home/PortafolioHome";
import FormsHome from "../../components/Home/FormsHome";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="">
            <WhatsappButton/>
            <Navbar/>
            <Hero/>
            <AboutUs/>
            <Team/>
            <PortafolioHome/>
            <FormsHome/>
            <Footer />
        </div>
    );
}


