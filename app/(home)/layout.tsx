
import Header from '@/components/Header'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='w-full'>
            <div className='fixed top-0 w-full bg-white z-50 border-b'>
                <Header></Header>
            </div>
            <main className='pt-16'>
                {children}
            </main>
        </div>
    )
}

export default layout
