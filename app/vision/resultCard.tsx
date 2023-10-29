import React from 'react'
import {
    Check,
    X
  } from "lucide-react"
import { Button } from "@/components/ui/button"
import VisionResult from './visionTypes'

export default function ResultCard({resultObj, toggleSheet}:{resultObj: VisionResult, toggleSheet: Function}) {

  const srcPath = resultObj.fileUri.slice(7) //[cuts out public/]
  const allResults = [...resultObj.fullMatchingResults , ...resultObj.partialMatchingResults]
  const nFullMatches = resultObj.fullMatchingResults.length
  const nPartialMatches = resultObj.partialMatchingResults.length
  const marginForError = 1

  function isFailing(){
    return(nFullMatches + nPartialMatches > marginForError)
  }

  return (
    <div className='flex flex-row m-5'>
        <img src={srcPath} className='object-cover w-44 xs:w-52 sm:72 rounded-lg hover:border-4 hover:border-primary' 
        onClick={()=>toggleSheet("All Results", allResults)}/>
        <div className='ml-4'>
            <Button onClick={()=>toggleSheet("Fully Matching Results", resultObj.fullMatchingResults)} variant="link" className='text-[1rem] h-5 font-bold  xs:mb-1 xs:text-2xl xs:h-auto p-0 '>Full Matches: {nFullMatches}</Button><br/>
            <Button onClick={()=>toggleSheet("Partially Matching Results", resultObj.partialMatchingResults)} variant="link" className='text-[1rem] h-5 font-bold  xs:mb-1 xs:text-2xl xs:h-auto p-0'>Partial Matches: {nPartialMatches}</Button><br/>
            <span className='text-sm font-bold text-zinc-400 h-5 xs:text-lg xs:h-auto xs:mb-1 inline-block'>
            <span>Status: {isFailing() ? "Failing": "Passing"} </span>
             {
               isFailing() ? <X size={16} strokeWidth={3} className='inline ml-1 text-zinc-400' /> :
               <Check size={16} strokeWidth={3} className='inline ml-1 text-zinc-400' />
             }
            </span>
        </div>
    </div>
  )
}
