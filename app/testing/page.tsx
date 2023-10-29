"use client"

import React from 'react'
import {useState, useEffect} from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Uploader from './uploader'
import { FileObject } from '@supabase/storage-js/dist/module/lib/types'

export default function page() {


const [fetchError, setFetchError] = useState(String)
const [smoothies, setSmoothies] = useState<any[]>([])
const [currentSmoothie, setCurrentSmoothie] = useState("")
const [downloadedImages,setDownloadedImages] = useState<string[]>([])

let folderName = '/public'
const supabase = createClientComponentClient()

const fetchSmoothies = async () => {

    const {data, error} = await supabase.from('smoothies').select()
    if(error){
      setFetchError('Could not fetch smoothies :(')
      setSmoothies([])
      console.log((error))
    }
    if(data){
      setSmoothies(data)
      setFetchError('')
    }
}

let imagesUrls : string[] = []
let imageCount = 0;

async function downloadImages() {
    const { data, error } = await supabase.storage.from('avatars').list(folderName, {
        limit: 10,
        offset: 0})
    if(data){
        imagesUrls = [];
        imageCount = data.length
        data.map((image)=>{
            download(image)
        })
    }
    if(error) console.log(error)
  }

  async function download(image : FileObject){
    console.log("started download")
    const { data, error } = await supabase
    .storage
    .from('avatars')
    .download(`${folderName}/${image.name}`)

    if(data){
        const objectURL = URL.createObjectURL(data!);
        imagesUrls.push(objectURL)
        downloadsProgressTracker()
        if(error) console.log("error: " + error)
    }
  }

  function downloadsProgressTracker(){
    if(imagesUrls.length == imageCount){
        console.log("all images downloaded")
        setDownloadedImages(imagesUrls)
    }
  }

    

async function setFolder(){
    const { data } = await supabase.auth.getUser()
    folderName = data.user?.id || '/public'
}

useEffect(()=>{
    async function helper() {
        await setFolder()
        console.log(folderName)
    }
    helper()
  },[])


return (
    <div className='m-4'>
        <div>
        <h1 className='font-bold text-6xl'>Actions</h1>
        <div className='my-4 flex-row flex-grow'>
            <Button variant="outline" size="lg" className='mr-2 mt-2' onClick={fetchSmoothies}>Read Database</Button> 

            <Button variant="outline" size="lg" className='mr-2 mt-2' onClick={downloadImages}>Download Images</Button> 
        </div>
            <div>
                {fetchError && (<p>{fetchError}</p>)}
                {smoothies && 
                <ScrollArea className="h-72 w-auto rounded-md border mt-2">
                    <h4 className="ml-4 mt-4 text-md font-semibold leading-none">Database</h4>
                    <div className='p-4'>
                        {
                        smoothies.map((smoothie)=>(
                            <p key={smoothie.id}>{smoothie.title}</p>
                        ))}
                        </div>
                </ScrollArea>}
            </div>

            <Uploader/>
        
            <div className='flex flex-col'>
            {
            downloadedImages.map((image)=>(
                <img src={image} key={image} className='max-w-sm my-2 rounded-md'/>
            ))
            }
            </div>
        </div> 
    </div>
)
}
