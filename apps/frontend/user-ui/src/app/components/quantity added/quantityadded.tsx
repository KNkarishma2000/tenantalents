import { products } from '../../../configs/constants';
import { PlusIcon, Pencil } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import star from "../../../assets/icons/kid_star.png";
import "../../home-page/productlist/Productlist";
import './quantityadded.css';

type ProductsProps = {
  listCount?: number;
};

const QuantityAdded = ({ listCount = 2 }: ProductsProps) => {
  const items = products.slice(0, listCount);

  return (
    <div className="quantitycard">
      <div className="quantityheader">
        <h3 className="sectiontitle">Your Cart</h3>
        <button className="bordered-button">Edit <Pencil /></button>
      </div>

      <div className="product-list">
        {items.map((i, index) => {
          const hasDiscount = i.offerPrice !== undefined && i.offerPrice < i.price; // Corrected: Using 'i' instead of 'product'
          
          return (
            <div key={index} >
              <Link href={i.href}>
                <div className=" product-list-item">
                  <div className="image-wrapper2">
                    <Image
                      src={Array.isArray(i.image) ? i.image[0] : i.image}
                      alt={i.title}
                      className="product-image"
                      fill
                    />
                  </div>
                  <div className="content-area2">
                    <h3 className="product-title">{i.title}</h3>
                    <div className="quantityprice">
                      <div className="quantityprice-section">
                        <p className="price-style">${i.price}</p>
                        {hasDiscount && <p className="offerprice-style">${i.offerPrice}</p>}
                      </div>
                      <div className="quantity-sec">
                      <p>Qnty:2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuantityAdded;
