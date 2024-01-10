import DefaultLayout from "@/layouts/default-layout"
import facebook from "@/images/logos/facebook.png"
import instagram from "@/images/logos/instagram.png"
import tikomatata from "@/images/logos/tikomatata.png"
import twitter from "@/images/logos/x.png"
import tikomatataRound from "@/images/logos/tikomatata-round.png"
import tikomatataStacked from "@/images/logos/tikomatata-stacked.png"
import Image from "next/image"
import SEO from "@/components/seo"
export default function Brand() {
  return (
    <DefaultLayout>
      <SEO title={"Brand Assets"}/>
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Assests
          </h2>
          <div className="flex flex-row items-center justify-start flex-wrap w-full mt-4">
          <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={facebook} alt="facebook" />
            </div>
            <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={tikomatata} alt="facebook" />
            </div>
            <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={tikomatataRound} alt="facebook" />
            </div>
            <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={tikomatataStacked} alt="facebook" />
            </div>
            <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={instagram} alt="facebook" />
            </div>
            <div className="min-w-[10em] min-h-[10em] flex items-center justify-center border-2 p-3">
                <Image src={twitter} alt="facebook" />
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}
