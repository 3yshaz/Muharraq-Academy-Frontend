import React from "react"
import Footer from "../components/Footer"
import Logo from '/images/Logo.jpg'
import '../css/about.css'

const About = () => {
    return (
        <div className="about-page">
            <div>
            <div>
                <img 
                src={Logo}
                alt='Academy logo'
                />
            </div>
            <div>
                <h1>About Muharraq Equestrian Academy</h1>
                <p>
                heeeeeellllllloooooo test test check 1 2 3 <br/>
                jklk  <br/>
                mlk <br/>
                sfgdbf  <br/>
                dfrv  <br/>
                dfgsdsb <br/>

                </p>
            </div>
            <Footer/>
        </div>
            
        </div>
    )
}

export default About