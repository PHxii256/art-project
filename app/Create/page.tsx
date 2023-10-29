"use client"
import React from 'react'
import Uploader from '../testing/uploader'
export default function Page() {
  return (
    <div className='m-4'>
        <h1 className='font-bold text-4xl'>Create Post</h1>
        <div className='mt-4 flex flex-col max-w-sm'>
        <h1 className='font-semibold mb-2 text-muted-foreground'>Images</h1>
        <Uploader/>
        </div>
    </div>
  )
}
