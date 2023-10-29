"use client"
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Separator } from './seperator'

export default function MyNav() {

const colorsList = ["text-red-400","text-orange-400","text-yellow-400","text-green-400","blue-400","text-indigo-400","text-purple-400"]
const [index, setIndex] = React.useState(0)

function ChangeColor(){
    setIndex((prev)=>(++prev % colorsList.length))
}

  return (
    <>
    <nav onClick={()=>ChangeColor()} className="flex ml-5 mr-5 mt-3 mb-3 mn-3 relative h-12 items-center">
    <h1 className={`inline text-xl font-bold select-none ${colorsList[index]}`}> Hello Tailwind</h1>
    <span className="absolute right-0"><ModeToggle/></span>
    </nav>
    <div className='flex items-center justify-center'>
       <Separator className="w-[97.5%]"/>
    </div>
    </>
  )
}

