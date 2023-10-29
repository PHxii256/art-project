"use client"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Feedback() {
  return (
    <>
        <div className="grid w-full gap-1">
        <Textarea placeholder="Type your message here." />
        <Button variant={"outline"}>Send Feedback</Button>
        </div>
    </>

  )
}
