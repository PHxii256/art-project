"use client"
import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useState } from 'react'
import { PostType } from '@/app/supabaseDbTypes'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function RatingSlider({post,currentUser, supabase }:{post:PostType , currentUser:string, supabase: SupabaseClient}) {
  const initialScore = 5 //for ui / ux
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null)
  const [rating, setRating] = useState<string>("Good")
  const [score, SetScore] = useState<number>(initialScore)

  function setRatingText(value: number){
      SetScore(value)
      if(value >= 8.5) setRating("Awesome")
      else if(value >= 7) setRating("Great")
      else if(value >= 5) setRating("Good")
      else if(value >= 3.5) setRating("Alright")
      else if(value >= 2) setRating("Meh")
      else setRating("Bad")
  }

  function timeout () {
    console.log("timeoutStarted")
    if(currentTimeout != null) {clearTimeout(currentTimeout)}
    const timeout = setTimeout(function () {
      writeRating()
      console.log("timeoutEnded")
    }, 5000)
    setCurrentTimeout(timeout)
  }


  async function writeRating(){
    const { data, error } = await supabase
    .from('posts_ratings')
    .upsert({
      rating: score, 
      rating_id: post.post_id+"/"+currentUser,
      post_id: post.post_id,
      rater_id: currentUser,
      rated_id: post.user_id})
    if(error) console.log(error)
    if(data) console.log(data)
  }

  return (
    <div className='grid w-full space-y-1'>
      <h1 className='ml-4 mt-2 font-semibold text-sm'>for a beginner this looks... <p className='inline italic text-xs'>({score}/10)</p></h1>
      <div className='flex flex-row flex-grow w-full'>
        <Slider className='mx-4' defaultValue={[initialScore]} step={0.5} max={10} onValueCommit={timeout} onValueChange={(value)=>{setRatingText(value[0])}}/>
        <p className='mr-3 text-sm'>{rating}</p>
    </div>
    </div>
  )
}
