"use client"
import {Img} from 'react-image'
import { Button } from '@/components/ui/button'
import {useState} from 'react'
import React from 'react'
import ResultCard from './resultCard'
import VisionResult from './visionTypes'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function ResultsUi({ data } : { data : VisionResult[]}) {
    const [sheetToggled, setSheetToggled] = useState(false)
    const [sheetDesc, setSheetDesc] = useState("")
    const [sheetArr, setSheetArr] = useState<any[]>([])

    function toggleSheet(description: string, array :any[]){
        setSheetToggled((prev)=>!prev)
        setSheetDesc(description)
        setSheetArr(array)
    }

    return (
        <div>
            <h1 className='font-bold text-3xl m-5'>Results</h1>
            {   //wrap with suspense later
                data.map((resultObj)=>(<ResultCard key={resultObj.fileUri} resultObj={resultObj} toggleSheet={toggleSheet}/>))
            }
            <Sheet open = {sheetToggled} onOpenChange={setSheetToggled}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-2xl">Results</SheetTitle>
                    <SheetDescription>{sheetArr.length > 0 ? sheetDesc : "No Matches"}</SheetDescription>
                </SheetHeader>
                <div className='flex flex-col m=0'>
                <ScrollArea className='flex pt-4 h-[87vh] relative'>
                    {
                        sheetArr.map((url)=>(
                            <a href={url} target="_blank">
                                <Img className="w-10/12 rounded-md object-fill ml-7 sm:ml-0 mb-3" 
                                src={url} 
                                unloader={
                                    <Button variant={'link'} className='ml-7 text-xs sm:ml-0 sm:text-sm w-10/12 p-4 border font-bold rounded-md mb-3 h=20 xs:h-12'>
                                        <a href={url} target="_blank">Display unavialable (click to view)</a>
                                    </Button>
                                }
                                ></Img>
                            </a>
                        ))
                    }
                </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
        <p className='text-center text-sm text-primary/40 visible sm:invisible mt-2'>// tip: tap the images to show results</p>
        </div>
    )
}
