'use client'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { BookAIcon, LayoutDashboard, PlusSquareIcon } from "lucide-react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"

interface SideBarProps {
    id: number
    name: string
    icon: React.ReactNode
    href: string
}

export const sideBarMenus: SideBarProps[] = [
    {
        id: 3,
        name: 'Dashboard',
        icon: <LayoutDashboard className="h-5 w-5"> </LayoutDashboard>,
        href: "/dashboard"

    },
    {
        id: 1,
        name: "Posts",
        icon: <BookAIcon className="h-5 w-5" />,
        href: '/dashboard/posts'
    },
    {
        id: 2,
        name: "Create Post",
        icon: <PlusSquareIcon className="h-5 w-5" />,
        href: "/dashboard/create-post"
    }
]

const menuItemVariants: Variants = {
    closed: {
        opacity: 0,
        x: -20,
        transition: { duration: 0.2 }
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0.42, 0, 0.58, 1] // cubic-bezier for easeOut
        }
    }
}

const containerVariants = {
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    open: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export function SideBarSheet({ children }: { children: React.ReactNode }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button variant="ghost" className="relative overflow-hidden group">
                        {children}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Button>
                </motion.div>
            </SheetTrigger>

            <SheetContent className="w-[300px] sm:w-[350px]">
                <SheetHeader className="border-b pb-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </SheetTitle>
                        <SheetDescription className="text-sm text-gray-500">
                            Manage your content
                        </SheetDescription>
                    </motion.div>
                </SheetHeader>

                <motion.div
                    className="grid gap-2 py-6"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={containerVariants}
                >
                    {sideBarMenus.map((menu) => (
                        <motion.div
                            key={menu.id}
                            variants={menuItemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href={menu.href}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 px-4 py-6 text-md font-medium hover:bg-indigo-50/50 transition-colors"
                                >
                                    <span className="text-indigo-600">{menu.icon}</span>
                                    <span>{menu.name}</span>
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <SheetFooter className="border-t pt-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <SheetClose asChild>
                            <Button
                                variant="outline"
                                className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                            >
                                Close
                            </Button>
                        </SheetClose>
                    </motion.div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}