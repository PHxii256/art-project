"use client"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function Report() {
  return (
    <div className="grid w-full gap-1">
        <Select>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="system">Irrelevant to the focus of the board</SelectItem>
                <SelectItem value="light">This is a repost / stolen</SelectItem>
                <SelectItem value="dark">Looks Ai Generated</SelectItem>
                <SelectItem value="system">Not a drawing / painting</SelectItem>
                <SelectItem value="system">NSFW</SelectItem>
                <SelectItem value="system">Other</SelectItem>
            </SelectContent>
        </Select>
        <Textarea placeholder="Describe your report here (optional)" />
        <Button variant={"outline"}>Send Report</Button>
    </div>
  )
}
