'use client'
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
      ease: [0.42, 0, 0.58, 1]
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
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

export function DesktopSidebar() {
  return (
    <motion.div
      className="hidden md:flex flex-col h-full w-64 bg-white/50 backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your content
          </p>
        </motion.div>
      </div>

      <motion.nav
        className="flex-1 px-4 py-6"
        initial="closed"
        animate="open"
        variants={containerVariants}
      >
        <div className="space-y-2">
          {sideBarMenus.map((menu) => (
            <motion.div
              key={menu.id}
              variants={menuItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href={menu.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium text-gray-700 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors cursor-pointer">
                  <span className="text-indigo-600">{menu.icon}</span>
                  <span>{menu.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      <motion.div
        className="p-4 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Your App
        </div>
      </motion.div>
    </motion.div>
  )
}