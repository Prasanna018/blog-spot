
import HeroSection from '@/components/HeroSection'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Home = async () => {

  const Posts = ['12', '45', '86']

  return (
    <div>
      <HeroSection></HeroSection>
    </div>
  )
}

export default Home
