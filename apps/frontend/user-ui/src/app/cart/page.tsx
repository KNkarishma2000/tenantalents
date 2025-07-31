'use client';

import React, { useState } from 'react';
import { products } from '../../configs/constants';
import '../shop/[slug]/singleproductpage.css';
import { ChevronRight, Minus, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Products from '../home-page/products-grid/productsgrid';
import './cart.css';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="cartpage">
      <div className="cart-section">
        <div className="cartsection-left">
          <div className="product-list">
            {products.map((product, index) => {
              const hasDiscount =
                product.offerPrice !== undefined && product.offerPrice < product.price;

              const productImage = Array.isArray(product.image)
                ? product.image[0]
                : product.image;

              return (
                <div key={product.id || index} className="productcart">
                  <div
                    className="image-wrapper2"
                    style={{ position: 'relative', width: '130px', height: '80px' }}
                  >
                    <Link href={product.href}>
                      <Image
                        src={productImage}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="product-image cartproduct-image"
                      />
                    </Link>
                  </div>

                  <div className="detailcart">
                    <div className="cartcontentarea">
                      <Link href={product.href}>
                        <h3 className="product-title">{product.title}</h3>
                      </Link>

                      <div className="price-main">
                        <div className="price-section">
                          {hasDiscount ? (
                            <>
                              <p className="original-price">${product.price.toFixed(2)}</p>
                              <p className="offer-price">${product.offerPrice?.toFixed(2)}</p>
                            </>
                          ) : (
                            <p>${product.price.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="saveforlater">
                          <button type="button">Save for later</button>
                        </div>
                      </div>
                    </div>

                    <div className="adtocart-wrapper2">
                      <div className="counter">
                        <Minus
                          className="counter-icon"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        />
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <PlusIcon
                          className="counter-icon"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        />
                      </div>
                    </div>

                    <div className="orderprice">
                      <p className="original-price cartprice">
                        ${product.offerPrice?.toFixed(2) ?? product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cartsection-right">
          <div className="coupon-section applysection">
            <form>
              <input
                type="text"
                className="coupon-text"
                placeholder="Apply Coupon Code"
                aria-label="Coupon Code"
              />
              <button type="submit" className="bordered-button couponbutton">
                Apply
              </button>
            </form>
          </div>
          <div className='subtotal-section'>
          <div className="subtotal">
            <h2>Subtotal</h2>
            <p>$1276.00</p>
          </div>
          <div className="subtotal">
            <h2>Shipping</h2>
            <p>$54.00</p>
          </div>
          <div className="subtotal">
            <h2>Platform Fee</h2>
            <p>$4.00</p>
          </div>
          <div className="subtotal total">
            <h2 className="alltotal">Total</h2>
            <p>$1334.00</p>
          </div>
          <div className="checkout">
            <Link href="/cart/checkout" className="background-button checkoutbutton">
               Checkout <ChevronRight />
      </Link>
          </div>
          
          </div>
        </div>
      </div>

      <Products />
    </div>
  );
};

export default Cart;
