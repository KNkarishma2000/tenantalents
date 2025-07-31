'use client';

import React from 'react';
import './productaccept.css';
import Image from 'next/image';
import type { ProductOrder } from '../../../configs/global'; // Adjust path as needed

interface ProductAcceptProps {
  orders?: ProductOrder[];
}

const ProductAccept = ({ orders }: ProductAcceptProps) => {
  const handleConfirm = (id: number) => console.log('Confirmed product ID:', id);
  const handleDeny = (id: number) => console.log('Denied product ID:', id);
  const handleViewStatus = (id: number) => console.log('Viewing status for product ID:', id);
  const handleTrackOrder = (id: number) => console.log('Tracking order for product ID:', id);
  const handleViewOrder = (id: number) => console.log('Viewing order for product ID:', id);

  const getStatusClass = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('failed') || lowerStatus.includes('unfulfilled')) return 'failed';
    if (lowerStatus.includes('unpaid')) return 'unpaid';
    if (lowerStatus.includes('in process')) return 'process';
    if (
      lowerStatus.includes('paid') ||
      lowerStatus.includes('fulfilled') ||
      lowerStatus.includes('refunded')
    ) {
      return 'paid';
    }
    return '';
  };

  if (!orders || orders.length === 0) {
    return <div>No orders to display.</div>;
  }

  return (
    <div>
      {orders.map((order) => {
        const normalizedStatuses = order.status.toLowerCase().split(',').map((s) => s.trim());

        const isPaidOnly = normalizedStatuses.length === 1 && normalizedStatuses.includes('paid');
        const isUnpaidOnly =
          normalizedStatuses.length === 1 && normalizedStatuses.includes('unpaid');
        const isPaidInProcess =
          normalizedStatuses.includes('paid') && normalizedStatuses.includes('in process');
        const isUnpaidInProcess =
          normalizedStatuses.includes('unpaid') && normalizedStatuses.includes('in process');
        const isPaidFulfilled =
          normalizedStatuses.includes('paid') && normalizedStatuses.includes('fulfilled');
        const isRefunded = normalizedStatuses.includes('refunded');
        const isFailedOrUnfulfilled =
          normalizedStatuses.includes('failed') || normalizedStatuses.includes('unfulfilled');

        return (
          <div key={order.id} className="product-item">
            <div className="product-section">
              <Image
                src={order.product.image}
                alt={order.product.name}
                width={100}
                height={100}
              />
              <h3 className="product-title">{order.product.name}</h3>
            </div>

            <div className="produtdetails">
                <p className="orderprice">{order.quantity}</p>
              <p className="orderprice">₹{order.price}</p>
              <p>{order.city}</p>
              <div className="status-tags">
                {normalizedStatuses.map((status) => (
                  <span key={status} className={getStatusClass(status)}>
                    {status}
                  </span>
                ))}
              </div>
            </div>

            <div className="productstatus">
              {isPaidInProcess || isUnpaidInProcess ? (
                <div className="product-buttons">
                  <button
                    className="center-borderedbutton bg-var(--lightblue2)"
                    onClick={() => handleTrackOrder(order.id)}
                  >
                    Track Order
                  </button>
                </div>
              ) : isPaidFulfilled || isRefunded ? (
                <div className="product-buttons">
                  <button
                    className="center-borderedbutton"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View Order
                  </button>
                </div>
              ) : isPaidOnly || isUnpaidOnly ? (
                <div className="product-buttons">
                  <button
                    className="center-borderedbutton"
                    onClick={() => handleDeny(order.id)}
                  >
                    Deny
                  </button>
                  <button
                    className="background-buttonver"
                    onClick={() => handleConfirm(order.id)}
                  >
                    Confirm
                  </button>
                </div>
              ) : isFailedOrUnfulfilled ? (
                <div className="product-buttons">
                  <button
                    className="center-borderedbutton"
                    onClick={() => handleViewStatus(order.id)}
                  >
                    View Status
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductAccept;