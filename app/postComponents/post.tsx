import React, { useEffect } from 'react'
import RatingSlider from './ratingSlider'
import Actions from './actions'
import PostHeader from './postHeader'
import ImageView from './imageView'
import Description from './description'
import { postPropsObj } from './types'

export default function Post({postObj}:postPropsObj) {  

  return (
    <div className='max-w-lg flex flex-col justify-center bg-zinc-900 mb-2 overflow-hidden'>
        <PostHeader postObj={postObj}/>
        <ImageView  postObj={postObj}/>
        <Description postObj={postObj}/>
        <RatingSlider/>
        <Actions postObj={postObj}/>
     </div>
  )
}
