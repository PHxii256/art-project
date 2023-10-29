"use client"
import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useState } from 'react'
export default function RatingSlider() {
  const initialScore = 5

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

  return (
    <div className='grid w-full space-y-1'>
      <h1 className='ml-4 mt-2 font-semibold text-sm'>for a beginner this looks... <p className='inline italic text-xs'>({score}/10)</p></h1>
      <div className='flex flex-row flex-grow w-full'>
        <Slider className='mx-4' defaultValue={[initialScore]} step={0.5} max={10} onValueChange={(value)=>{setRatingText(value[0])}}/>
        <p className='mr-3 text-sm'>{rating}</p>
    </div>
    </div>
  )
}
