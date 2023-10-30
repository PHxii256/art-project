import React from 'react'
import { PostType } from '../../app/supabaseDbTypes'
export default function Description({post}:{post:PostType}) {
  return (
    <div className='rounded-md w-auto h-auto flex mx-2 mt-0.5 bg-neutral-950'>
        <p className='text-[12px] font-semibold m-2 inline'>
            CC: {post.description}
        </p>
    </div>
  )
}
