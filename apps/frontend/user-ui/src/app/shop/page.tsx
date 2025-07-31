'use client';

import React, { useState } from 'react';
import './shop.css';
import { ChevronDown, AlignJustify, LayoutDashboard, StarIcon } from 'lucide-react';
import Products from '../home-page/products-grid/productsgrid';
import { categories, products as defaultProducts } from '../../configs/constants';
import Image from 'next/image';

// Define the Category type used in product.category
type Category = string | { name: string };

// Assuming seller type has name and image, adjust if needed
type Seller = { name: string; image: string };

const Page = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [selectedDiscountRange, setSelectedDiscountRange] = useState<{ min: number; max: number } | null>(null);

  // Get unique sellers (assuming each seller is an object with name and image)
 const sellers: Seller[] = Array.from(
  new Map(
    defaultProducts
      .map((item) => item.seller)
      .filter((seller): seller is Seller => seller !== undefined && seller !== null)
      .map((seller) => [seller.name, seller])
  ).values()
);

  const getDiscount = (price: number, offer?: number) =>
    offer && offer < price ? Math.round(((price - offer) / price) * 100) : 0;

  const prices = defaultProducts.map((p) => p.offerPrice ?? p.price);
  const availableRatings = Array.from(
    new Set(defaultProducts.map((p) => Math.floor(p.rating * 2) / 2))
  ).sort((a, b) => b - a);

  const priceRanges = [
    { label: '$0 - $50', min: 0, max: 50 },
    { label: '$51 - $150', min: 51, max: 150 },
    { label: '$151 - $300', min: 151, max: 300 },
    { label: '$301+', min: 301, max: Infinity },
  ];

  const discountRanges = [
    { label: '10% - 20%', min: 10, max: 20 },
    { label: '21% - 30%', min: 21, max: 30 },
    { label: '30%+', min: 31, max: Infinity },
  ];

const filteredProducts = defaultProducts.filter((product) => {
  const matchCategory = selectedCategory
    ? product.category.includes(selectedCategory)
    : true;

  const matchSeller = selectedSeller
    ? product.seller?.name === selectedSeller
    : true;

  const matchRating = selectedRating ? product.rating >= selectedRating : true;

  const price = product.offerPrice ?? product.price;
  const matchPrice = selectedPriceRange
    ? price >= selectedPriceRange.min && price <= selectedPriceRange.max
    : true;

  const discount = getDiscount(product.price, product.offerPrice);
  const matchDiscount = selectedDiscountRange
    ? discount >= selectedDiscountRange.min && discount <= selectedDiscountRange.max
    : true;

  return matchCategory && matchSeller && matchRating && matchPrice && matchDiscount;
});

  return (
    <div className="shop-page-container">
      <div className="shop-page">
        <div className="shop-filter">
          <div className="shop-left">
            <h3>Filter</h3>
            <div className="filter-component">
              <h3
                className="clear-all"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSeller(null);
                  setSelectedRating(null);
                  setSelectedPriceRange(null);
                  setSelectedDiscountRange(null);
                }}
              >
                Clear All
              </h3>

              {/* --- Categories Dropdown --- */}
              <div className="filter-category dropdown-wrapper">
                <div
                  className="bordered-button filtercategory"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  Categories
                  <ChevronDown />
                </div>
                {showCategoryDropdown && (
                  <div className="dropdown-menu">
                    {categories.map((cat, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCategory(cat.title);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        <Image src={cat.image} alt={cat.title} width={20} height={20} />
                        <span>{cat.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* --- Seller Dropdown --- */}
              <div className="filter-seller dropdown-wrapper">
                <div
                  className="bordered-button"
                  onClick={() => setShowSellerDropdown(!showSellerDropdown)}
                >
                  By Seller
                  <ChevronDown />
                </div>
                {showSellerDropdown && (
                  <div className="dropdown-menu">
                    {sellers.map((seller, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedSeller(seller.name);
                          setShowSellerDropdown(false);
                        }}
                      >
                        <Image src={seller.image} alt={seller.name} width={20} height={20} />
                        <span>{seller.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="shop-right">
            <div className="filter-grid">
              <LayoutDashboard />
            </div>
            <div className="filter-List">
              <AlignJustify />
            </div>
          </div>
        </div>
      </div>

      <div className="filter-items">
        <div className="filter-itemsleft">
          {/* --- Discount Filter --- */}
          <div className="discountoffer">
            <h3 className="productheading">Discount Offer</h3>
            <ul>
              {discountRanges.map((range, index) => {
                const isSelected =
                  selectedDiscountRange?.min === range.min &&
                  selectedDiscountRange?.max === range.max;
                return (
                  <li key={index} onClick={() => setSelectedDiscountRange(range)}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        style={{ marginRight: '8px' }}
                      />
                      {range.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* --- Rating Filter --- */}
          <div className="rating-filter">
            <h3 className="productheading">Rating Item</h3>
            <ul className="product-rating1">
              {availableRatings.map((rating, index) => {
                const isSelected = selectedRating === rating;
                return (
                  <li
                    key={index}
                    onClick={() => setSelectedRating(rating)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ marginRight: '8px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          fill={i < rating ? '#FFD700' : 'none'}
                          stroke="#FFD700"
                          size={16}
                        />
                      ))}
                      <span style={{ marginLeft: '4px' }}>({rating}+)</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* --- Price Filter --- */}
          <div className="product-filter">
            <h3 className="productheading">Price Filter</h3>
            <ul>
              {priceRanges.map((range, index) => {
                const isSelected =
                  selectedPriceRange?.min === range.min &&
                  selectedPriceRange?.max === range.max;
                return (
                  <li
                    key={index}
                    onClick={() => setSelectedPriceRange(range)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ marginRight: '8px' }}
                    />
                    {range.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="filter-itemsright">
          <Products showHeader={false} products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Page;
