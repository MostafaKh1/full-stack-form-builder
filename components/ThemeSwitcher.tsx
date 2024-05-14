'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"

function ThemeSwitcher() {
    const {themes,setTheme} = useTheme()
    const [mount,setMounted] =  useState<boolean>(false)
     useEffect(() => {
            setMounted(true)    
    },[])

    if (!mount) return null

  return (
    <Tabs>
        <TabsList>
            <TabsTrigger value="light" onClick={() => setTheme('light')}>
                <SunIcon  className="h-6 w-6"/>
            </TabsTrigger>
            <TabsTrigger value="dark" onClick={() => setTheme('dark')}>
                <MoonIcon  className="h-6 w-6"/>
            </TabsTrigger>
            <TabsTrigger value="system" onClick={() => setTheme('system')}>
                <DesktopIcon  className="h-6 w-6"/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher