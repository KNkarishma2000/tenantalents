"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import './producttab.css';
import { categories } from '../../../configs/constants';
import Products from '../products-grid/productsgrid'; // ✅ Update this path as needed

const ProductTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.title || '');

  return (
    <div className="category-tab mt-[30px] mb-[30px]">
      <div className="category-heading">
        <div className="category-title">
          <h3 className="heading">Popular Categories</h3>
        </div>

        <div className="tabs">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`tab ${selectedCategory === category.title ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.title)}
            >
              <Image src={category.image} alt={category.title} width={20} height={20} />
              <h2>{category.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* 🔁 Filtered Product Grid */}
      <div className="category-products">
        <Products columns={5} category={selectedCategory} showHeader={false} />
      </div>
    </div>
  );
};

export default ProductTabs;
