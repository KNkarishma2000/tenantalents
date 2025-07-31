import SideBarWrapper from '../../../shared/components/sidebar/sidebar'
import React from 'react'

const Layout = ({children}: {children:React.ReactNode}) => {
  return (
    <div className='flex h-full  min-h-sreen'>
        {/* sidebar */}
        <aside className='w-[280px] min-w-[250px] max-w-[300px]  text-white p-4'>
            <div className='sticky top-0'>
                <SideBarWrapper/>
            </div>
        </aside>

        <main className='flex-1'>
            <div className='overflow-x-auto'>
                {children}
            </div>
        </main>
    </div>
  )
}

export default Layout