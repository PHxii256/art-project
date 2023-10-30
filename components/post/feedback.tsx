"use client"
import React, { useState, useRef } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"
import { PostType } from '../../app/supabaseDbTypes'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

const FormSchema = z.object({
    feedback: z.string().min(4, {
    message: "Feedback must be at least 4 characters.",
  }).max(280, {
    message: "Feedback must be less than 280 charcters long.",
  }),
})

export default function Feedback({post,currentUser, supabase }:{post:PostType , currentUser:string, supabase: SupabaseClient}) {

  const[submitBtnText,setSubmitBtnText] = useState("Send Feedback")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      feedback: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    checkFeedback(data)
    form.resetField("feedback")
  }

  async function checkFeedback(formData: z.infer<typeof FormSchema>){
    const { data } = await supabase
    .from('posts_feedbacks')
    .select()
    .eq('feedback_id', post.post_id+"/"+currentUser)
    if(data?.length == 0){
      writeFeedback(formData)
    }
    else{
      toast({
        title: "Feedback already exists",
        description: "you already sent feedback for this post"
      })
    }
  }

  async function writeFeedback(formData: z.infer<typeof FormSchema>){
    const { error } = await supabase
    .from('posts_feedbacks')
    .insert({
      feedback: formData.feedback,
      feedback_id: post.post_id+"/"+currentUser, 
      post_id: post.post_id,
      feedback_giver_id: currentUser,
      feedback_reciever_id: post.user_id})
    if(error) console.log(error)
    else{
      toast({
        title: "Feedback Sent! :D",
        description: "pogchamp"
      })
      setSubmitBtnText("Feedback Sent")
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-1">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"outline"}>{submitBtnText}</Button>
        </form>
      </Form>
    </>

  )
}
