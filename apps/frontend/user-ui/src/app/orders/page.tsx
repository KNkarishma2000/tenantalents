import React from 'react';
import {products} from "../../configs/constants"
import OrderCard from '../components/orderssec/ordercard';
import YourOrder from '../components/yourorder/yourorder';
import OrderPlaced from '../components/orderplaced/orderplaced';
import './orders.css';
import Closet from '../home-page/closet-section/closet';
import Products from '../home-page/products-grid/productsgrid';
import { ChevronRight, Search, Star } from 'lucide-react';
import '../home-page/headerbanner.css'
const Page = () => {
  return (
    <div className="orderapagefull2">
    <div className='orderapagefull'>
      <div className="orderpageleft">
        <div className='yourorder-header'>
          <h2 className='sectiontitle'>Your Orders</h2>
        
         <div className='dateorder'>
    <div className='search-inputbutton'>
            <input type="text" placeholder='Search Order By ID/Product name' />
            <button className='background-button'><Search className="search-icon" /></button>
          </div>
  <select id="dateFilter" className="bordered-button custom-dropdown">
    <option value="all">All Orders</option>
    <option value="15days">Past 15 Days</option>
    <option value="30days">Past 30 Days</option>
    <option value="3months">Past 3 Months</option>
    <option value="6months">Past 6 Months</option>
    <option value="1year">Past 1 Year</option>
  </select>
</div>

        </div>
        <div className='sectionsorder'>
        <OrderCard />
        <YourOrder />
        </div>
      
      </div>
      
      <div className="productpageright">
      <div className="popularproductcard">
        {/* Ensure products[2] exists */}
        <h2 className='sectiontitle'>Popular Products</h2>
        {products.slice(0,4).map((product,index)=>(
          <OrderPlaced key={product.id} product={product} />
        ))}
        <button className="background-button shopbutton">Explore Shop</button>
      </div>
       <div className="fullwidth-banner">
  <div className="section-1 ">
    <div className="content">
      <h3 className="banner-heading">Denim That Defines</h3>
      <p className="content-para">
        Explore premium fits, rugged comfort, and timeless style made for every move.
      </p>
      <button className="background-button mt-[10px]">
        Explore Now <ChevronRight />
      </button>
    </div>
  </div>
</div>
        </div>
      </div>
      <div>
      <Products />
      <Closet />
      </div>
    </div>
  );
};

export default Page;
