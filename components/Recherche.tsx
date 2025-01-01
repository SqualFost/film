"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Recherche() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string>("")

  return (
    <div className="flex items-center justify-center py-4 space-x-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Rechercher par titre..."
          className="pl-4 pr-60 py-4 text-gray-300 rounded-lg bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <select
        className="py-2 px-3 text-gray-400 bg-zinc-900  rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        <option value="">Année du film</option>
        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className="py-2 px-3 bg-zinc-900 text-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Type de film</option>
        <option value="action">Action</option>
        <option value="comedy">Comédie</option>
        <option value="drama">Drame</option>
        <option value="horror">Horreur</option>
        <option value="sci-fi">Science-fiction</option>
      </select>

      <Button className="flex items-center justify-center w-10 h-10 bg-zinc-900 text-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-black">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}