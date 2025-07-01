'use server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { revalidatePath } from 'next/cache';


cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME

})

export async function createPostAction(formData: FormData) {

    const user = await currentUser()

    const title = (formData.get('title'))
    const content = formData.get('content')
    const image = formData.get('image') as File


    try {
        if (image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = await Buffer.from(arrayBuffer);
            const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const UploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    }
                );
                UploadStream.end(buffer)
            })
            const finalImage = uploadResponse?.secure_url;
            console.log(finalImage)

            if (finalImage) {
                await prisma.post.create({
                    data: {
                        title: title as string,
                        content: content as string,
                        coverImage: finalImage as string,
                        authorId: user?.id || ''
                    }
                })
            }

        } else {
            await prisma.post.create({
                data: {
                    title: title as string,
                    content: content as string,
                    authorId: user?.id || ''

                }
            })
        }
        revalidatePath('/dashboard')

    } catch (error: unknown) {
        console.log(error)

    }
}