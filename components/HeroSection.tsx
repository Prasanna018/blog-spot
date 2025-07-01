'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight, Rocket, Sparkles } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden p-2 flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 100,
                            y: Math.random() * 100,
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{
                            x: Math.random() * 100,
                            y: Math.random() * 100,
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute rounded-full bg-gradient-to-r from-purple-400 to-indigo-600"
                        style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                {/* Animated gradient blob */}
                <motion.div
                    initial={{ x: -100, y: -100 }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 blur-3xl"
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col items-center px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto">
                <div className="w-full flex flex-col items-center text-center">
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 backdrop-blur-sm border border-indigo-200 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-600">
                            Introducing our revolutionary platform
                        </span>
                        <Rocket className="w-4 h-4 text-indigo-600" />
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl leading-tight"
                    >
                        Transform Your{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Digital Experience
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        Discover the future of web interactions with our cutting-edge platform that combines performance, design, and innovation.
                    </motion.p>

                    {/* Single CTA Button - Improved positioning */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="w-full flex justify-center mb-16"
                    >
                        <Button size="lg" className="gap-2 px-8 py-6 text-lg font-semibold">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex flex-wrap justify-center gap-8 mt-8"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-600">10K+</div>
                            <div className="text-gray-500">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-600">99.9%</div>
                            <div className="text-gray-500">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-600">4.9/5</div>
                            <div className="text-gray-500">Rating</div>
                        </div>
                    </motion.div>
                </div>
            </div>


        </section>
    )
}

export default HeroSection