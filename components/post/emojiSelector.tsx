import React , {useEffect, useState}from "react";
import EmojiChip from "./emojiChip";
import { PostType } from "../../app/supabaseDbTypes";
import { SupabaseClient } from "@supabase/supabase-js";

function removeDuplicates(arr: any[]) { 
  return arr.filter((item, 
      index) => arr.indexOf(item) === index); 
} 

export function EmojiSelector({post, currentUser, supabase}:{post:PostType ,currentUser: string , supabase : SupabaseClient}) {
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null)
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]) 
  const [uniqueEmojis, setUniqueEmojis] = useState<string[]>([]) //used as a trigger for rerendering children
  const [aggregatedEmojis, setAggregatedEmojis] = useState<string[]>([]) //existing emojis with duplicates used to pass down the count of each emoji
  const emojiList : string[] = ["😂","😋","😍","😰","🤓"] //all possible emojis that could exist

  function timeout (emoji: string) {
    const tempEmojis : string[] = currentEmojis;
    tempEmojis.includes(emoji) ? tempEmojis.splice(tempEmojis.indexOf(emoji),1) : tempEmojis.push(emoji)

    if(currentTimeout != null) {clearTimeout(currentTimeout)}
    const timeout = setTimeout(function () {
      if(tempEmojis.length > 0) writeReactions()
      else deleteReactions()
    }, 3000)
    setCurrentTimeout(timeout)
  }

  async function writeReactions (){
    console.log("written: " + currentEmojis  + " For postId: " + post.post_id)
    const { error } = await supabase
    .from('posts_reactions')
    .upsert({
    reaction_id: post.post_id+"/"+currentUser, 
    reactions: currentEmojis, 
    post_id: post.post_id})
    if(error) console.log(error)
  }

  async function deleteReactions (){
    console.log("deleted" + currentEmojis)
    const { error } = await supabase
    .from('posts_reactions')
    .delete()
    .eq('reaction_id', post.post_id +"/"+currentUser)
    if(error) console.log(error)
  }
  
  async function fetchReactions (){
    const { data, error } = await supabase
   .from('posts_reactions')
   .select('reactions')
   .eq('post_id', post.post_id)
   if(error) console.log(error)
   if(data){
      const tempArray :string[] = [];
      data.map((entry)=>{
        entry.reactions.map((reaction : string)=>{
          tempArray.push(reaction)
       })
      })
      setAggregatedEmojis(tempArray)
      setCurrentEmojis(removeDuplicates(tempArray))
      setUniqueEmojis(removeDuplicates(tempArray.concat(emojiList)))
   }
 }

  useEffect(()=>{
    fetchReactions();
  },[])

  return (
  <div className='w-full h-8 flex flex-row space-x-1'>
    {
    uniqueEmojis.map((emoji, i) =>
        <EmojiChip 
        key={i} 
        emoji={emoji} 
        count={aggregatedEmojis.filter((e) => e == emoji).length} 
        reacted={aggregatedEmojis.includes(emoji)} 
        timeout={timeout}/>
      )
    }
  </div>
 );
}
  