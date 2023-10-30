import React, { useEffect } from 'react'
import RatingSlider from './ratingSlider'
import Actions from './actions'
import PostHeader from './postHeader'
import ImageView from './imageView'
import Description from './description'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { PostType } from '../../app/supabaseDbTypes';

export default function Post({post,currentUser, supabase }:{post:PostType , currentUser:string, supabase: SupabaseClient}) {  

  return (
    <div className='max-w-lg flex flex-col justify-center bg-zinc-900 mb-2 overflow-hidden'>
        <PostHeader post={post} supabase={supabase}/>
        <ImageView  post={post} currentUser={currentUser} supabase={supabase}/>
        <Description post={post}/>
        <RatingSlider post={post} currentUser={currentUser} supabase={supabase}/>
        <Actions post={post} currentUser={currentUser} supabase={supabase}/>
     </div>
  )
}
