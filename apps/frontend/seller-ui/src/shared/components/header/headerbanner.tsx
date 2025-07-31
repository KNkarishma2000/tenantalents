import React from 'react'
import { Search, Upload , Bell, House} from 'lucide-react'
import './headerbanner.css'
import { RiCustomerService2Line } from 'react-icons/ri';
const HeaderBanner = () => {
  return (
    <div>
        <div className="headerbanner">
            <div className='search-container'>
                <div className="searchbar">
                       <input className="search-input" placeholder="Search Your Store" />
                        <div className="background-button">
                          <Search className="search-icon" size={20} />
                        </div>
            </div>
            </div>
            
            <div className='rightside'>
                <button className='background-button'>
                  Bulk Upload
                  <Upload />
                </button>
                <button className='bordered-button'>
                    <Bell />
                </button>
                 <button className='bordered-button'>
               <RiCustomerService2Line className='supportbutton' />
                </button>
                <button className='bordered-button account'>
                    Account<House />
                </button>
            </div>

        </div>
    </div>
  )
}

export default HeaderBanner