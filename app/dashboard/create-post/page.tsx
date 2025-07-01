'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { createPostAction } from "@/actions/createPostAction";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";




const CreatePost = () => {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = (formData.get('title'))
    const content = formData.get('content')





    if (!title || !content) {
      toast.error('fields must be there')
    }


    console.log(formData)
    try {
      setLoading(true)
      await createPostAction(formData);


      toast.success('Post created');
      ref.current?.reset();
      router.push('/dashboard/posts')


    } catch (error: unknown) {
      console.log(error)
      ref.current?.reset();


    } finally {
      setLoading(false)
    }


  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden'>

        {/* Header Section */}
        <div className='border-b p-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Write Your Blog</h1>
        </div>

        <form ref={ref} onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              id="title"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Content</Label>
            <Textarea
              name="content"
              id="description"
              placeholder="Write your blog content here..."
              className="min-h-[200px] overflow-y-auto"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              Upload a featured image for your blog (JPEG, PNG)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit">
              {
                loading && <Loader2Icon className="h-5 w-5 animate-spin"></Loader2Icon>
              }
              Post
            </Button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default CreatePost;