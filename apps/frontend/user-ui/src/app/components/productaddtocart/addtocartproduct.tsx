import { products } from '../../../configs/constants';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import star from "../../../assets/icons/kid_star.png";
import "../../home-page/productlist/Productlist";

type ProductsProps = {
  listCount?: number;
};

const ProductCart = ({ listCount = 2 }: ProductsProps) => {
  const items = products.slice(0, listCount);

  return (
    <div className="products-lists productlistaddtocart">
      <div className="main-heading">
        <h3 className="heading">People Also Bought</h3>
      </div>

      <div className="product-list">
        {items.map((i, index) => (
          <div key={index}>
            <Link href={i.href}>
              <div className="product-list-item">
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
                  <div className="price-main">
                    <div className="price-section">
                      <p>${i.price}</p>
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
        ))}
      </div>
    </div>
  );
};

export default ProductCart;
