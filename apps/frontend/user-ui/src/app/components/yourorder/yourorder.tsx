'use client';

import React from 'react';
import { products } from '../../../configs/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa';
import "../../home-page/productlist/Productlist";
import '../quantity added/quantityadded.css';
import { ChevronRight, Star } from 'lucide-react';
import './yourorder.css'
type ProductsProps = {
  listCount?: number;
};

const YourOrder = ({ listCount = 2 }: ProductsProps) => {
  const items = products.slice(0, listCount);

  return (
    <div className="products-lists productlistaddtocart2 ">
     <h2 className='yourorder'>Your Orders</h2>

      <div className="product-list">
        {items.map((i, index) => (
          <div key={index}>
            <Link href={i.href}>
              <div className="orderlistitem">
              <div className="orderimage">
                <div className="image-wrapper2">
                  <Image
                    src={Array.isArray(i.image) ? i.image[0] : i.image}
                    alt={i.title}
                    className="product-image"
                    fill
                  />
                </div>
             <div className="ordercontentleft">
                
                  <h3 className="product-title" >{i.title}</h3>
                </div>
              </div>
              


                  <div className="flexcontainer">
                   <div className="rating-stars staras">
  {Array.from({ length: 5 }).map((_, iIndex) => (
    <Star key={iIndex} className="lucide-star" />
  ))}
</div>

                  <div className="quantity price-section">
                      <p className="price-style">${i.price}</p>
                      {i.offerPrice && (
                        <p className="offerprice-style">
                          ${i.offerPrice}
                        </p>
                      )}
                    </div>

                   <div className="quantity-sec orderquantitypage">
                      <p>Qnty:2</p>
                      </div>
                      </div>
                
              </div>
            </Link>
            
          </div>
          
        ))}
        
      </div>
       <div className="review-button-container">
    <button className="background-button">Give Us a Review <Star /></button>
  </div>
    </div>
  );
};

export default YourOrder;
