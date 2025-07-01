'use client'
import { ContactIcon, LayoutDashboard } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'

interface MenuProp {
    id: number,
    name: string,
    icon: React.ReactNode,
    href: string
}

const navMenu: MenuProp[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        href: "/dashboard"
    },
    {
        id: 2,
        name: "Posts",
        icon: null,
        href: "/posts"
    },
    {
        id: 3,
        name: "Contact",
        icon: <ContactIcon className="w-5 h-5" />,
        href: "/contact"
    }
]

const DesktopNavbar = () => {
    const { user } = useUser();
    return (
        <header className="sticky top-0 z-50 hidden md:flex bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto w-full lg:px-8 px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                        >
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                Logo
                            </Link>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    {
                        user && user.id && (
                            <nav className="hidden md:flex items-center space-x-8">
                                {navMenu.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            {item.icon && (
                                                <span className="text-gray-500">
                                                    {item.icon}
                                                </span>
                                            )}
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        )
                    }


                    {/* User/Auth Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-4"
                    >
                        <div>
                            <Button variant={'secondary'}>
                                View Posts
                            </Button>

                        </div>
                        <SignedOut>

                            <Button asChild>
                                <SignInButton mode='modal'></SignInButton>
                            </Button>
                            <Button asChild variant={'ghost'}>
                                <SignUpButton mode='modal'></SignUpButton>
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton></UserButton>
                        </SignedIn>
                    </motion.div>

                </div>
            </div>
        </header>
    )
}

export default DesktopNavbar;