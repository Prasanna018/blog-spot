import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='container border h-fit py-4
         mx-auto p-4  '>
            <div className='flex justify-center pt-10'>

                {children}
            </div>

        </div>
    )
}

export default layout
