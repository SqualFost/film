"use client"

import { Menu, User, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg`}>
      <div className="w-full flex h-14 items-center justify-between px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu de navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              {['Accueil', 'Découvrir', 'Catégories', 'À propos'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium">
                  {item}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold">Films à gogo</h1>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu utilisateur">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {['Mon profil', 'Mes favoris', 'Se déconnecter'].map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" aria-label="Toggle Theme" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}