"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeActions() {
  return (
    <div className="h-[calc(100vh-64px)] flex">
      <div className="flex flex-grow justify-center items-center">
      <Link href="/vision">
        <Button variant="outline" onClick={()=>{}}>Web Detection</Button>
      </Link>
      </div>
    </div> )
}
