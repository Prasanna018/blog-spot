import React from 'react'
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

const Header = async () => {
    const user = await currentUser();
    if (user && user.id) {

        const isUser = await prisma.user.findUnique({
            where: {
                clerkId: user.id
            }
        })
        console.log('user already in db')

        if (!isUser) {
            await prisma.user.create({
                data: {
                    clerkId: user.id,
                    name: user.fullName || "",
                    email: user.primaryEmailAddress?.emailAddress || "",
                    imageUrl: user.imageUrl

                }
            })
            console.log("new user created")
        }
    }


    return (
        <div className=''>
            <DesktopNavbar></DesktopNavbar>
            <MobileNavbar></MobileNavbar>
        </div >
    )
}

export default Header
