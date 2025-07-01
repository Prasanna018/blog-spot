import PostCard from '@/components/PostCard'
import { prisma } from '@/lib/prisma'

import React from 'react'

const Posts = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    console.log(posts)
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
            {
                posts.map((post) => (
                    <PostCard key={post.id} post={post} ></PostCard>
                ))
            }


        </div>
    )
}

export default Posts
