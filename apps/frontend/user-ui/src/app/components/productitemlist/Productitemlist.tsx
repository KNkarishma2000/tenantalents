import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import star from '../../../assets/icons/kid_star.png';
import '../../home-page/productlist/productlist.css';
import '../../home-page/products-grid/productgrid.css';

import productItems from '../../../configs/global';


const ProductListItem: React.FC<{ product: productItems }> = ({ product }) => {
  const { image, title, price, offerPrice, rating, href } = product;

  const hasDiscount = typeof offerPrice === 'number' && offerPrice < price;

  return (
    <Link href={href}>
      <div className="product-list-item">
        <div className="image-wrapper2">
          <Image
            src={Array.isArray(image) ? image[0] : image}
            alt={title}
            className="product-image"
            fill
          />
        </div>

        <div className="content-area2">
          <h3 className="product-title">{title}</h3>
          <div className="price-main">
            <div className="price-section">
              {hasDiscount ? (
                <>
                  <p className="original-price">${price}</p>
                  <p className="offer-price">${offerPrice}</p>
                </>
              ) : (
                <p>${price}</p>
              )}
            </div>
            <div className="rating">
              <p>{rating}</p>
              <Image src={star} alt="star" />
              <p className="number">(100)</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
