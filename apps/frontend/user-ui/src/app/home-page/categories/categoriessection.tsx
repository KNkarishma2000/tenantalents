import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '../../../configs/constants';
// import './headerbanner.css';
import './categories.css';
import jeans from '../../../assets/jeans.png';
import appliances from '../../../assets/appliances.png';
import { ChevronRight } from 'lucide-react';

const Categories = () => {
  return (
    <div>
      <div className="category-main">
        {/* Category section */}
        <div className="category-section">
          <ul className="category-list">
            {categories.map((i, index) => (
              <li key={index} className="list-none">
                <Link href={i.href} className="lists">
                  <Image src={i.image} alt={i.title} width={30} height={30} />
                  <span>{i.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        </div>
      </div>
 
  );
};

export default Categories;
