'use client'
import React, { useState } from 'react';
import { MapPinPlus, PlusIcon, Trash, Pencil } from 'lucide-react';
import { address } from '../../../configs/constants';
import AddAddress from '../addaddresspopup/addaddress';
import './address.css';

type AddressProps = {
  showLocate?: boolean;
};

const Address = ({ showLocate = true }: AddressProps) => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  return (
    <div className='addressmain'>
      <div className="addressheader">
        <div className="address-header">
          <div className="address-headername">
            <h2>Delivery Address</h2>
          </div>
          <div className="addressbuttons">
            {showLocate && (
              <button className="bordered-button">
                Locate Me <MapPinPlus className="map" />
              </button>
            )}
            <button
              onClick={() => setIsAddressOpen(true)}
              className="background-button"
            >
              Add Address <PlusIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="address-bar">
        {address.map((item, index) => (
          <div key={index} className="address-card">
            <div className="addressleft">
              <div className="itemaddress">
                <p className="addressheading">Address - Home</p>
                <p className="address">
                  {item.address} - {item.pinCode} - {item.city} - {item.state} - {item.country}
                </p>
              </div>
              <div className="item-info">
                <p>{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.gmail}</p>
              </div>
            </div>
            <div className="addressright">
              <button className="bordered-button">
                Edit <Pencil />
              </button>
              <button className="bordered-button">
                Delete <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddAddress
        isOpen={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
      />
    </div>
  );
};

export default Address;
