"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


export default function EmojiChip({emoji, reacted, count, timeout}:{emoji:string, reacted: boolean, count:number, timeout:Function}) {

  const [reactionState, setReactionState] = useState({
    count: count,
    reacted: reacted          //TO:DO : READ USER REACTED BOOL FROM DATABASE SO THEY CANT KEEP INCREASING THEIR REACTS
  })

  function modifyCount(){
    setReactionState((prev)=>{
        if(prev.reacted == false){ 
            return ({
                count:prev.count+1,
                reacted: true
            })
        }

        else{
            return ({
                count:prev.count-1,
                reacted: false
            })
        }
    })
  }

  return (
    <Button variant='outline' className={`px-2 h-8 ${reactionState.reacted  ? "bg-neutral-950" : "bg-neutral-900"}`} onClick={()=>{
      timeout(emoji);
      modifyCount();
    }}>
     <p className="mr-1 mb-1.5 h-4 w-4" >{emoji}</p>
     {reactionState.count > 0 && <p className='ml-1'>{reactionState.count}</p>}
    </Button>
  )
}
