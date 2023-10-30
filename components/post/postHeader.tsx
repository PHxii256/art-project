import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { PostType, ProfileType } from '../../app/supabaseDbTypes'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import TimeAgo from 'timeago-react';
import en_US from 'timeago.js/lib/lang/en_US';
import * as timeago from 'timeago.js';

export default function PostHeader({post, supabase }:{post:PostType, supabase: SupabaseClient}) {
  const defaultPfp = "https://i.pinimg.com/564x/4f/b4/6b/4fb46b7bdf1f8160655646a4e3c2ca46.jpg"
  const [username, setUsername] = useState(post.user_id)
  const [pfp, setPfp] = useState(defaultPfp)

  // register it.
  timeago.register('en_US', en_US);

  async function fetchUserInfo(){
    const {data, error} = await supabase
    .from("profiles")
    .select()
    .eq("id", post.user_id).select()

    if(data?.length! > 0){
      const profileData =  data?.[0] as ProfileType
      setUsername(profileData.username??post.user_id)
      setPfp(profileData.avatar_url??defaultPfp)
    }
    if(error) console.log(error);
  }

  useEffect(()=>{
    fetchUserInfo()
  },[])

  return (
    <div className='mt-2 ml-1.5 flex flex-row w-full justify-start h-auto'>
        <Avatar>
            <AvatarImage src= {pfp}/>
            <AvatarFallback>{username?.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div className='mb-2 ml-2 flex flex-col'>
          <p className='mt-0.5 font-semibold text-sm mr-2'>{username}</p>
          <p className='mb font-semibold text-neutral-400 text-xs'>
            <TimeAgo datetime={post.created_at} locale='en_US' opts={{minInterval: 60}}/>
          </p>
        </div>
    </div>
  )
}
