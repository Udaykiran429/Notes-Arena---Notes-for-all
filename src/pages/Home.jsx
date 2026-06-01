import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import BranchCards from '../components/BranchCards'
import FeaturedNotes from '../components/FeaturedNotes'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <BranchCards />
        <FeaturedNotes />
      </main>
      <Footer />
    </>
  )
}
