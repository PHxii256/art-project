import { EmojiSelector } from './emojiSelector';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmilePlus, PencilLine, AlertTriangle } from 'lucide-react';

import Feedback from './feedback';
import Report from './report';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostType } from '../../app/supabaseDbTypes';

const supabase = createClientComponentClient()

export default function Actions({post}:{post: PostType}) {
    const [currentUser, setCurrentUser] = useState<string>("public")
    
    async function getUser(){ 
        const { data } = await supabase.auth.getUser()
        return data.user?.id || 'public'
    }

    useEffect(()=>{
        const getUserId = async () => {
          setCurrentUser(await getUser());
          console.log("current user: " + currentUser)
          }
          getUserId()
      },[])
      
  return (
    <Tabs defaultValue="react" className="w-[100%] overflow-clip">
        <TabsList>
            <TabsTrigger value="react">
                <SmilePlus className="mr-2 h-4 w-4" /> 
                <p className=' select-none'>React</p>
            </TabsTrigger>

            <TabsTrigger value="feedback" >
                <PencilLine className="mr-2 h-4 w-4 select-none" /> 
                <p className='select-none'>Feedback</p>
            </TabsTrigger>

            <TabsTrigger value="report" >
                <AlertTriangle className="mr-2 h-4 w-4 select-none" />
                <p className='select-none'>Report</p>
            </TabsTrigger>

        </TabsList>
        <TabsContent value="react">
            <EmojiSelector post={post} currentUser={currentUser} supabase={supabase}/>
        </TabsContent>
        <TabsContent value="feedback">
            <Feedback  post={post} currentUser={currentUser} supabase={supabase}/>
        </TabsContent>
        <TabsContent value="report">
            <Report post={post} currentUser={currentUser} supabase={supabase}/>
        </TabsContent>
    </Tabs>
  )
}
