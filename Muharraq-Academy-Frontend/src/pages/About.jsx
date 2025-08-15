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
                Muharraq Equestrian Academy, established in 2003 in the Muharraq Governorate, is one<br/>
                of Bahrain’s leading centers for teaching and developing horseback riding skills. It is a<br/>
                private institution accredited by the Bahrain Royal Equestrian and Endurance Federation,<br/>
                offering a wide range of training programs including dressage, show jumping, endurance<br/>
                racing, as well as equine-assisted therapy and courses in stable management.<br/>
                </p>
            </div>
            <Footer/>
        </div>
            
        </div>
    )
}

export default About