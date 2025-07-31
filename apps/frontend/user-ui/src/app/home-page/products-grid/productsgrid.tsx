// Products.tsx

import React from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard, { ProductItem } from '../../components/productcard/productcard';
import { products as defaultProducts } from '../../../configs/constants';
import './productgrid.css';

type ProductsProps = {
  columns?: number;
  
  category?: string;
  showHeader?: boolean;
  products?: ProductItem[];
};

const Products = ({ columns = 5, category, showHeader = true, products }: ProductsProps) => {
  const getDiscount = (price: number, offerPrice?: number): number => {
    if (price <= 0 || !offerPrice || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const filteredProducts = products
    ? products
    : category
    ? defaultProducts.filter((item) =>
        Array.isArray(item.category)
          ? item.category.includes(category)
          : item.category === category
      )
    : defaultProducts;

  return (
    <div className="products-grid  ">
      {showHeader && (
        <div className="main-heading ">
          <h3 className="heading">Popular Products</h3>
          <button className="background-button">
            Explore <ChevronRight />
          </button>
        </div>
      )}

      <div className={`product-grid columns-${columns}`}>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.slice(0, columns).map((product, index) => (
            <ProductCard key={index} product={product} getDiscount={getDiscount} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
