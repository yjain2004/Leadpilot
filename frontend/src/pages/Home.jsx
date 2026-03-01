import React from 'react'
import TrustSignals from '../components/TrustSignals';
import FeaturedSection from '../components/FeaturedSection';
import LeadForm from '../components/LeadForm';
import Hero from "../components/Hero"
import Footer from "../components/Footer"

function Home() {
    return (
        <div>
            <Hero></Hero>
            <TrustSignals />
            <FeaturedSection />
            <LeadForm />
            <Footer></Footer>
        </div>
    )
}

export default Home
