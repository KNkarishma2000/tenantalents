import React from 'react';

import  productItems  from '../../../configs/global';

import Link from 'next/link';
import Image from 'next/image';

const OrderPlaced: React.FC<{ product: productItems }> = ({ product }) => {
  const { title, href, price, offerPrice, rating,reviewCount, image } = product;

  // Ensure the image is correctly processed
  const productImage = Array.isArray(image) ? image[0] : image;

  return (
   
      <Link href={href}>
         <div className="product-list-item">
          <div className="image-wrapper2">
            <Image
              src={productImage}  // assuming the image path is correct
              alt={title}
              className="product-image"
              width={300} // Adjust this based on design requirements
              height={300} // Adjust this based on design requirements
              objectFit="cover"
            />
          </div>
          <div className="content-area2">
            <h3 className="product-title">{title}</h3>
            <div className="price-main">
              <div className="price-section">
                {offerPrice !== null ? (
                  <>
                    <p className="original-price">${price}</p>
                    <p className="offer-price">${offerPrice}</p>
                  </>
                ) : (
                  <p>${price}</p>
                )}
              </div>
            <div className="quantity-sec">
            <p>
  {reviewCount > 0 ? (
    `${reviewCount} ${reviewCount === 1 ? 'Review' : 'Reviews'}`
  ) : (
    'No reviews yet'
  )}
  </p>
</div>

            </div>
          </div>
      </div>
      </Link>
   
  );
};

export default OrderPlaced;
