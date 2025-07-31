'use client';
import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Tenanlents from "../../assets/tenanlenst-menu.png";
// import  HeaderBottom  from './headerbottom';
import Link from 'next/link';
// import './header.css'; 
import './footer&header.css'
import { categories, navItems } from '../../configs/constants';

const Header = () => {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          <div className='header-left'>
            <a href="/"><span className="logo">Tentalents</span></a>
          

          <div className="location">
            <MapPin className="icon5" size={20} />
            <p>Bhandup‑West, Mumbai‑78</p>
          </div>
</div>
<div className='header-right'>

          <div className="search-bar">
            <div className="search-categories">
              Categories
              <ChevronDown size={16} className="chevron" />
            </div>
            <input className="search-input" placeholder="Search Tentalents.in" />
            <div className="search-button">
              <Search className="search-icon" size={20} />
            </div>
          </div>

        <div className="cart">
  <Link href="/cart" className="cart-link">
    <ShoppingCart className="cart-icon" size={20} />
    <span>Cart</span>
  </Link>
</div>



          <div
            className="menu"
            onClick={() => setShowMenuDropdown((prev) => !prev)}
          >
            <Menu className="menu-icon" size={20} />
            <span>Menu</span>

            {showMenuDropdown && (
              <div className="menu-dropdown">
                <div className="menu-left">
                  <Image src={Tenanlents} alt="User" className="menu-image" />
                  <button className="seller-button">
                    Become a Seller
                    <ChevronRight size={20} className="chevron-white" />
                  </button>
                </div>

                <div className="menu-right">
                  <div className="account-categories">
                    <div className="account-section">
                      <h3 className='heading-menu'>My Account</h3>
                      {navItems.map((i, index) => (
                        <Link href={i.href} key={index} className="account-link">
                          <span>{i.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="category-section8">
                      <h3 className='heading-menu'>Popular Categories</h3>
                      <div className="category-links">
                        {categories.map((i, index) => (
                          <Link href={i.href} key={index} className="category-item">
                            <Image src={i.image} alt={i.title} width={20} height={20} />
                            <span>{i.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="offers">
                    {["50%", "40%", "20%", "10%"].map((offer, index) => (
                      <div key={index} className="offer-card">
                        <div className="offer-inner">
                          <span className="offer-percent">
                            {offer} <span className="offer-text">Off</span>
                          </span>
                          <ChevronRight size={20} className="chevron-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
