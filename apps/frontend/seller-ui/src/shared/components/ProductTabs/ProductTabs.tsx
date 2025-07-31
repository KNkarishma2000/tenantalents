'use client';

import React, { useState } from 'react';
import './ProductTabs.css';
import { useAtom } from 'jotai';
import { orderListAtom } from '../../../configs/constants';
import ProductAccept from '../productaccept/ProductAccept'; // reuse your existing component
 // optional, style tabs if needed
import { FaBox } from "react-icons/fa";
const tabs = ['All', 'New', 'In Process', 'Completed'] as const;
type TabType = typeof tabs[number];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [orders] = useAtom(orderListAtom);

  const filterOrders = (tab: TabType) => {
    switch (tab) {
      case 'New':
        return orders.filter(order =>
          ['unpaid', 'paid'].includes(order.status.toLowerCase())
        );
      case 'In Process':
        return orders.filter(order =>
          order.status.toLowerCase().includes('in process')
        );
      case 'Completed':
        return orders.filter(order =>
          order.status.toLowerCase().includes('fulfilled') ||
          order.status.toLowerCase().includes('refunded')
        );
      default:
        return orders; // All
    }
  };

  const filteredOrders = filterOrders(activeTab);

  return (
    <div>
        <div className='product-tabs-header'>
            <div className='product-tabs-title'>
                <FaBox />
                <h2 className='mainheading'>Orders </h2>

            </div>
            <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`tab-button  ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
        </div>
      

      {/* Reuse ProductAccept component, pass filtered orders */}
      <ProductAccept orders={filteredOrders} />
    </div>
  );
};

export default ProductTabs;
