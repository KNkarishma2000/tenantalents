'use client';

import React, { useEffect } from 'react';
import useSidebar from '../../../hooks/useSidebar';
import { usePathname } from 'next/navigation';
import useSeller from '../../../hooks/useSeller';
import Box from '../box/index';
import Link from 'next/link';
import { Header } from './sidebar.styles';
import './sidebar.css';
import { BoxIcon, Home, CircleUser } from 'lucide-react';
import { RiCustomerService2Line } from 'react-icons/ri';
import Image from 'next/image';
import Seller from '../../../assets/seller.png';

const SideBarWrapper = () => {
  const { activeSidebar, setActiveSidebar } = useSidebar();
  const pathName = usePathname();
  // const { seller } = useSeller();

  useEffect(() => {
    setActiveSidebar(pathName);
  }, [pathName, setActiveSidebar]);

  const getIconColor = (route: string) =>
    activeSidebar === route ? '#BCB3FF' : '#222222';

  return (
    <Box
      css={{
        height: '100vh',
    position: 'fixed', // changed from 'sticky' to 'fixed'
    top: 0,
    left: 0,
    width: '16rem', // make sure to explicitly set width if needed
    zIndex: 202,
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'hidden',
   paddingLeft:'25px',
      }}
      className="sidebar-wrapper"
    >
      {/* TOP SECTION */}
      <Header>
        <div className="main-layout">
          <Link href="/">
            <span className="logo">Tentalents</span>
          </Link>

          <div className="main">
            <div className="itemsec">
              <Home color={getIconColor('/')} />
              Home
            </div>
            <div className="itemsec">
              <BoxIcon color={getIconColor('/store')} />
              Store
            </div>
            <div className="itemsec">
              <CircleUser color={getIconColor('/account')} />
              Account
            </div>
            <div className="itemsec">
              <RiCustomerService2Line
                className="customer-support"
                color={getIconColor('/support')}
              />
              Support
            </div>
          </div>
        </div>
      </Header>

      {/* BOTTOM SECTION */}
      <div className="sellerinfo">
        <div className="sellerimage">
          <Image src={Seller} alt="sellerimage" width={40} height={40} />
        </div>
        <div className="seller-info">
          <h1 className="sellerheading">Ramesh Singh</h1>
          <p className="selleremail">ramesh@gmail.com</p>
        </div>
      </div>
    </Box>
  );
};

export default SideBarWrapper;
