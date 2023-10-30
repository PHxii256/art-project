import { EmojiSelector } from './emojiSelector';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmilePlus, PencilLine, AlertTriangle } from 'lucide-react';

import Feedback from './feedback';
import Report from './report';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { PostType } from '@/app/supabaseDbTypes';


export default function Actions({post,currentUser, supabase }:{post:PostType , currentUser:string, supabase: SupabaseClient}) {

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
