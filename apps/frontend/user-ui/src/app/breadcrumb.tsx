'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const BreadCrumb = () => {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === '/') return null;

  // Split the path into segments (e.g., /about/us → ['about', 'us'])
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        {segments.map((segment, index) => {
          const fullPath = '/' + segments.slice(0, index + 1).join('/');
          return (
            <span key={index} className="breadcrumb-segment">
              <ChevronRight className="breadcrumb-icon" size={16} />
              <Link href={fullPath} className="breadcrumb-link2">
                {decodeURIComponent(segment.replace(/-/g, ' '))}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default BreadCrumb;
