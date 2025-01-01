"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Movie = {
  id: string;
  title: string;
  image: string;
  description: string;
}

const movieTitles = ["Inception", "The Shawshank Redemption", "The Dark Knight", "Pulp Fiction", "Forrest Gump"]

export function FilmUne() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [movies, setMovies] = React.useState<Movie[]>([])

  React.useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await Promise.all(
        movieTitles.map(async (title) => {
          const response = await fetch(`https://www.omdbapi.com/?apikey=dd33be91&t=${encodeURIComponent(title)}`)
          const data = await response.json()
          return {
            id: data.imdbID,
            title: data.Title,
            image: data.Poster,
            description: data.Plot,
          }
        })
      )
      setMovies(fetchedMovies)
    }

    fetchMovies()
  }, [])

  return (
    <div className="relative w-full max-w-8xl mx-auto">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/2 group">
              <Card className="rounded-lg">
                <CardContent className="flex aspect-[16/9] items-center justify-center p-0 rounded-lg">
                  <div className="relative w-full h-full">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 rounded-lg">
                      <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                      <p className="text-white mb-4">{movie.description}</p>
                      <Button variant="secondary">En savoir plus</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Carousel>
    </div>
  )
}