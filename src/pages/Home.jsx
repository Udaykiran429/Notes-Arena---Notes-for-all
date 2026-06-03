import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import GroupNotes from '../components/GroupNotes'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <GroupNotes />
      </main>
      <Footer />
    </>
  )
}
