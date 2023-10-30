// @ts-nocheck
"use client"
import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilepondPluginImageSizeMetadata from './filepond-plugin-image-size-metadata';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { PostType } from '../app/supabaseDbTypes';
import { FilePondFile } from 'filepond';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilepondPluginImageSizeMetadata);

const bucketId = 'avatars'
const storageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${bucketId}`
const supabase = createClientComponentClient()
let user = 'public/'
let postId : string="";
let uploadData : PostType;

const formSchema = z.object({
  description: z.string().max(100),
})

async function getUser(){ //returns a string to be used in the endpoint url
  const { data } = await supabase.auth.getUser()
  return data.user?.id || 'public'
}

const randomString = () => Math.random().toString(36).substring(2, 6)

const server: FilePondServerConfigProps['server'] = {
  load: async (source, load, error, progress, abort) => {
    progress(true, 0, 1024)
    const { data } = await supabase.storage.from(bucketId).download(source.replace(`${bucketId}/`, ''))
    if (data)
      load(data)

    else
      error('oh my goodness')

    return {
      abort: () => { abort() },
    }
  },
  revert: async (uniqueFileId, load, error) => {
    const { error: err } = await supabase.storage.from(bucketId).remove([uniqueFileId.replace(`${bucketId}/`, '')])
    if (err)
      error(`${err.message}`)
    load()
  },
  // reference: https://pqina.nl/filepond/docs/api/server/#advanced
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData()
    formData.append('cacheControl', '3600')
    formData.append(fieldName, file, file.name)

    const request = new XMLHttpRequest()
    
    request.open('POST', `${storageUrl}/${user}/${postId}/${file.name}-${randomString()}`)
    request.setRequestHeader('Apikey', `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
    request.setRequestHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
    request.setRequestHeader('X-Upsert', 'false')

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = function () {
      const response = JSON.parse(request.responseText)
      if (request.status >= 200 && request.status < 300)
        load(response.Key)

      else error('oh no')
    }
    request.send(formData)

    return {
      abort: () => {
        request.abort()
        abort()
      },
    }
  },
}



// Our app
export default function Uploader() {
    const [files, setFiles] = useState([]);
    let pond : FilePond = null;
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        description: "",
      },
    })

    function getSmallestAspectRatio(){
      let smallestAspect = 1;
      const files :FilePondFile[] = pond.getFiles()
      files.map((file, index)=>{
       const meta = file.getMetadata('size')
       if(meta.width/meta.height < smallestAspect || index == 0) smallestAspect = meta.width/meta.height;
      })
      return smallestAspect;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      if(!pond) {
        console.log("pond instance null") 
        return
      }

      const aspectRatio = getSmallestAspectRatio()
      postId = v4()
      pond.processFiles() //initiates upload for all files
      const userId = await getUser()
      const { data, error } = await supabase
      .from('posts')
      .insert(
          { description:values.description , post_id:postId, user_id: userId, view_aspect_ratio: aspectRatio}
      ).select()
      
      if(error){console.log(error)}
      if(data) {console.log(data)}
    }

    useEffect(() => {
     
      const getUserId = async () => {
      user = await getUser();
      console.log(user)
      }
      // call the function
      getUserId()
    },[]);

    return (
        <div className='w-full max-w-xl'>
            <FilePond
                credits ={false}
                files={files}
                allowRevert={false}
                allowProcess={false}
                onupdatefiles={setFiles}
                allowMultiple={true}
                instantUpload={false}
                ref={(ref) => {
                  pond = ref;
                }}
                imagePreviewHeight={200}
                maxFiles={3}
                name="files"
                labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
                server= {server}
                onprocessfiles={()=>{
                  toast({
                    title: "Post Created! :D",
                    description: "You can leave this page now",
                  })
                }}
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-muted-foreground font-semibold'>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Type your description... (optional)" autocomplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="outline" size="lg" className='mt-2'>Create Post</Button>
              </form>
            </Form>
        </div>
    );
}