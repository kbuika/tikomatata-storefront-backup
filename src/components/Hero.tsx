"use client"
import React from "react"

const Hero = () => {
  return (
    <div className="w-full h-[55vh] md:px-[80px] px-[20px] flex flex-col md:items-center justify-center">
      <h1 className="text-3xl text-white font-extrabold mb-24 text-center md:mb-5 md:text-5xl">
        Discover <span className="text-testPrimary">EXPERIENCES</span> around you
      </h1>
      {/* <p className='mb-2 md:text-center md:text-lg md:text-gray-100 text-white'>
				Book your tickets to the hottest shows, concerts, and festivals around.
				From electrifying music concerts to action-packed sporting events, we&apos;ve
				got you covered.
			</p>
			<p className='mb-6 md:text-center md:text-lg md:text-gray-100 text-white'>
				Don&amp;t miss out on the memories - grab your tickets now!
			</p> */}
    </div>
  )
}

export default Hero
