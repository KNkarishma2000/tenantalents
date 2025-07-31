import React from 'react'
import './ordercard.css'
import { Package } from 'lucide-react'
import { RiCustomerService2Line } from "react-icons/ri";
const OrderCard = () => {
  return (
    <div className="orderpage">
      <div className="orderpageheader">
      <div className="orderpage-headerleft">
      <p className="ordervalue border-grey"><span className="orderlabel pr-1">Order Placed</span> 20 November 2024</p>
      <p className="ordervalue "><span className="orderlabel  pr-1">Order Placed</span>406-9230290-9988</p>

      </div>
      <div className="orderheader-right">
      <p>Download Invoice</p>
      </div>
      
      
      </div>
      <div className="orderdetails">
        <div className="shipto">
        <p className="orderlabel">Ship To</p>
        <p className="ordervalue pr-2">Datta Mandir Chowk, Row House No. 4, Lunked Garden, Satyam Marg, Viman Nagar - 411014 - Pune - Maharashtra - India
</p>
        </div>
        <div className="payment-method">
        <p className="orderlabel">Payment Method</p>
        <p className="ordervalue">Prepid-UPI</p>
        </div>
        <div className="paymentamount">
        <p className="orderlabel">Payment-Method</p>
        <div className="total">
       <p className="ordervalue">Items Subtotal</p>
       <p className="ordervalue">$1275</p>
        </div>
         <div className="total">
     <p className="ordervalue"> Shipping</p>
        <p className="ordervalue">$50</p>
        </div>
         <div className="total">
        <p className="ordervalue">Grand Total</p>
        <p className="ordervalue">$1325</p>
        </div>
        </div>
      </div>
      <div className="orderupdates">
      <div className="ordervalueleft">
      <Package />
      <p  className="orderlabel">Order Updates</p>
      <p className="ordervalue">Dispatches on 29 March 2025 at 11:00AM</p>
      </div>
       <div className="ordervalueright">
       <button className="background-button">Need Support <RiCustomerService2Line /></button>
       </div>
      
  
      </div>

    </div>
  )
}

export default OrderCard