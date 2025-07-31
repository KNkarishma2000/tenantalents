import { products } from '../../../configs/constants';
import { ChevronRight, Star, PlusIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import './productgrid.css';
import star from "../../../assets/icons/kid_star.png"
import "../../home-page/productlist/Productlist"

type ProductsProps ={
  listCount?: number;
}

const ProductCart = ({ listCount = 2 }: ProductsProps) => {
  // Make offerPrice optional with `offerPrice?: number`
  const getDiscount = (price: number, offerPrice?: number): number => {
    if (price <= 0 || offerPrice === undefined || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const items = products.slice(0, listCount);
  return (
    <div className="products-lists productlistaddtocart">
      <div className="main-heading">
        <h3 className="heading">People Also Bought</h3>
      </div>

      <div className="product-list">
        {items.map((i, index) => {
          const hasDiscount = i.offerPrice !== undefined && i.offerPrice < i.price;
          return (
            <div key={index}>
              <Link href={i.href}>
                <div className="product-list-item">
                  <div className="image-wrapper2">
                    {hasDiscount && (
                      <p className="discount">{getDiscount(i.price, i.offerPrice)}% OFF</p>
                    )}
                    <Image
                      src={Array.isArray(i.image) ? i.image[0] : i.image}
                      alt={i.title}
                      className="product-image"
                      fill
                    />
                  </div>
                  <div className="content-area2">
                    <h3 className="product-title">{i.title}</h3>
                    <div className="price-main">
                      <div className="price-section">
                        {hasDiscount ? (
                          <>
                            <p>${i.price}</p>
                            <p className="offer-price">${i.offerPrice}</p>
                          </>
                        ) : (
                          <p>${i.price}</p>
                        )}
                      </div>
                      <div className="rating">
                        <p>{i.rating}</p>
                        <Image src={star} alt="star" />
                        <p className="number">(100)</p>
                      </div>
                    </div>
                    <div className="add-tocart">
                      <button className="background-button">
                        Add to Cart <PlusIcon />
                      </button>
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

export default ProductCart;
