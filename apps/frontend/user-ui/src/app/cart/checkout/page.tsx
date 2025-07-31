'use client';  // Add this directive to mark it as a client component

import React, { useState } from 'react';
import Address from '../../components/addaddress/Address';
import Payment from '../../components/paymentmethod/payment';
import './checkout.css'
import '../cart.css';
import QuantityAdded from '../../components/quantity added/quantityadded';
const Page = () => {
  return (
    <div>
      <div className="deliverylocation">
        <div className="checkoutleft">
          <Address />
          <Payment />
        </div>
        <div className="checkoutright">
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
          </div>
          <QuantityAdded />
        </div>
      </div>
    </div>
  );
};

export default Page;
