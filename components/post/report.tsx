"use client"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { PostType } from '@/app/supabaseDbTypes'

const FormSchema = z.object({
  report_type: z
    .string({
      required_error: "Please select a reason.",
    }),
  report_description: z.string().max(280)
})


export default function Report({post,currentUser, supabase }:{post:PostType , currentUser:string, supabase: SupabaseClient}) {

  const[submitBtnText,setSubmitBtnText] = useState("Send Report")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    checkFeedback(data)
  }

  async function checkFeedback(formData: z.infer<typeof FormSchema>){
    const { data } = await supabase
    .from('posts_reports')
    .select()
    .eq('report_id', post.post_id+"/"+currentUser)
    if(data?.length == 0){
      writeFeedback(formData)
    }
    else{
      toast({
        title: "User has already been reported",
        description: "Report pending review"
      })
    }
  }

  async function writeFeedback(formData: z.infer<typeof FormSchema>){
    const { error } = await supabase
    .from('posts_reports')
    .insert({
      report: formData.report_description,
      report_type: formData.report_type,
      report_id: post.post_id+"/"+currentUser, 
      post_id: post.post_id,
      reporter_id: currentUser,
      reported_id: post.user_id})
    if(error) console.log(error)
    else{
      toast({
        title: "Report Sent",
        description: "We'll look into it and notify you with as soon as possible"
      })
      setSubmitBtnText("Report Sent")
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto space-y-1">
        <FormField
          control={form.control}
          name="report_type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="irrelevant to board">Irrelevant to the focus of the board</SelectItem>
                  <SelectItem value="repost / stolen<">This is a repost / stolen</SelectItem>
                  <SelectItem value="Ai Generated">Looks Ai Generated</SelectItem>
                  <SelectItem value="Not a drawing">Not a drawing / painting</SelectItem>
                  <SelectItem value="NSFW">NSFW</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="report_description"
          render={({ field }) => (
            <FormItem>
                <FormControl>
                <Textarea placeholder="Describe your reason (optional)" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className="w-full" variant={"outline"}>{submitBtnText}</Button>
       </form>
      </Form>
    </>
  )
}
