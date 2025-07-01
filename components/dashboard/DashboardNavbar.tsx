import { UserButton } from '@clerk/nextjs'
import { BookAIcon, PlusSquareIcon, Sheet } from 'lucide-react'
import React, { ReactNode } from 'react'
import { SideBarSheet } from './SideBarSheet'

interface SideBarProps {
    id: number,
    name: string,
    icon: ReactNode
    href: string
}

export const sideBarMenus: SideBarProps[] = [
    {
        id: 1,
        name: "Posts",
        icon: <BookAIcon className='h-5 w-5' />,
        href: '/dashboard/posts'
    },
    {
        id: 2,
        name: "Create Post",
        icon: <PlusSquareIcon className='h-5 w-5' />,
        href: "/dashboard/create-post"
    }
]

const DashboardNavbar = () => {
    return (
        <div className='w-full p-4 border-b sticky top-0 bg-background z-50'>
            <div className='flex w-full justify-between items-center max-w-7xl mx-auto'>

                <div className='font-bold text-xl'>
                    Logo
                </div>

                <div className='flex items-center gap-x-4'>
                    <UserButton afterSignOutUrl='/' />
                    <div className='lg:hidden'>
                        <SideBarSheet>
                            <Sheet className='h-6 w-6' />
                        </SideBarSheet>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardNavbar