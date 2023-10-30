"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Post from '../../components/post/post'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostType } from "../supabaseDbTypes";

const resultsPerPage = 2
let currentPage = 1
let totalCount = 0; 

export default function Page() {
const supabase = createClientComponentClient()

const [posts, setPosts] = useState<PostType[]>([]) 
const [currentUser, setCurrentUser] = useState<string>("public")

async function fetchMorePosts(page: number, count: number) { 
    const min = resultsPerPage * page - resultsPerPage
    const max = Math.min(resultsPerPage * page -1,count -1)
    const { data, error } = await supabase
    .from('posts')
    .select()
    .range(min, max) 
  
    if(error) {console.log("error:" + JSON.stringify(error))}
    if(data) {
      setPosts((prev)=>prev.concat(data))
      currentPage++;
     }
}

async function getCount(){
    const { data, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    totalCount = count!
    fetchMorePosts(1, totalCount)
}
    
async function getUser(){ 
    const { data } = await supabase.auth.getUser()
    return data.user?.id || 'public'
}

useEffect(()=>{
    getCount()
    const getUserId = async () => {
        setCurrentUser(await getUser());
        }
    getUserId()
},[])

return (
    <div className='flex flex-col space-y-2 justify-center mt-2 mx-2'>
    <InfiniteScroll
    pageStart={0}
    loadMore={()=>fetchMorePosts(currentPage, totalCount)}
    hasMore={posts.length < totalCount}
    loader={<div className="loader" key={0}>Loading ...</div>}>
        {posts.map((postData :PostType, index:number) => (
        <Post key={index} post={postData} currentUser={currentUser} supabase={supabase}/>
        ))}
    </InfiniteScroll>
    </div>
);

}