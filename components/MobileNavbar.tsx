'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { LayoutDashboard, Menu, X, Home, BookText, Mail, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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
        icon: <BookText className="w-5 h-5" />,
        href: "/posts"
    },
    {
        id: 3,
        name: "Contact",
        icon: <Mail className="w-5 h-5" />,
        href: "/contact"
    }
]

const MobileNavbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full md:hidden sticky top-0 z-50">
            {/* Top Bar with Frosted Glass Effect */}
            <motion.div
                className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-lg border-b border-gray-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <Home className="w-6 h-6 text-indigo-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Logo
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex border-gray-300"
                            onClick={() => {
                                setOpen(true)
                                // Scroll to View Posts in the menu
                                setTimeout(() => {
                                    document.getElementById('view-posts-link')?.scrollIntoView({ behavior: 'smooth' })
                                }, 300)
                            }}
                        >
                            View Posts
                        </Button>
                    </motion.div>

                    <SignedOut>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <SignInButton mode="modal">
                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </motion.div>
                    </SignedOut>

                    <SignedIn>
                        <div className="flex items-center gap-3">
                            <UserButton afterSignOutUrl="/" />
                            <motion.button
                                onClick={() => setOpen(!open)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </motion.button>
                        </div>
                    </SignedIn>
                </div>
            </motion.div>

            {/* Sliding Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-16 bg-white z-40 shadow-xl overflow-y-auto"
                    >
                        <div className="p-6 space-y-6">
                            {/* Added View Posts link at the top of the menu */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 }}
                                id="view-posts-link"
                            >
                                <Link
                                    href="/posts"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors group"
                                >
                                    <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Newspaper className="w-5 h-5" />
                                    </span>
                                    <span className="font-medium text-gray-800 group-hover:text-indigo-600">
                                        View Posts
                                    </span>
                                    <motion.span
                                        className="ml-auto text-gray-400"
                                        whileHover={{ x: 3 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </motion.div>

                            {/* Original Menu Items */}
                            {navMenu.map((menu) => (
                                <motion.div
                                    key={menu.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * menu.id }}
                                >
                                    <Link
                                        href={menu.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors group"
                                    >
                                        <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            {menu.icon}
                                        </span>
                                        <span className="font-medium text-gray-800 group-hover:text-indigo-600">
                                            {menu.name}
                                        </span>
                                        <motion.span
                                            className="ml-auto text-gray-400"
                                            whileHover={{ x: 3 }}
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                className="pt-6 mt-6 border-t border-gray-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    variant="outline"
                                    className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                                    onClick={() => setOpen(false)}
                                >
                                    Close Menu
                                </Button>
                                <Button
                                    className='w-full mt-3'
                                    asChild>
                                    <SignOutButton></SignOutButton>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileNavbar