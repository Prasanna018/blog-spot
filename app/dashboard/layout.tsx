import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import { DesktopSidebar } from '@/components/dashboard/DesktopSidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen w-full flex flex-col'>
            {/* Fixed Navbar */}
            <div className='fixed top-0 left-0 right-0 z-10'>
                <DashboardNavbar />
            </div>

            {/* Main Content Area */}
            <div className='flex flex-1 pt-16'> {/* pt-16 to account for navbar height */}
                {/* Fixed Sidebar - hidden on mobile */}
                <div className='hidden lg:block w-70 h-[calc(100vh-4rem)] fixed border-r z-0'>
                    <DesktopSidebar />
                </div>

                {/* Scrollable Content Area */}
                <div className='flex-1 lg:ml-70 mt-0 overflow-y-auto h-[calc(100vh-4rem)]'>
                    <div className='p-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout