import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    params: Promise<{ title: string }>
}

const Page = async ({ params }: Props) => {
    const id = Number((await params).title)
    const post = await prisma.post.findUnique({
        where: { id }
    })

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                    <Link
                        href="/dashboard/posts"
                        className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                    >
                        <span className="mr-2">←</span> Back to posts
                    </Link>
                </div>
            </div>
        )
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link
                    href="/dashboard/posts"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    <span className="mr-2">←</span> Back to all posts
                </Link>
            </div>

            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
                {post.coverImage && (
                    <div className="relative h-64 sm:h-80 md:h-96">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="p-6 sm:p-8">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="mr-2">📅</span>
                        {formatDate(post.createdAt)}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {post.title}
                    </h1>

                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </div>
    )
}

export default Page