import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import Gallery from './components/Gallery'
import Artists from './components/Artists'
import Cta from './components/Cta'
import Location from './components/Location'
import WhatsappButton from './components/WhatsappButton'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Section />
        <Gallery />
        <Artists />
        <Cta />
        <Location />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
