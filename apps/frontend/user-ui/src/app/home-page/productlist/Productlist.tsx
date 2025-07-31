// Productslist.tsx

import { products } from '../../../configs/constants';
import React from 'react';
import ProductListItem from '../../components/productitemlist/Productitemlist';
import productItems from '../../../configs/global'
import './productlist.css';

type ProductsProps = {
  listCount?: number;
};

const Productslist = ({ listCount = 2 }: ProductsProps) => {
  const items: productItems[] = products
    .filter((item) => item.offerPrice !== undefined && item.offerPrice < item.price)
    .slice(0, listCount);

  return (
    <div className="products-lists">
      <div className="main-heading">
        <h3 className="heading">Heavy Discount</h3>
      </div>

      <div className="product-list">
        {items.length === 0 ? (
          <p>No discounted products found.</p>
        ) : (
          items.map((product, index) => (
            <div key={index}>
              <ProductListItem product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productslist;
