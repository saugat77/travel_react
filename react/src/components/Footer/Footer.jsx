import React from 'react';
import './footer.css';
import video2 from '../../assets/video/video-2.mp4';
import { FiChevronRight, FiSend } from "react-icons/fi";
import { SiYourtraveldottv } from "react-icons/si";
import { FaCopyright, FaFacebook, FaInstagram, FaViber } from 'react-icons/fa6';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const Footer = () => {
  return (
    <section className='footer'>
      <div className="footerVideo">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>
      <div className='footerContent container'>
        <div className="footercontactDiv flex">
          <div className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>
          <div className="inputDiv flex">
            <input type="text" placeholder='Enter Email Address' />
            <button className='frontendbtn flex' type='submit'>SEND <FiSend className='icon' /></button>
          </div>
        </div>
        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className='logo flex'>
                <SiYourtraveldottv className='logo' /> Travel.
              </a>
            </div>
            <div className="footerParagraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure nam
              tenetur nostrum obcaecati! Eum minima minus
              reiciendis ex aliquam voluptatibus aspernatur rem earum sunt soluta
              distinctio, cumque consequatur error dolore.
            </div>
            <div className='footerSocials flex'>
              <FaFacebook className='icon' />
              <FaInstagram className='icon' />
              <AiOutlineWhatsApp className='icon' />
              <FaViber className='icon' />
            </div>

          </div>
          <div className="footerLinks grid">
            <div className="linkGroup">
              <span className="groupTitle">
                Our Agency
              </span>
              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Services
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Insurance
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Agency
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Tourism
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Payment
              </li>
            </div>
            <div className="linkGroup">
              <span className="groupTitle">
                World Heritage Sites
              </span>
              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Sagarmatha
              </li>
              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Chitwan National Park
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Lumbini
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Swayambhunath
              </li>
            </div>
            <div className="linkGroup">
              <span className="groupTitle">
                Travel Destinations
              </span>
              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Pokhara
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Kathmandu
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Bardiya
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Chitwan
              </li>

              <li className="footerList flex">
                <FiChevronRight className='icon' />
                Dhaulagiri
              </li>

            </div>
          </div>
          <div className="footerDiv flex">
            <small>Best Travel Website For Nepal</small>
            <small>COPYRIGHTS  RESERVED <FaCopyright /> - <a href="https://www.linkedin.com/in/saugatpandey/">Saugat Pandey (2024)</a></small>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Footer
