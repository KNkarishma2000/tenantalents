import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import jeans from '../../assets/jeans.png';
import appliances from '../../assets/appliances.png';
import { ChevronRight } from 'lucide-react';

const BannerSection = () => {
  return (
    <div>
      {/* Banner section */}
      <div className="banner ">
        <div className="section-2">
          {/* You can add more content here if needed */}
          <div className="content-part">
            <h3 className="banner-heading">Upgrade Your Home, Effortlessly</h3>
            <p className="content-para">
              Explore premium fits, rugged comfort, and timeless style made <br /> for every move.
            </p>
            <button className="background-button mt-[10px]">
              Explore Now <ChevronRight />
            </button>
          </div>
          <div className="image-part">
            {/* Uncomment to use image */}
            {/* <Image src={appliances} alt="appliances" className="image-1" /> */}
          </div>
        </div>

        <div className="section-1">
          <div className="content">
            <h3 className="banner-heading">Denim That Defines</h3>
            <p className="content-para">
              Explore premium fits, rugged comfort, and timeless style made for every move.
            </p>
            <button className="background-button mt-[10px]">
              Explore Now <ChevronRight />
            </button>
          </div>
          {/* Uncomment to use image */}
          {/* <Image className="images" src={jeans} alt="jeans" /> */}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
