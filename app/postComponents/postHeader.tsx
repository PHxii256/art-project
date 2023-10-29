import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PostType } from '../supabaseDbTypes'
import { postPropsObj } from './types'

export default function PostHeader({postObj}:postPropsObj) {
  return (
    <div className='mt-2 ml-1.5 flex flex-row w-full justify-start h-auto'>
        <Avatar>
            <AvatarImage src="https://i.pinimg.com/564x/4f/b4/6b/4fb46b7bdf1f8160655646a4e3c2ca46.jpg" />
            <AvatarFallback>PX</AvatarFallback>
        </Avatar>
        <div className='mb-2 ml-2 flex flex-col'>
          <p className='mt-0.5 font-semibold text-sm mr-2'>{postObj.postType.user_id}</p>
          <p className='mb text-neutral-400 text-xs '>14m ago</p>
        </div>
    </div>
  )
}
