import React from 'react'
import { postPropsObj } from './types'
export default function Description({postObj}:postPropsObj) {
  return (
    <div className='rounded-md w-auto h-auto flex mx-2 mt-0.5 bg-neutral-950'>
        <p className='text-[12px] font-semibold m-2 inline'>
            CC: {postObj.postType.description}
        </p>
    </div>
  )
}
