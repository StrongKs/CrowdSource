"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ModeToggle from '@/components/ModeToggle'

function HomePage() {
    return (
      <div className="h-screen flex justify-center items-start">
        <ModeToggle />
        <div className="max-w-sm mt-20">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input type="Title" id="Title" placeholder="Type your Title Here" />
          </div>
          <form action=""></form>
          <div className="grid w-full gap-2">
            <Textarea placeholder="Type your Message Here" />
            <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100">
            Send message
            </Button>
          </div>
        </div>
      </div>
    )
  }

export default HomePage
