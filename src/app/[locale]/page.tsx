import React from "react";
import Navbar from "@/components/Navbar";
import WhatsappButton from "@/components/Home/WhatsappButton";
import Hero from "@/components/Home/HeroHome";
//import AboutUs from "@/components/Home/AboutUsHome";


export default function Home() {
    return (
        <div className="">
            <WhatsappButton />
            <Hero />
            <Navbar />
        </div>
    );
}


