import React, { useEffect } from 'react';
import './home.css';
import video from '../../Assets/video/video (2160p).mp4';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { TbAppsFilled } from "react-icons/tb";

import Aos from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <section className='home'>
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type='video/mp4'></video>
      <div className="homeContent container">
        <div className='textDiv'>
          <span data-aos="fade-up" className='smallText'>
            Our Packages
          </span>
          <h1 data-aos="fade-up" className='homeTitle'>
            Search your Holiday
          </h1>
        </div>
        <div className="cardDiv grid">
          <div data-aos="fade-right" className="destinationInput">
            <label htmlFor="city">Search your Destination:</label>
            <div className="input flex">
              <input type="text" name="destination" placeholder='Enter Destination Name....' />
              <GrLocation className='icon' />
            </div>
          </div>
          <div className="destinationInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex">
              <input type="date" name="date" />
            </div>
          </div>
          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max Price: </label>
              <h3 className='total'>Rs. 10000</h3>
            </div>
            <div className="input flex">
              <input type="range" name='price' max="5000" min="1000" />
            </div>
          </div>
          <div className="searchOptions flex">
            <HiFilter className="icon" />
            <span>More Filters</span>
          </div>
        </div>
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="leftIcon">
            <FaFacebook className='icon' />
            <FaInstagram className='icon' />
            <AiOutlineWhatsApp className='icon' />
          </div>
          <div className="rightIcon">
            <FaListUl className='icon' />
            <TbAppsFilled className='icon' />
          </div>
        </div>

      </div>

    </section>
  )
}

export default Home
