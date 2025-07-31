import React from 'react'
import './address.css'
import Address from '../components/addaddress/Address'
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Mainimage from "../../assets/tenanlenst-menu.png";
import '../components/addaddresspopup/addaddress.css';
import ProfileIcn from '../../assets/profileicon.png'
const page = () => {
  return (
    <div className='accountpage'>
        <div className="accountheader">
                <h2 className="sectiontitle">My Account</h2>
                <div className="accountname">User Account</div>
            </div>

        <div className="accountpagemain">
           <div className="accountpage-leftsection">
            <div className="acountdetails">
                <div className="accountdetailsheader">
                    <h2 className="sectiontitle">Personal Details</h2>
                    <button className="background-button">Update Profile</button>
                </div>
                <div className="profiledetails">
                    <div className="profiledetailsleft">
                        <Image src={ProfileIcn} alt="profileicno" />

                    </div>
                    <div className="profiledetailsright">
                        <div className='first-column'>
                            <input type="text" placeholder='Full Name' />
                            <input type="tel" placeholder='Phone No' />

                        </div>
                        <div className='first-column'>
                           
                            <input type="tel" placeholder='Alternative Phone No' />
                            <input type="email" placeholder='Your Email Id' />
                            
                        </div>
                    </div>
                </div>

            </div>
         <Address showLocate={false} />
         </div>
         
          <div className="accountpage-right">
        <div className="menu-left">
                  <Image src={Mainimage} alt="User" className="menu-image" />
                  <button className="background-button">
                    Become a Seller
                    <ChevronRight size={20} className="chevron-white" />
                  </button>
                </div>
        </div>
        </div>
       

    </div>
  )
}

export default page

