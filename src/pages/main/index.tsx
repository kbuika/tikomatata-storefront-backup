import Hero from "@/components/Hero"
import EventCard from "../../components/event-card"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"

export default function Home() {
  return (
    <DefaultLayout noHeader={true}>
      <main className="home h-[60vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-12 my-[3em]">
        <h2 className="mt-2 text-2xl ml-[1em] font-medium">Upcoming Events</h2>
        <div className="flex flex-wrap items-start justify-evenly min-h-[50vh] my-[3em]">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </DefaultLayout>
  )
}
