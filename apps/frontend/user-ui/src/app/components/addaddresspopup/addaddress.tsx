'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPinPlus } from 'lucide-react';
import './addaddress.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type AddAddressProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddAddress = ({ isOpen, onClose }: AddAddressProps) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (formRef.current && !formRef.current.contains(target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAddress = { name, phone, country, state, address, landmark };
    console.log('New Address:', newAddress);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="addaddresspopup" ref={formRef}>
        <div className="addresspopup-header">
          <h2>How Will We Contact You</h2>
          <button className="bordered-button" onClick={onClose}>Close</button>
        </div>

        <form className="addressform" onSubmit={handleSubmit}>
          <div className="firstcolumn topsection">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="phone-input"
            />
          </div>

          <div className="newdelivery">
            <h2 className="sectiontitle">Add New Delivery Address</h2>

            <div className="firstcolumn">
              <input
                type="text"
                placeholder="Choose Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Choose State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="firstcolumn">
              <input
                type="text"
                placeholder="Choose City"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="address-section">
              <input
                type="text"
                placeholder="Flat, House no., Building, Company, Apartment"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="button" className="background-button">
                Locate Me <MapPinPlus />
              </button>
            </div>

            <input
              type="text"
              placeholder="Area, Street, Sector, Village"
              value={landmark}
              className="input-field"
              onChange={(e) => setLandmark(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nearby Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>

          <div className="chooseaddress">
            <div className="addresstype">
              <h2>Address Type</h2>
            </div>
            <div className="selectone">
              <button type="button" className="bordered-button">Home</button>
              <button type="button" className="bordered-button">Business</button>
              <button type="button" className="bordered-button">Relative</button>
              <button type="button" className="bordered-button">Others</button>
            </div>
          </div>

          <textarea className="instructions" placeholder="Any Instructions" />

          <div className="useaddress">
            <label>
              <input type="checkbox" value="check" />
              Use this as default address
            </label>
            <button type="submit" className="background-button">
              Use This Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
