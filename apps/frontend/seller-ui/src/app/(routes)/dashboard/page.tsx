import HeaderBanner from '../../../shared/components/header/headerbanner'


import React from 'react'
import ProductTabs from '../../../shared/components/ProductTabs/ProductTabs'

const page = () => {
  return (
    <div>
      <HeaderBanner />
      <div className="pr-[20px] pt-[20px] pr-[20px] pl-[20px] bg-[#F6F5FF] rounded-[10px]">
        <ProductTabs />
      </div>
     
    
    </div>
  )
}

export default page