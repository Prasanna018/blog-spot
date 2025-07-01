import { Post } from '@prisma/client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
    post: Post & {
        coverImage?: string | null
    }
    maxContentLength?: number
}

const PostCard = ({ post, maxContentLength = 150 }: PostCardProps) => {
    const truncatedContent = post.content.length > maxContentLength
        ? post.content.substring(0, maxContentLength) + '...'
        : post.content

    return (
        <div className='p-4'>
            <Card className='h-full transition-shadow duration-200 hover:shadow-md'>
                {post.coverImage && (
                    <div className='relative h-48 w-full'>
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className='object-cover rounded-t-lg'
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className='text-xl'>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-gray-600 dark:text-gray-300'>
                        {truncatedContent}
                    </p>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/post/${post.id}`}
                        className='text-sm text-primary font-medium hover:underline'
                    >
                        Read more →
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard