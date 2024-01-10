import SellOutEventBanner from "@/components/sell-out-event-banner"
import SEO from "@/components/seo"
import DefaultLayout from "@/layouts/default-layout"
export default function CreateEvent() {
  return (
    <DefaultLayout>
      <SEO title={"Create your Event"} description="Let's get your event set up -- we can do much more than selling tickets"/>
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Create Your Event
          </h2>
          <SellOutEventBanner/>
        </div>
      </section>
    </DefaultLayout>
  )
}
