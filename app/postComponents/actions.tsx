import { EmojiSelector } from './emojiSelector';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmilePlus, PencilLine, AlertTriangle } from 'lucide-react';

import Feedback from './feedback';
import Report from './report';
import { postPropsObj } from './types';

export default function Actions({postObj}:postPropsObj) {
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
            <EmojiSelector postObj={postObj} />
        </TabsContent>
        <TabsContent value="feedback">
            <Feedback/>
        </TabsContent>
        <TabsContent value="report">
            <Report/>
        </TabsContent>
    </Tabs>
  )
}
