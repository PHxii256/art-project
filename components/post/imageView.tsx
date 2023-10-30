"use client"
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense, useEffect, useState } from 'react'
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import "react-image-gallery/styles/css/image-gallery.css";
import "./overrideCarousel.css"
import { FileObject } from '@supabase/storage-js'
import { PostType } from '../../app/supabaseDbTypes';

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//   },
// ];

export default function ImageView({post}:{post: PostType}) {

const [navShown,setNavShown] = useState(false)
const [downloadedImages,setDownloadedImages] = useState<ReactImageGalleryItem[]>([])

const supabase = createClientComponentClient()
let imagesUrls : string[] = []
let imgItems : ReactImageGalleryItem[] =[];
let imageCount = 0;

useEffect(()=>{
  downloadImages()
},[])

async function downloadImages() {
    const { data, error } = await supabase.storage.from('avatars')
    .list(`${post.user_id!}/${post.post_id}`, {
        limit: 6,
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
    const { data, error } = await supabase
    .storage
    .from('avatars')
    .download(`${post.user_id}/${post.post_id}/${image.name}`)

    if(data){
        const objectURL = URL.createObjectURL(data!);
        imagesUrls.push(objectURL)
        downloadsProgressTracker()
        if(error) console.log("error: " + error)
    }
  }

  function downloadsProgressTracker(){
    if(imagesUrls.length == imageCount){
        imgItems = [];
        imagesUrls.map((url)=>{
          imgItems.push({original:url})
        })
        setDownloadedImages(imgItems)
      }
  }

  return (
    <div className={`w-auto mx-2 mt-1 mb-1 bg-zinc-950 flex rounded-md relative overflow-clip`} 
         onMouseEnter={()=>setNavShown(true)} onMouseLeave={()=>setNavShown(false)} 
         style={{aspectRatio: post.view_aspect_ratio}}>
        <Suspense fallback={<Skeleton className="w-full rounded-md contrast-125 saturate-0"/>}>
            <div className='flex flex-col justify-center'>
              <ReactImageGallery items={downloadedImages} 
              showBullets={downloadedImages.length == 1 ? false : true} 
              showNav={navShown} 
              showThumbnails={false} 
              showFullscreenButton={false} 
              showPlayButton={false}
              autoPlay={false}
              slideDuration={250}
              />
          </div>
        </Suspense>
    </div>
  )
}
