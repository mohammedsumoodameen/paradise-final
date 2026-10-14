import Faq from '../home/Faq'
import Hero from '../home/Hero'
import Inspire from '../home/Inspire'
import Journey from '../home/Journey'
import Life from '../home/Life'
import Moments from '../home/Moments'
import Stages from '../home/Stages'
import Values from '../home/Values'
import Voices from '../home/Voices'
import { useTitle } from '../components/page'

/**
 * The home page, in the order a visitor asks their questions: what is this place, what does
 * it believe, what will my child learn, what is it like, how do we join, and who says so.
 */
export default function Home() {
  useTitle()
  return (
    <>
      <Hero />
      <Inspire />
      <Stages />
      <Values />
      <Journey />
      <Life />
      <Voices />
      <Moments />
      <Faq />
    </>
  )
}
