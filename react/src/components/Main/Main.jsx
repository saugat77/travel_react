import React, { useEffect, useRef, useState } from 'react';
import './main.css';
import axiosClient from '../../axios-client';
import { GrLocation } from 'react-icons/gr';
import { FaEye } from "react-icons/fa6";
import Footer from "../Footer/Footer";

import Aos from 'aos';
import 'aos/dist/aos.css';


function Main() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const getDestination = () => {
    if (!loading) {

      axiosClient.get('/destinations').then(({ data }) => {
        setDestinations(data.data);
        setLoading(true);
      })

    }
  }



  useEffect(() => {
    console.log(destinations);
    getDestination();
  })
  return (
    <>
      <section className='main container section'>
        <div className="secTitle">
          <h3 className="title">
            Most Visted destinations
          </h3>
        </div>
        <div className="secContent grid">
          {
            destinations.map((u, index) => (
              <div key={index} data-aos="fade-up" className='singleDestination' >

                <div className="imageDiv">
                  <img src={u.image_src} alt={u.title} />
                </div>
                <div className="cardInfo">
                  <h4 className='destTitle'>{u.title}</h4>
                  <span className="continent flex">
                    <GrLocation className='icon' />
                    <span className="name">{u.location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{u.category}<small>+1</small></span>
                    </div>
                    <div className='price'>
                      <h5>{u.fees}</h5>
                    </div>
                  </div>


                  <div className="desc">
                    <p>{u.description}</p>
                  </div>
                  <button className='frontendbtn flex'>Details <FaEye className='icon' /> </button>
                </div>
              </div>
            )
            )
          }


        </div>
      </section >
      <Footer />
    </>

  )
}

export default Main
