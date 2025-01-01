"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

type Movie = {
  id: string
  title: string
  poster: string
  description: string
}

export function DerniersAjouts() {
  const [movies, setMovies] = React.useState<Movie[]>([])

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movieTitles = [
        "The Matrix",
        "Fight Club",
        "Interstellar",
        "The Godfather",
        "Gladiator",
        "The Lion King",
        "Jurassic Park",
        "Titanic",
        "Avatar"
      ]

      try {
        const fetchedMovies = await Promise.all(
          movieTitles.map(async (title) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=dd33be91&t=${encodeURIComponent(title)}`)
            if (!response.ok) throw new Error(`Failed to fetch data for ${title}`)
            const data = await response.json()
            return {
              id: data.imdbID,
              title: data.Title,
              poster: data.Poster,
              description: data.Plot,
            }
          })
        )
        const shuffledMovies = fetchedMovies.sort(() => 0.5 - Math.random())
        setMovies(shuffledMovies.slice(0, 9))
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="mx-auto max-w-7xl py-12 px-4">
      <h2 className="text-2xl font-semibold mb-8">Derniers ajouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden relative group transform transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              {movie.poster ? (
                <Image src={movie.poster} alt={movie.title} width={300} height={400} className="w-full h-[600px] object-cover" />
              ) : (
                <Skeleton className="h-[600px]" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-center px-4">{movie.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2" style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7), transparent)' }}>
                {movie.title}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}