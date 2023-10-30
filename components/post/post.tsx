import React, { useEffect } from 'react'
import RatingSlider from './ratingSlider'
import Actions from './actions'
import PostHeader from './postHeader'
import ImageView from './imageView'
import Description from './description'
import { PostType } from '../../app/supabaseDbTypes'

export default function Post({post}:{post: PostType}) {  

  return (
    <div className='max-w-lg flex flex-col justify-center bg-zinc-900 mb-2 overflow-hidden'>
        <PostHeader post={post}/>
        <ImageView  post={post}/>
        <Description post={post}/>
        <RatingSlider/>
        <Actions post={post}/>
     </div>
  )
}
