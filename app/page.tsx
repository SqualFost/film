import { Navbar } from "@/components/Navbar"
import { FilmUne } from "@/components/FilmUne"
import { DerniersAjouts } from "@/components/DerniersAjouts"
import { Recherche } from "@/components/Recherche"

export default function Home() {
  return (
    <>
      <Navbar/>
      <FilmUne />
      <Recherche/>
      <DerniersAjouts/>
    </>
  )
}