import Hero         from '@/components/sections/Hero'
import About        from '@/components/sections/About'
import Features     from '@/components/sections/Features'
import Gallery      from '@/components/sections/Gallery'
import BenVersions  from '@/components/sections/BenVersions'
import Testimonials from '@/components/sections/Testimonials'
import Database     from '@/components/sections/Database'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Gallery />
      <BenVersions />
      <Testimonials />
      <Database />
    </>
  )
}
